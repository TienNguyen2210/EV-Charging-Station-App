// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCusZR6Z5lWjooM3yx97IVIXYRzlqVuR5A",
  authDomain: "map-b983a.firebaseapp.com",
  projectId: "map-b983a",
  storageBucket: "map-b983a.appspot.com",
  messagingSenderId: "223154998749",
  appId: "1:223154998749:web:579e85e42a43dcbb1cfa34",
  measurementId: "G-FHQ3P4CCSZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);