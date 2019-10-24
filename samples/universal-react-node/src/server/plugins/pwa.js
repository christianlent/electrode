"use strict";
/*eslint-env es6*/
const plugin = {};

plugin.register = function (server) {
  server.route({
    method: "GET",
    path: "/sw.js",
    handler: {
      file: "dist/sw.js"
    }
  });
};

plugin.register.attributes = {
  name: "PWAPlugin",
  version: "0.0.1"
};

plugin.name = "PWAPlugin";

module.exports = plugin;
