import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnS0_2XascY0eLKs9VlEoqicv6YB7EGZQ",
    authDomain: "app-de-barbearia-eddc7.firebaseapp.com",
    projectId: "app-de-barbearia-eddc7",
    storageBucket: "app-de-barbearia-eddc7.firebasestorage.app",
    messagingSenderId: "702822942410",
    appId: "1:702822942410:web:694257469f8597d8fad633",
    measurementId: "G-E3NCXPNNS1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
