import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


let config = {
    
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.default.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firebase, db, googleAuthProvider };
