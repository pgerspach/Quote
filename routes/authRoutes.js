module.exports = function(router, Firebase) {
  const db = require("../models");
  const fborm = require("../firebase/orm/orm.js");
  const inflections = require("../quote_modules/inflections.js");

  // Listen for post request for google sign in
  router.post("/auth/google", (req, res) => {
    fborm
      .signIn(Firebase, req.body.token)
      .then(data => {
        if (data.statusCode === 404) {
          throw data.error;
        }
        res.cookie("quillo_token", data.idToken, {
          maxAge: 300000,
          httpOnly: true,
          secure:true
        });

        fborm
          .currentUser(Firebase, data.idToken)
          .then(({ statusCode, userRecord }) => {
            loadData(statusCode, userRecord);
          })
          .catch(err => {
            console.log("mistake E");

            res.send(err);
          });
      })
      .catch(err => {
        console.log("mistake D");

        res.send(err);
      });
    // Try to sign in with token from client
    function loadData(statusCode, userRecord) {
      let userId = userRecord.uid;
      db.Users.findAll({
        where: {
          id: userId // user Id from firebase token
        }
      })
        .then(result => {
          if (result.length === 0) {
            // if there is no user with that token, create a new user in mysql
            let newUser = userRecord.displayName;
            let photoURL = userRecord.photoURL;
            db.Users.create({
              id: userId,
              name: newUser,
              proPic: photoURL
            })
              .then(result => {
                db.Friendship.bulkCreate([
                  {
                    uuid_1: userId,
                    uuid_2: "23",
                    status: 2
                  },
                  {
                    uuid_1: userId,
                    uuid_2: "123",
                    status: 2
                  },
                  {
                    uuid_1: userId,
                    uuid_2: "54",
                    status: 2
                  },
                  {
                    uuid_1: userId,
                    uuid_2: "12364",
                    status: 2
                  },
                  {
                    uuid_1: userId,
                    uuid_2: "542",
                    status: 2
                  }
                ])
                  .then(() => {
                    res.send("OK");
                  })
                  .catch(err => {
                    console.log("mistake A");

                    res.send(err);
                  });
              })
              .catch(err => {
                console.log("mistake B");
                res.send(err);
              });
          } else {
            res.send("OK");
          }
        })
        .catch(err => {
          console.log("mistake C");

          res.send(err);
        });
    }
  });

  return router;
};
