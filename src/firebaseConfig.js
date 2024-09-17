// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGsZu1iS2O38l4IxIakJPQYR1nLMz7jII	",
  authDomain: "samplecon-72a53.firebaseapp.com",
  projectId: "samplecon-72a53",
  databaseURL: "hhttps://samplecon-72a53-default-rtdb.firebaseio.com/",
  storageBucket: "samplecon-72a53.appspot.com",
  messagingSenderId: "203341638419",
  appId: "1:203341638419:web:62ac40089bb1e86d6e48e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firestore database
const db = getDatabase(firebaseApp);

export { db };
