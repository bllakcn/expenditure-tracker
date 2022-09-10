import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASevlGj8aXFA5_6CRy20TisTtDwcJy6f8",
  authDomain: "expenditure-tracker-6096e.firebaseapp.com",
  projectId: "expenditure-tracker-6096e",
  storageBucket: "expenditure-tracker-6096e.appspot.com",
  messagingSenderId: "983178869152",
  appId: "1:983178869152:web:7035f92d326d1c83b70cc5"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

export { db, auth }