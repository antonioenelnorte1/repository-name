
/**
 * Firebase Service is currently disabled.
 * To re-enable:
 * 1. Add your config to firebaseConfig.
 * 2. Uncomment the initialization code.
 * 3. Restore Firebase imports in AuthContext.tsx.
 */

/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "northlink-app.firebaseapp.com",
  projectId: "northlink-app",
  storageBucket: "northlink-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
*/

export const auth = null;
export const db = null;
export const googleProvider = null;
