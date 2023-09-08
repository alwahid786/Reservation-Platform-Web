const admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://djanazah-gebed.firebaseio.com",
});

module.exports = admin;
