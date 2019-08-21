var friendsArray = require("../data/friends");

module.exports = function(app) {
  
    app.get("/api/friendsArray", function(req, res) {
      res.json(friendsArray);

    });
  
    app.post("/api/friendsArray", function(req, res) {
        friendsArray.push(req.body)

        // ask about this:
            res.json(true);
    });
  
  };

  