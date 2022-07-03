import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCUU3D9sXv_HUpvyXEV7EGMXgTt7HSgx6w",
  authDomain: "shoppinglist-bff5b.firebaseapp.com",
  projectId: "shoppinglist-bff5b",
  storageBucket: "shoppinglist-bff5b.appspot.com",
  messagingSenderId: "626753775896",
  appId: "1:626753775896:web:0c115261fc4312b258d66d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
