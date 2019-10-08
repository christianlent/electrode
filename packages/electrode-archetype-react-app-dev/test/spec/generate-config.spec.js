const mockRequire = require("mock-require");
const expect = require("chai").expect;
const Path = require("path");

const moduleName = "../../config/webpack/util/generate-config";

describe("generate-config", function() {
  this.timeout(10000);

  before(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  after(() => {
  });

  describe("generateConfig", () => {
    it("If the configFilename is dev.js and only webpack.config.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "dev.js";
      const defaultFilename = "webpack.config.js";

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      const defaultWebpackContents = {test: 2};
      mockRequire(defaultWebpackPath, defaultWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is coverage.js and only coverage.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "coverage.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      const configWebpackContents = {test: 2};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is coverage.js and only webpack.config.coverage.js exists, use webpack.config.coverage.js", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "coverage.js";
      const defaultFilename = "webpack.config.coverage.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 2};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(configWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only production.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      const configWebpackContents = {test: 2};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only webpack.config.production.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.production.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 2};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only webpack.config.js exists, use webpack.config.js", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 2};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(configWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If none of the configs are available, return an empty config", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal({});
    });
  });
});
