import firebase from 'firebase';
import { getAuth } from "firebase/auth";
import{collection, getDocs ,deleteDoc} from'firebase/firestore';

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhWh47sK4Vo2SJNOSFYNMaHkGY5XZuZgk",
  authDomain: "tunpaper-pfe-579ed.firebaseapp.com",
  projectId: "tunpaper-pfe-579ed",
  storageBucket: "tunpaper-pfe-579ed.appspot.com",
  messagingSenderId: "803240991401",
  appId: "1:803240991401:web:904b0db691d3a9b9a6a7b8"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

 const db = app.firestore();
 const storage=app.getStorage;

 
 export default db ;







