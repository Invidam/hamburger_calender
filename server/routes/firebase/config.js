import admin from "firebase-admin";
// var serviceAccount = require("../../../key/hamburger-app-b6d34-firebase-adminsdk-g0n5a-de30e4df9c.json");
import serviceAccountKey from "../../../key/serviceAccountKey.js";

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccountKey),

  databaseURL: "https://hamburger-app-b6d34-default-rtdb.firebaseio.com/",
});

export const db = admin.database();

// const usersRef = ref.child("users");
// const dataWrite = () => {
//   console.log("WRITE FUN");
//   ref.set({
//     name: "TEST",
//     on: 1,
//   });
// };

// dataWrite();
