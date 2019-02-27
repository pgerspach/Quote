module.exports = {
  signIn: (Firebase, token) =>{
    var credential = Firebase.firebase.auth.GoogleAuthProvider.credential(
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
  currentUser: (Firebase, idToken) =>{
    return new Promise((resolve, reject) => {
      Firebase.admin
        .auth()
        .verifyIdToken(idToken)
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
                error: decodedToken
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
