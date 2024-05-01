import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7LQE4OjpYN8fXd9sIrV0LxUVVgkKXC8g",
  authDomain: "command-generator-9d590.firebaseapp.com",
  projectId: "command-generator-9d590",
  storageBucket: "command-generator-9d590.appspot.com",
  messagingSenderId: "1073190140822",
  appId: "1:1073190140822:web:673919d84264bd17d3bbb7",
  measurementId: "G-8DBNMXY9C2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);


export { db, app };
