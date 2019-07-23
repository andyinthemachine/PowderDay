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
    // don't create if already there
    db.Resort.findOne({ where: { name: req.body.name } }).then(exists => {
      if (exists)
        res.send("exists");
      else
        weather_api(req.body, function (resort) {
          db.Resort.create(resort).then(function (dbResort) {
            res.json(dbResort);
          });
        });
    });
  });

  // Delete a resort by id
  app.delete("/api/resorts/:id", function (req, res) {
    db.Resort.destroy({ where: { id: req.params.id } }).then(function (dbResort) {
      res.json(dbResort);
    });
  });
}

function weather_api(resort, cb) {

  // [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS]
  var url = `https://api.darksky.net/forecast/${keys.dark_skies.api_key}/${resort.lat.toFixed(6)},${resort.lng.toFixed(6)}`;
  var current_day = moment();

  //api hit for today
  var date_str = `,${moment(current_day).format("YYYY")}-${moment(current_day).format("MM")}-${moment(current_day).format("DD")}`;
  var time_str = `T${moment(current_day).format("HH")}:${moment(current_day).format("mm")}:${moment(current_day).format("ss")}`;

  var url_today = url + date_str + time_str;

  axios.get(url_today).then(function (response) {
    var res = response.data;
    console.log("weather 1", resort.name);
    console.log(url_today);

    resort.current_conditions = res.currently.summary;

    var forecast_str = "no precip";

    if (res.daily.data[0].precipType) {
      forecast_str = res.daily.data[0].precipType;
      if (forecast_str === "rain")
        forecast_str += `: ${(res.daily.data[0].precipProbability * 100).toFixed(0)}%`;
      else if (forecast_str === "snow")
        if (res.daily.data[0].precipAccumulation)
          forecast_str += `: ${res.daily.data[0].precipAccumulation} in`;
    }

    resort.precip_forecast = forecast_str;

    // api hit for prev day
    var prev_day = moment(current_day).subtract(1, "days");
    date_str = `,${moment(prev_day).format("YYYY")}-${moment(prev_day).format("MM")}-${moment(prev_day).format("DD")}`;
    time_str = "T12:00:00";

    var url_prev_day = url + date_str + time_str;

    console.log("weather 2", resort.name);
    console.log(url_prev_day);

    axios.get(url_prev_day).then(function (response2) {
      var res2 = response2.data;
      var prev_day_str = "no precip";

      if (res2.daily.data[0].precipType) {
        prev_day_str = res2.daily.data[0].precipType;
        if (prev_day_str === "rain")
          prev_day_str += `: ${(res2.daily.data[0].precipIntensityMax).toFixed(2)} in`;
        else if (prev_day_str === "snow")
          if (res2.daily.data[0].precipAccumulation)
            prev_day_str += `: ${res2.daily.data[0].precipAccumulation} in`;
      }
      resort.precip_prev_day = prev_day_str;
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


