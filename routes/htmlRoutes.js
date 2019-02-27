module.exports = function(router, Firebase) {
  // const express = require("express");
  const fborm = require("../firebase/orm/orm.js");
  const db = require("../models");
  const inflections = require("../quote_modules/inflections.js");

  router.get("/home", (req, res) => {
    loadHome(req,res);
  });

  router.get("/", (req, res) => {
    loadHome(req,res);
  });

  function loadHome(req,res) {

    if(!req.cookies["quillo_token"]){
      console.log(req.cookies);
      res.render("login", {});
    }
    else {
      console.log("GETTING HOMEE");
      fborm.currentUser(Firebase, req.cookies.quillo_token).then(({statusCode,userRecord})=>{
        let currentUserId=userRecord.uid;

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
                proPic: userRecord.photoURL
              });
            })
            .catch(err => {
              throw err;
            });
        });
      });

    }
  }

  return router;
};
