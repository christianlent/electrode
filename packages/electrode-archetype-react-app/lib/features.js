const optionalRequire = require("optional-require")(require);
const { optionalDependencies } = require("electrode-archetype-react-app-dev/package");
const cwd = process.env.PWD || process.cwd();
const appPkg = require(`${cwd}/package.json`);
const chalk = require("chalk");
const fs = require("fs");
const util = require("util");
const os = require("os");
const exec = util.promisify(require("child_process").exec);
const appArchetypeConfig = optionalRequire("electrode-archetype-react-app/config/archetype") || {};
const prompts = require("prompts");

const appArchetypeConfigOptions = appArchetypeConfig.options || {};

const ENABLE_PACKAGE_SELECTION = false;
const ENABLE_PACKAGE_CONVERSION = false;
const UTF8_REGEX = /UTF-?8$/i;

// Adapted from here: https://www.npmjs.com/package/has-unicode
function isUnicodeSupported() {
  if (os.type() === "Windows_NT") {
    return false;
  }

  return UTF8_REGEX.test(process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG);
}

// Heavily adapted from here:
//  https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
function parseRelaxedJson(json) {
  json = json.trim();
  if (json.startsWith("'") && json.endsWith("'")) {
    return json.replace(/^'(.*)'$/, "$1");
  }
  const formalJson = json
    .replace(/:\s*"([^"]*)"/g, (match, p1) => ': "' + p1.replace(/:/g, "@colon@") + '"')
    .replace(/:\s*'([^']*)'/g, (match, p1) => ': "' + p1.replace(/:/g, "@colon@") + '"')
    .replace(/:\s*\[\s*((?:'(?:[^']*)',?\s*)*)\s*\]/g, (match, p1) => {
      let out = ": [";
      out += p1
        .replace(/'([^']*)',?\s*/g, (match, p1) => '"' + p1.replace(/:/g, "@colon@") + '",')
        .replace(/,$/, "");
      out += "]";
      return out;
    })
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
    .replace(/@colon@/g, ":");
  return JSON.parse(formalJson);
}

function areCurrentEnablesLegacy() {
  return true;
}

class Feature {
  constructor(packageName) {
    this.packageName = packageName;
    this.attachNpmAttributes = this.attachNpmAttributes.bind(this);
    this.setEnabled = this.setEnabled.bind(this);
    this.removeLegacyEnabled = this.removeLegacyEnabled.bind(this);
    this.convert = this.convert.bind(this);
  }

  async attachNpmAttributes() {
    const { description, electrodeOptArchetype, version } = await this.getNpmAttributes([
      "description",
      "electrodeOptArchetype",
      "version"
    ]);
    this.npmDescription = description;
    this.npmElectrodeOptArchetype = electrodeOptArchetype;
    this.npmVersion = version;
  }

  async getNpmAttributes(fields) {
    const { stdout } = await exec(`npm view ${this.packageName} ${fields.join(" ")}`);
    const regex = fields.map(field => `${field} =(.*)`).join("");
    const values = stdout
      .replace(/[\n\r]/g, "") // No newlines
      .match(regex)
      .splice(1)
      .map(parseRelaxedJson);
    const fieldMap = {};
    fields.forEach((field, index) => (fieldMap[field] = values[index]));
    return fieldMap;
  }

  get name() {
    const options = this.electrodeOptArchetype;
    return options.expectTag === true
      ? options.optionalTagName
      : options.expectTag;
  }

  get description() {
    return this.package ? this.package.description : this.npmDescription;
  }

  get electrodeOptArchetype() {
    return this.package ? this.package.electrodeOptArchetype : this.npmElectrodeOptArchetype;
  }

  get package() {
    if (!this._package && this._package !== false) {
      this._package = optionalRequire(`${this.packageName}/package.json`) || false;
    }
    return this._package;
  }

  get version() {
    return this.package ? this.package.version : "";
  }

  get enabled() {
    return this.enabledNew || this.enabledLegacy;
  }

  get enabledNew() {
    return Boolean(
      ["dependencies", "devDependencies"].find(
        x => appPkg && appPkg[x] && appPkg[x].hasOwnProperty(this.packageName)
      )
    );
  }

  get enabledLegacy() {
    if (!this.electrodeOptArchetype.hasOwnProperty("optionalTagName")) {
      throw `opt archetype ${this.packageName}: package.json missing this.electrodeOptArchetype.optionalTagName`;
    }
    if (!this.electrodeOptArchetype.hasOwnProperty("expectTag")) {
      throw `opt archetype ${this.packageName}: package.json missing this.electrodeOptArchetype.expectTag`;
    }

    const optionalTagName = this.electrodeOptArchetype.optionalTagName;
    const expectTag = this.electrodeOptArchetype.expectTag;
    const defaultInstall = Boolean(this.electrodeOptArchetype.defaultInstall);

    let foundOOO = [];

    if (this.electrodeOptArchetype.onlyOneOf) {
      // first, user's package.json cannot have multiple packages from onlyOneOf list
      ["dependencies", "devDependencies", "optionalDependencies"].forEach(x => {
        if (appPkg[x]) {
          foundOOO = foundOOO.concat(
            this.electrodeOptArchetype.onlyOneOf.filter(n => appPkg[x].hasOwnProperty(n))
          );
        }
      });

      if (foundOOO.length > 1) {
        // onlyOneOf conflict
        return false;
      }

      // If found a mutually excluding package but it's not this one, then skip installing this.
      if (foundOOO.length > 0 && foundOOO.indexOf(this.packageName) < 0) {
        // onlyOneOf conflict
        return false;
      }
    }

    //
    // check if app's package.json has the package in its dependencies or optionalDependencies
    //
    const appDep = ["dependencies", "devDependencies", "optionalDependencies"].find(
      x => appPkg[x] && appPkg[x].hasOwnProperty(this.packageName)
    );

    if (appDep) {
      if (appArchetypeConfigOptions.hasOwnProperty(optionalTagName)) {
        // onlyOneOf conflict
        return false;
      }

      if (this.electrodeOptArchetype.checkAppDep !== false) {
        // Try to do a simple major version check.  If they don't match then assume user
        // is trying install a different one, so fail this copy.
        const appSemV = appPkg[appDep][this.packageName];
        if (!isSameMajorVersion(appSemV, this.version)) {
          // Found a different version from this copy's major version skipping installing this copy.
          return false;
        }
        // Found in the package.json - installing
        return true;
      }
    }

    // check if app's archetype/config/index.js options specify the feature tag for the package to be installed.
    if (!appArchetypeConfigOptions.hasOwnProperty(optionalTagName) && defaultInstall === true) {
      // No optional flag specified for package - default to installing
      return true;
    }

    const userConfig = appArchetypeConfigOptions[optionalTagName];

    return userConfig === expectTag;
  }

  get exclusivities() {
    return this.electrodeOptArchetype.onlyOneOf || [];
  }

  setEnabled(pkg, enabled) {
    const dependencies = { ...pkg.dependencies };
    if (enabled) {
      dependencies[this.packageName] = `^${this.version || this.npmVersion}`;
    } else {
      delete dependencies[this.packageName];
    }
    return {
      ...pkg,
      dependencies
    };
  }

  removeLegacyEnabled(pkg) {
    const optionalDependencies = { ...pkg.optionalDependencies };
    delete optionalDependencies[this.packageName];
    return {
      ...pkg,
      optionalDependencies
    };
  }

  convert(pkg) {
    pkg = this.setEnabled(pkg, this.enabledLegacy);
    return this.removeLegacyEnabled(pkg);
  }
}

async function getFeatures() {
  console.log("Fetching feature information, please wait...");
  const features = Object.keys(optionalDependencies).map(packageName => new Feature(packageName));
  await Promise.all(features.map(feature => feature.attachNpmAttributes()));
  features.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  return features;
}

function displayFeatureStatus(features) {
  const namePadding =
    features.reduce(function(a, b) {
      return a.name.length > b.name.length ? a : b;
    }).name.length + 1;
  const enabledPadding = 4;
  const versionPadding = 8;

  const DISABLED = (isUnicodeSupported() ? "✗" : "N").padEnd(enabledPadding);
  const ENABLED = chalk.green((isUnicodeSupported() ? "✓" : "Y").padEnd(enabledPadding));

  console.log(
    chalk.bold("Feature".padEnd(namePadding)),
    chalk.bold("En?".padEnd(enabledPadding)),
    chalk.bold("Current".padEnd(versionPadding)),
    chalk.bold("Latest".padEnd(versionPadding)),
    chalk.bold("Description")
  );

  features.forEach(feature => {
    const version =
      feature.version === feature.npmVersion
        ? chalk.cyan(feature.version.padEnd(versionPadding))
        : chalk.red(feature.version.padEnd(versionPadding));
    console.log(
      feature.name.padEnd(namePadding),
      feature.enabled ? ENABLED : DISABLED,
      version,
      chalk.magenta(feature.npmVersion.padEnd(versionPadding)),
      feature.description
    );
  });
}

function displayFeatureIssues(features) {
  const featuresByName = {};
  features.forEach(feature => (featuresByName[feature.packageName] = feature));
  features.forEach(feature => {
    if (!feature.package && feature.enabled) {
      console.error(
        chalk.red(`The feature "${name}" is enabled but is not available in your node_modules directory.
Please perform an "npm install"`)
      );
    }

    feature.exclusivities
      .filter(
        exclusiveName =>
          exclusiveName !== feature.packageName &&
          feature.enabled &&
          featuresByName[exclusiveName].enabled
      )
      .forEach(exclusiveName => {
        const exclusive = featuresByName[exclusiveName];
        console.error(
          chalk.red(
            `The feature "${feature.name}" collides with "${exclusive.name}". Please uninstall one.`
          )
        );
      });
  });
}

function writeAppPkg(pkg) {
  const file = `${cwd}/package.json`;
  fs.writeFileSync(file, JSON.stringify(pkg, undefined, "  ") + "\n");
}

async function promptForConversion(features) {
  const responses = await prompts({
    type: "confirm",
    name: "convert",
    message: `Convert archetype feature usage to new style (recommended)?`,
    initial: true
  });
  if (!responses.convert) {
    return;
  }
  let pkg = appPkg;
  features.forEach(feature => {
    pkg = feature.convert(pkg);
  });
  writeAppPkg(pkg);
}

async function promptForEnabled(features) {
  const featureEnablePrompts = features.map((feature, index) => ({
    type: "confirm",
    name: index,
    message: `Enable ${feature.name}?`,
    initial: feature.enabled
  }));
  const responses = await prompts(featureEnablePrompts);
  let pkg = appPkg;
  features.forEach((feature, index) => {
    const enabled = responses[index];
    if (feature.enabled === enabled) {
      return;
    }
    pkg = feature.setEnabled(pkg, enabled);
  });
  writeAppPkg(pkg);
}

async function displayFeatures() {
  const features = await getFeatures();
  displayFeatureStatus(features);
  displayFeatureIssues(features);
  if (ENABLE_PACKAGE_CONVERSION && areCurrentEnablesLegacy()) {
    await promptForConversion(features);
  }
  if (ENABLE_PACKAGE_SELECTION) {
    await promptForEnabled(features);
  }
}

module.exports = {
  displayFeatures
};
