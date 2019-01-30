module.exports = function(admin) {
  let serviceAccount = require("./userauth-admin.js");

  let adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quote-userauth.firebaseio.com"
  });
  return adminApp;
};
