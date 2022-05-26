// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCkENp934zmyKyYVe99eQHO8xk-Hx9zpis",
    // authDomain: "plex-4449f.firebaseapp.com",
    // projectId: "plex-4449f",
    // storageBucket: "plex-4449f.appspot.com",
    // messagingSenderId: "418593513138",
    // appId: "1:418593513138:web:31fdbe99b9cc69d6ceb3ab",

    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;