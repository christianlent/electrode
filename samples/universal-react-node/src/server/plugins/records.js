"use strict";
/*eslint-env es6*/
const plugin = {};
const HTTP_CREATED = 201;
const mongojs = require("mongojs");
const uuidV1 = require("uuid/v1");

plugin.register = function (server) {
  const db = mongojs("electrode-mongo", ["records"]);

  //Get All Records
  server.route({
    method: "GET",
    path: "/records",
    handler: () => {
      db.records.find((err, docs) => {
        if (err) {
          return "Internal MongoDB error\n" + JSON.stringify(err, undefined, "\t");
        }
        return docs;
      });
    }
  });

  //Get 1 Record
  server.route({
    method: "GET",
    path: "/records/{id}",
    handler: (request, reply) => {
      db.records.findOne({
        _id: request.params.id
      }, (err, doc) => { // eslint-disable-line consistent-return
        if (err) {
          return "Internal MongoDB error";
        }
        if (!doc) {
          return "No Record Found";
        }
        const responseString = doc.map(record => JSON.stringify(record)).toString();
        reply.response(responseString);
      });
    }
  });

  //Add a record
  server.route({
    method: "POST",
    path: "/addRecord",
    handler: (request, reply) => {
      const record = request.payload;
      //Create an id
      record._id = uuidV1();

      db.records.save(record, err => { // eslint-disable-line consistent-return
        if (err) {
          console.log(err); // eslint-disable-line no-console
          return "Internal MongoDB error";
        }
        reply.response(record).code(HTTP_CREATED);
      });
    }
  });
};

plugin.register.attributes = {
  name: "addRecordsPlugin",
  version: "0.0.1"
};

plugin.name = "addRecordsPlugin";

module.exports = plugin;
