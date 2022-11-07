import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  addDoc,
  getDoc
} from "firebase/firestore/lite";
import "firebase/auth";
import { cityDb } from "./temp/m-city-export";
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
const dataMatches = collection(db, "matches");
const dataplayers = collection(db, "players");
const datapositions = collection(db, "positions");
const datapromotions = collection(db, "promotions");
const datateams = collection(db, "teams");

const setData = () => {
  //  cityDb.matches.forEach(async (i) => {
  //    const dataMatche = collection(db, "matches");
  //    const docRef = await addDoc(dataMatche, i);
  //  })
  // cityDb.players.forEach(async (i) => {
  //   const docRef = await addDoc(collection(db, "players"), i);
  //   console.log(docRef)
  // })
  // cityDb.positions.forEach(async (i) => {
  //   const docRef = await addDoc(collection(db, "positions"), i);
  //   console.log(docRef)
  // })
  // cityDb.promotions.forEach(async (i) => {
  //   const docRef = await addDoc(collection(db, "promotions"), i);
  //   console.log(docRef)
  // })
  // cityDb.teams.forEach(async (i) => {
  //   const docRef = await addDoc(collection(db, "teams"), i);
  //   console.log(docRef)
  // })
};
//setData()



// docsSnap.forEach(doc => {
//   console.log(doc.data());
// })

export {
  db,
  dataMatches,
  dataplayers,
  datapositions,
  datapromotions,
  datateams
};
