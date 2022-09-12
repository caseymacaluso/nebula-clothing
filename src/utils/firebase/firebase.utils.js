import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Copied from Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc6z56duqaE7sP3D-8LGqTg4cMuoI8u6o",
  authDomain: "nebula-clothing-db.firebaseapp.com",
  projectId: "nebula-clothing-db",
  storageBucket: "nebula-clothing-db.appspot.com",
  messagingSenderId: "832353863266",
  appId: "1:832353863266:web:ffc28e43509d51e93df33b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GoogleAuthProvider is a class, may want multiple for different purposes
const googleProvider = new GoogleAuthProvider();

// Set custom provider parameters
googleProvider.setCustomParameters({
  prompt: "select_account", // anytime someone interacts with our provider, we want to force them to select an account
});

export const auth = getAuth(); // not a class, auth setup (rules, configuration) should be the same for the entire application
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, moreInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  // if user data does not exist, attempt to set the data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...moreInfo,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
