var db = require("../models");

module.exports = function (app) {
  app.get("/api/resorts", function (req, res) {
    db.Resort.findAll({}).then(function (dbResorts) {
      res.json(dbResorts);
    });
  });

  // Create a new resorts table
  app.post("/api/resorts", function (req, res) {
    console.log("backend post", req.body);
    db.Resort.create(req.body).then(function (dbResort) {
      console.log("dbResort", dbResort.dataValues);
      res.json(dbResort);
    });
  });

  // Delete an example by id
  app.delete("/api/resorts/:id", function (req, res) {
    db.Resort.destroy({ where: { id: req.params.id } }).then(function (dbResort) {
      res.json(dbResort);
    });
  });
};
