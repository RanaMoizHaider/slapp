// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGc7roOi0UhbgvRF9pb_p_s2gL785u8G8",
    authDomain: "allinone-69.firebaseapp.com",
    projectId: "allinone-69",
    storageBucket: "allinone-69.appspot.com",
    messagingSenderId: "846438362597",
    appId: "1:846438362597:web:dcfa0422887367e7e3530c",
    measurementId: "G-BWWYWL3S7D"
};

// Initialize Firebase
if (firebase.getApps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}
isSupported().then((result) => {
    if (result) {
        const analytics = getAnalytics(app);
    }
})

const auth = getAuth();
export { auth, getDatabase, ref, onValue, set };