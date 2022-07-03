import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCUU3D9sXv_HUpvyXEV7EGMXgTt7HSgx6w",
  authDomain: "shoppinglist-bff5b.firebaseapp.com",
  databaseURL: "https://shoppinglist-bff5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-bff5b",
  storageBucket: "shoppinglist-bff5b.appspot.com",
  messagingSenderId: "626753775896",
  appId: "1:626753775896:web:0c115261fc4312b258d66d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);