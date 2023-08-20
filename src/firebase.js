// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBzlQFS0tl1np-bwe5u_UcVjBWygaVe9Aw",
  // authDomain: "launchpad-4d26c.firebaseapp.com",
  // projectId: "launchpad-4d26c",
  // storageBucket: "launchpad-4d26c.appspot.com",
  // messagingSenderId: "275322578554",
  // appId: "1:275322578554:web:acc5cf378580eab0b3fdc3",
  // measurementId: "G-MQRQC3G6BR"
  apiKey: "AIzaSyDo-_8nKzTVsakppq-QbJDFu0E6ln1CMFw",
  authDomain: "launchpad-4934b.firebaseapp.com",
  databaseURL: "https://launchpad-4934b-default-rtdb.firebaseio.com",
  projectId: "launchpad-4934b",
  storageBucket: "launchpad-4934b.appspot.com",
  messagingSenderId: "412363354586",
  appId: "1:412363354586:web:a3133eedc300b3ea9390e3",
  measurementId: "G-ME40EQ92PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const an alytics = getAnalytics(app);
const database = getDatabase(app);

export { database };