module.exports = function(router, Firebase) {
  // const express = require("express");
  const fborm = require("../firebase/orm/orm.js");
  const db = require("../models");
  const inflections = require("../quote_modules/inflections.js");

  router.get("/home", (req, res) => {
    loadHome(res);
  });

  router.get("/", (req, res) => {
    loadHome(res);
  });

  function loadHome(res) {
    if(fborm.currentUser(Firebase.firebase) === null){
      res.render("login", {});

    }
    else {
      let currentUserId = fborm.currentUser(Firebase.firebase).uid;

      db.Friendship.findAll({
        where: {
          $or: [
            {
              uuid_1: {
                $eq: currentUserId
              }
            },
            {
              uuid_2: {
                $eq: currentUserId
              }
            }
          ]
        }
      }).then(result => {
        let friends = [];
        if (result.length !== 0) {
          for (let friend of result) {
            if (friend.uuid_1 === currentUserId) {
              friends.push({ UserId: { $eq: friend.uuid_2 } });
            } else {
              friends.push({ UserId: { $eq: friend.uuid_1 } });
            }
          }
        }
        console.log(friends);
        db.Quotes.findAll({
          where: {
            $or: friends
          }
        })
          .then(data => {
            for (let quote of data) {
              quote.quote_body =
                quote.inflection !== null
                  ? inflections[quote.inflection](quote.quote_body)
                  : quote.quote_body;
            }

            res.render("home", {
              quotes: data,
              proPic: fborm.currentUser(Firebase.firebase).photoURL
            });
          })
          .catch(err => {
            throw err;
          });
      });
    }
  }

  return router;
};
