module.exports = function(router, Firebase) {
  const db = require("../models");
  const fborm = require("../firebase/orm/orm.js");
  // Listen for post request for google sign in
  router.post("/auth/google", (req, res) => {

    fborm.signIn(Firebase, req.body.token).then(data=>{
      if(data.statusCode === 404){
        throw data.error;
      }

      Firebase.token = data.idToken;
      fborm 
      .currentUser(Firebase)
      .then(({statusCode, userRecord}) => {
        let userId = userRecord.uid;
        db.Users.findAll({
          where: {
            id: userId // user Id from firebase token
          }
        }).then(result => {
          if (result.length === 0) {
            // if there is no user with that token, create a new user in mysql
            let newUser = userRecord.displayName;
            let photoURL = userRecord.photoURL;
            db.Users.create({
              id: userId,
              name: newUser,
              proPic: photoURL
            }).then(result => {
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
                  throw err;
                });
            }).catch(err=>{
              throw err;
            });
          } else {
            res.sendStatus(statusCode);
          }
        }).catch(err=>{
          throw err;
        });
        // ...
      }).catch(err=>{
        throw err.error;
      });
    }).catch(err=>{
      throw err.error;
    });
    // Try to sign in with token from client
    
  });
  return router;
};
