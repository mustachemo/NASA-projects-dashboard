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

// prettier-ignore
exports.addTagsToAlgoParams = functions.firestore
    .document("projects/{title}")
    .onCreate(async (snap, context) => {
      const project = snap.data();
      const tags = project.tags;

      // Get the document named 'params' from 'algoparams' collection
      const algoParamsRef = admin
          .firestore()
          .collection("algoparams")
          .doc("params");

      // Fetch current params data
      const algoParamsDoc = await algoParamsRef.get();
      if (!algoParamsDoc.exists) {
      // If 'params' document does not exist, create it and set its tags
        return algoParamsRef.set({tags});
      } else {
      // If 'params' document exists, update its tags by adding new tags
        const existingTags = algoParamsDoc.data().tags || [];
        const updatedTags = [...new Set([...existingTags, ...tags])];

        return algoParamsRef.update({tags: updatedTags});
      }
    });
