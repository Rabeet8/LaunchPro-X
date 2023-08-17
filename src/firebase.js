// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzlQFS0tl1np-bwe5u_UcVjBWygaVe9Aw",
  authDomain: "launchpad-4d26c.firebaseapp.com",
  projectId: "launchpad-4d26c",
  storageBucket: "launchpad-4d26c.appspot.com",
  messagingSenderId: "275322578554",
  appId: "1:275322578554:web:acc5cf378580eab0b3fdc3",
  measurementId: "G-MQRQC3G6BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };