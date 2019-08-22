var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/style.css", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/style.css"));
  });

  app.get("/frontend.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/frontend.js"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/match", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/match.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};