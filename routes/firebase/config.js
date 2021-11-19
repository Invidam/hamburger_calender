import admin from "firebase-admin";

import serviceAccountKey from "../../key/serviceAccountKey.js";
//../../key/serviceAccountKey.js

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),

  databaseURL: "https://hamburger-app-b6d34-default-rtdb.firebaseio.com/",
});

export const db = admin.database();
