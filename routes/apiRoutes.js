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

  // var first_run_backed_up = moment(first_run, "HH:mm").subtract(1, "years");
  // console.log("Year " + moment(current_time).format("YYYY"));
  // console.log("Month " + moment(current_time).format("MM"));
  // console.log("DAY " + moment(current_time).format("DD"));

  // var next_train = moment().add(minutes_away, "minutes").format('LT');

  // var url = `https://api.darksky.net/forecast/${keys.dark_skies.api_key}/${resort.lat.toFixed(6)},${resort.lng.toFixed(6)}`;

  // [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS]

  var current_time = moment();

  date_str = `,${moment(current_time).format("YYYY")}-${moment(current_time).format("MM")}-${moment(current_time).format("DD")}`;
  date_str += "T12:00:00"

  var url = `https://api.darksky.net/forecast/${keys.dark_skies.api_key}/${resort.lat.toFixed(6)},${resort.lng.toFixed(6)}`;
  url += date_str;
  console.log(url);
  axios.get(url).then(function (response) {
    var res = response.data;

    resort.current_conditions = res.currently.summary;
    var forecast_str = res.daily.data[0].precipType;
    if (res.daily.data[0].precipAccumulation) 
      forecasst_str += `: ${res.daily.data[0].precipAccumulation} in`;

    resort.precip_forecast = forecast_str;
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
