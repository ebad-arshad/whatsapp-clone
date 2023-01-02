import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut, } from "firebase/auth";
import { doc, setDoc, getFirestore, collection, query, where, getDocs, } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwCWxd2M5NdD7idagpOIqczYxL8RodCds",
    authDomain: "test-38127.firebaseapp.com",
    projectId: "test-38127",
    storageBucket: "test-38127.appspot.com",
    messagingSenderId: "1021886461867",
    appId: "1:1021886461867:web:8975d203163ce8458104ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, ref, uploadBytesResumable, getDownloadURL, doc, signOut, setDoc, collection, query, where, getDocs, };