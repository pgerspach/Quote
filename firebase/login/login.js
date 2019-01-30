module.exports = function(firebase){
  let config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "quote-userauth.firebaseapp.com",
    databaseURL: "https://quote-userauth.firebaseio.com",
    projectId: "quote-userauth",
  };
  firebase.initializeApp(config);
  return firebase;
};