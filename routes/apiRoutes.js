var db = require("../models");
var keys = require("../keys.js");
var axios = require("axios");
var moment = require('moment');

moment().format();



module.exports = function (app) {
  app.get("/api/resorts", function (req, res) {
    db.Resort.findAll({}).then(function (dbResorts) {
      res.json(dbResorts);
    });
  });

  // Create a new resorts table row
  app.post("/api/resorts", function (req, res) {
    weather_api(req.body, function (resort) {
      db.Resort.create(resort).then(function (dbResort) {
        res.json(dbResort);
      });
    });
  });

  // Delete an example by id
  app.delete("/api/resorts/:id", function (req, res) {
    db.Resort.destroy({ where: { id: req.params.id } }).then(function (dbResort) {
      res.json(dbResort);
    });
  });
}


function weather_api(resort, cb) {
  console.log("dskey: ", keys.dark_skies.api_key);
  console.log(resort.lat.toFixed(6), resort.lng.toFixed(6));

  var url = `https://api.darksky.net/forecast/${keys.dark_skies.api_key}/${resort.lat.toFixed(6)},${resort.lng.toFixed(6)}`;
  axios.get(url).then(function (response) {
    console.log(response.data.currently.summary);
    resort.weather = response.data.currently.summary;
    cb(resort);
  })
    .catch(function (error) {
      if (error.response)
        console.log(error.response);
      else if (error.request)
        console.log(error.request);
      else
        console.log("Error", error.message);

      console.log(error.config);
    });
}
