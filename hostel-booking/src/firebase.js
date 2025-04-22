import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBl_ktX7F3g9BYdjwmxkt5HBqbvlXJHslg",
  authDomain: "hostel-booking-9a628.firebaseapp.com",
  projectId: "hostel-booking-9a628",
  storageBucket: "hostel-booking-9a628.firebasestorage.app",
  messagingSenderId: "98382327519",
  appId: "1:98382327519:web:8c99366f4a9d770788c36a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
