// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtKc5npLlMyyBcxsOF7g3AnlTrOJjS3eg",
  authDomain: "myappbar-react-native.firebaseapp.com",
  projectId: "myappbar-react-native",
  storageBucket: "myappbar-react-native.appspot.com",
  messagingSenderId: "788983827205",
  appId: "1:788983827205:web:ab8ca3e32178dc4498056c",
  measurementId: "G-W3BTDGS70H"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    firebaseConfig,
    db,
    app
}