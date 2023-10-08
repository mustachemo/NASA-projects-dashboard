const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// prettier-ignore
exports.createUserRecord = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    username: user.email.split("@")[0],
  });
});
