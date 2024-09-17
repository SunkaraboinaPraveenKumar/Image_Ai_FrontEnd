
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aiimagegenprav.firebaseapp.com",
  projectId: "aiimagegenprav",
  storageBucket: "aiimagegenprav.appspot.com",
  messagingSenderId: "240180196790",
  appId: "1:240180196790:web:7a22a9c7e3d7c4d7ecfd17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);

export { db,storage };