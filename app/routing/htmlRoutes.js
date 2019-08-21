var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });

  app.get("/style.css", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/style.css"));
  });

  app.get("/frontend.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/survey.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });

};