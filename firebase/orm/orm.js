module.exports = {
  signIn: function(Firebase, token) {
    var credential = Firebase.firebase.auth.GoogleAuthProvider.credential(
      // get user credential from token provided by client
      token
    );
    return new Promise((resolve, reject) => {
      Firebase.firebase
        .app()
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(data => {
          Firebase.firebase
            .auth()
            .currentUser.getIdToken()
            .then(idToken => {
              resolve({
                statusCode: 200,
                idToken: idToken
              });
            })
            .catch((error) =>{
              reject({
                statusCode: 404,
                error: "A"
              });
            });
        })
        .catch((error)=> {
          reject({
            statusCode: 404,
            error: "B"
          });
        });
    });
  },
  currentUser: function(Firebase) {
    return new Promise((resolve, reject) => {
      Firebase.admin
        .auth()
        .verifyIdToken(Firebase.token)
        .then(decodedToken => {
          Firebase.admin
            .auth()
            .getUser(decodedToken.uid)
            .then(userRecord => {
              resolve({
                statusCode: 200,
                userRecord: userRecord
              });
            })
            .catch(error => {
              reject({
                statusCode: 404,
                error: "C"
              });
            });
        })
        .catch(error => {
          reject({
            statusCode: 404,
            error: "D"
          });
        });
    });
  }
};
