// Import the functions you need from the SDKs you need
import firebase from "firebase";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwDrADuo9l2CkDnj8YmXWljHa7o6WJdoU",
  authDomain: "hamburger-app-b6d34.firebaseapp.com",
  databaseURL: "https://hamburger-app-b6d34-default-rtdb.firebaseio.com",
  projectId: "hamburger-app-b6d34",
  storageBucket: "hamburger-app-b6d34.appspot.com",
  messagingSenderId: "1008793916155",
  appId: "1:1008793916155:web:932e4004095f9ef4e7965e",
  measurementId: "G-SGSYT117SN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
