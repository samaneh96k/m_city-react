import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
 
} from "firebase/firestore/lite";
import "firebase/auth";
import "firebase/storage"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2TBIY532iMqW3BV8CL6DSjmwmPf4qT_g",
  authDomain: "m-city-6519d.firebaseapp.com",
  projectId: "m-city-6519d",
  storageBucket: "m-city-6519d.appspot.com",
  messagingSenderId: "469710685320",
  appId: "1:469710685320:web:6c0ac7c62a2e65510f4b3d",
  measurementId: "G-93VX2C7S7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const dataMatches = collection(db, "matches");
const dataplayers = collection(db, "players");
const datapositions = collection(db, "positions");
const datapromotions = collection(db, "promotions");
const datateams = collection(db, "teams");





export {
  db,
  storage,
  dataMatches,
  dataplayers,
  datapositions,
  datapromotions,
  datateams
};
