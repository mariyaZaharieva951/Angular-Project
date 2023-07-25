
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const environment = {
    production: true,
    firebase: {
      apiKey: "AIzaSyC-JAyRIrtj1LNgtUhaJTHO2QCBqLfHeuE",
  authDomain: "babyrentacar-b0505.firebaseapp.com",
  databaseURL: "https://babyrentacar-b0505-default-rtdb.firebaseio.com",
  projectId: "babyrentacar-b0505",
  storageBucket: "babyrentacar-b0505.appspot.com",
  messagingSenderId: "472232355864",
  appId: "1:472232355864:web:b4a2a458493ad432327b6d",
  measurementId: "G-NFVYTKDSRT"
    }
  };

  // Initialize Firebase
const app = initializeApp(environment.firebase);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);