var db = require("../models");
var keys = require("../keys.js");
var axios = require("axios");




module.exports = function (app) {
  app.get("/api/resorts", function (req, res) {
    db.Resort.findAll({}).then(function (dbResorts) {
      res.json(dbResorts);
    });
  });

  // Create a new resorts table
  app.post("/api/resorts", function (req, res) {
    db.Resort.create(req.body).then(function (dbResort) {
      // console.log("dbResort", dbResort.dataValues);
      res.json(dbResort);
    });
  });

  // Delete an example by id
  app.delete("/api/resorts/:id", function (req, res) {
    db.Resort.destroy({ where: { id: req.params.id } }).then(function (dbResort) {
      res.json(dbResort);
    });
  });

  // Return weather data
  app.post("/api/resorts/weather", function (req, res) {
    console.log(req.body);
    // axios.get("https://api.darksky.net/forecast/50abca137dd320d83a18e991c69af6a7/42.3601,-71.0589")
    //   .then(function (response) {
    //     console.log(response.data);
    //     res.json(response.data);
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       console.log(error.request);
    //     } else {
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });
  });
};
