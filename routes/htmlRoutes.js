var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Resort.findAll({}).then(function (dbResorts) {
      res.render("index", {
        msg: "",
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
2