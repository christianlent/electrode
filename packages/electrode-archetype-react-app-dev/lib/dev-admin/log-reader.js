const AnsiConvert = require("ansi-to-html");
const ck = require("chalker");
const fs = require("fs");
const readline = require('readline');
const convert = new AnsiConvert();

const LEVELS = { 
  error: {
    color: "red",
    index: 0,
    name: "error"
  },
  warn: {
    color: "yellow",
    index: 1,
    name: "warn"
  },
  info: {
    index: 2,
    name: "info"
  },
  http: {
    index: 3,
    name: "http"
  },
  verbose: {
    index: 4,
    name: "verbose"
  },
  debug: {
    index: 5,
    name: "debug"
  },
  silly: {
    index: 6,
    name: "silly"
  },
};

async function getLogsByLine(maxLevel = 6, handleLogLine) {
  return new Promise((resolve) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream("archetype-debug.log"),
    });
  
    readInterface.on("line", (event) => {
      event = JSON.parse(event);
      const levelInfo = LEVELS[event.level];
      if (levelInfo.index > maxLevel) {
        return;
      }
      handleLogLine(event);
    });
    readInterface.on("close", resolve);
  });
}

async function getLogs(maxLevel = 6) {
  const logs = [];
  await getLogsByLine(maxLevel, (event) => logs.push(event));
  return logs;
}

function getLogEventAsAnsi(event) {
  const levelInfo = LEVELS[event.level];
  const name = levelInfo.color
    ? ck(`<${levelInfo.color}>${levelInfo.name}</>`)
    : levelInfo.name;
  return `${name}: ${event.message}`;
}

function getLogEventAsHtml(event) {
  const levelInfo = LEVELS[event.level];
  const name = levelInfo.color
    ? `<span style="color: ${levelInfo.color}">${levelInfo.name}</span>`
    : levelInfo.name;
  return `${name}: ${convert.toHtml(event.message)}`;
}


async function displayLogs(maxLevel = 6, show = console.log) {
  await getLogsByLine(maxLevel, (event) => show(getLogEventAsAnsi(event, show)));
}

module.exports = {
  getLogsByLine,
  getLogs,
  getLogEventAsAnsi,
  getLogEventAsHtml,
  displayLogs
};
