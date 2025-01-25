// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tubeguruji-startups.firebaseapp.com",
  databaseURL:"https://tubeguruji-startups-default-rtdb.firebaseio.com",
  projectId: "tubeguruji-startups",
  storageBucket: "http://tubeguruji-startups-appspot.com",
  messagingSenderId: "706430327770",
  appId: "1:706430327770:web: d8ccd85c1c4a0cecad3ee3",
  measurementId: "G-YSYOZ3WDMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)