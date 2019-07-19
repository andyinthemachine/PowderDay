var db = require("../models");
// var axios = require("axios");
// require("dotenv").config();
// var keys = require("../keys.js");


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Resort.findAll({}).then(function (dbResorts) {
      res.render("index", {
        resorts: dbResorts
      });
    });
  });

  // Load resort page and pass in resort by id
  app.get("/resort/:id", function (req, res) {
    db.Resort.findOne({ where: { id: req.params.id } }).then(function (dbResort) {
      res.render("resort", { resort: dbResort });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

// axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&keyword=ski+resort&key=AIzaSyDVPvQqd6kA0zXrwQQFnNGk3Map3fgM39Y")
// .then(function(response) { console.log(response.data); })
//   .catch(function(error) {
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
