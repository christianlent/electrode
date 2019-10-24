"use strict";
/*eslint-env es6*/
const plugin = {};
const fs = require("fs");
const path = require("path");
const HTTP_CREATED = 201;
const HTTP_ISE = 500;

plugin.register = function (server) {
  server.route({
    method: "POST",
    path: "/updateStorage",
    handler: (request) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(path.join(process.cwd(), "data/storage.json"),
          JSON.stringify(request.payload),
          "utf-8",
          err => err ? reject(err) : resolve("created"),
        );
      });
    }
  });
};

plugin.register.attributes = {
  name: "updateStoragePlugin",
  version: "0.0.1"
};

plugin.name = "updateStoragePlugin";

module.exports = plugin;
