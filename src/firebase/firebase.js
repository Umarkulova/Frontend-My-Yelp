import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCSqocUhCtGud6pHQjkWwEh0ksYlfNpdtQ",
  authDomain: "yelp-a5d0a.firebaseapp.com",
  projectId: "yelp-a5d0a",
  storageBucket: "yelp-a5d0a.appspot.com",
  messagingSenderId: "676875137566",
  appId: "1:676875137566:web:5ad3a0ac5303182538740f",
  measurementId: "G-MB41WE73VK"
};


const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
