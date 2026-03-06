import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1j7iriLgbu_91FFpzvHpD7-Gr1o4NZgY",
  authDomain: "calorie-tracker-c58c8.firebaseapp.com",
  projectId: "calorie-tracker-c58c8",
  storageBucket: "calorie-tracker-c58c8.firebasestorage.app",
  messagingSenderId: "641190496933",
  appId: "1:641190496933:web:a91139459e25d023099b4c",
  measurementId: "G-4X56FFMX11"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);