module.exports = function(router) {
    const db = require("../models");

  router.get("/api/quotes", (req, res) => {
    db.Quotes.findAll({}).then(function(allQuotes) {
      res.json(allQuotes);
    });
  });

  router.get("/newquote", (req, res) => {
    console.log("Request to make new quote");
  });
  router.post("/api/newquote", (req, res) => {
    db.Users.findAll({
      attributes: ["id"],
      where: {
        name: req.body.quote_speaker
      }
    }).then(result => {
      if (result.length === 0) {
        console.log("User not found");
        res.send("User not found");
      } else {
        db.Quotes.create({
          quote_speaker: req.body.quote_speaker,
          quote_body: req.body.quote_body,
          UserId: result[0].id
        });
        res.send("SUCCESS");
      }
    });
  });
  return router;
};
