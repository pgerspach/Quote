module.exports = function(router, Firebase) {
  const db = require("../models");
  const fborm = require("../firebase/orm/orm.js");
  // Listen for post request for google sign in
  router.post("/auth/google", (req, res) => {
    Firebase.firebase.auth().onAuthStateChanged(function(user) {
      // Listen for change in auth status...
      if (user) {
        // User is signed in.
        console.log("User in");
      } else {
        // No user is signed in.
        console.log("User Not");
      }
    });
    fborm.signIn(Firebase.firebase, req.body.token).then(resolve => {
      // Try to sign in with token from client
      fborm // if successul, get id token and then decoded token to use as userId in mySql
        .currentUser(Firebase.firebase)
        .getIdToken()
        .then(token => {
          Firebase.admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {
              let userId = decodedToken.uid;
              db.Users.findAll({
                where: {
                  id: userId // user Id from firebase token
                }
              }).then(result => {
                if (result.length === 0) {
                  // if there is no user with that token, create a new user in mysql
                  let newUser = fborm.currentUser(Firebase.firebase)
                    .displayName;
                  let photoURL = fborm.currentUser(Firebase.firebase).photoURL;
                  db.Users.create({
                    id: userId,
                    name: newUser,
                    proPic: photoURL
                  }).then(result => {
                    console.log("Created User: " + newUser);
                    db.Friendship.bulkCreate([{
                      uuid_1:userId,
                      uuid_2:"23",
                      status:2
                    },
                    {
                      uuid_1:userId,
                      uuid_2:"123",
                      status:2
                    },
                    {
                      uuid_1:userId,
                      uuid_2:"54",
                      status:2
                    },
                    {
                      uuid_1:userId,
                      uuid_2:"12364",
                      status:2
                    },
                    {
                      uuid_1:userId,
                      uuid_2:"542",
                      status:2
                    }]).then(()=>{
                      res.sendStatus(resolve.statusCode);

                    }).catch(err=>{
                      if(err) throw err;
                    })
                  });
                } else {
                  res.sendStatus(resolve.statusCode);
                }
              });
              // ...
            })
            .catch(function(error) {
              // Handle error
              if (error) throw error;
            });
        })
        .catch(err => {
          if (err) throw err;
        });
    });
  });
  return router;
};
