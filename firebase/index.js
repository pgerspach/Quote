module.exports = function(firebase, fbAdmin) {
  let config = {
    apiKey: "AIzaSyBHccg7B5UuW6ElHMmClRB-WEdo3t_5hgg",
    authDomain: "quote-userauth.firebaseapp.com",
    databaseURL: "https://quote-userauth.firebaseio.com",
    projectId: "quote-userauth",
    storageBucket: "quote-userauth.appspot.com",
    messagingSenderId: "132459638423"
  };
  firebase.initializeApp(config);

  admin = require("../firebase/admin/userbase.js")(fbAdmin);
  return { firebase, admin };
};
