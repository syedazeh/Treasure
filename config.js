import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVmaTqW-vCqSsA0Z94UQson0ENfB9DYPI",
  authDomain: "syedaproject-9bd5f.firebaseapp.com",
  projectId: "syedaproject-9bd5f",
  storageBucket: "syedaproject-9bd5f.appspot.com",
  messagingSenderId: "60644734935",
  appId: "1:60644734935:web:ad6a9abfe14a84aef17d92"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);


