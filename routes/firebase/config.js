import admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // I get error HERE
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
export const db = admin.database();
