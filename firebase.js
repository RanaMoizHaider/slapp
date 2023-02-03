// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth"
import {  } from "firebase/auth"
import { getDatabase, ref as refd, onValue, set } from "firebase/database"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXX",
    authDomain: "XXXXXX.firebaseapp.com",
    projectId: "XXXXXXXX",
    storageBucket: "XXXXXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXX",
    appId: "XXXXXXXXX",
    measurementId: "XXXXXX"
}

// Initialize Firebase
if (firebase.getApps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.getApp()
}

// Initialize Firebase Analytics
isSupported().then((result) => {
    if (result) {
        const analytics = getAnalytics(app)
    }
})

const auth = getAuth()
const db = getDatabase()

const addToFavorites = (userId, stockTicker) => {
    set(refd(db, "users/" + userId + "/favorites/" + stockTicker), true);
};

const removeFromFavorites = (userId, stockTicker) => {
    set(refd(db, "users/" + userId + "/favorites/" + stockTicker), null);
};

export { auth, db, updateProfile, onAuthStateChanged, getDatabase, refd, onValue, set, getStorage, ref, uploadBytes, getDownloadURL, addToFavorites, removeFromFavorites }
