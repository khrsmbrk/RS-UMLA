import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  setLogLevel,
} from "firebase/firestore";

// Import the Firebase configuration
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Silence Firestore configuration warnings for missing '(default)' database
setLogLevel("silent");

// Initialize Firestore with long-polling fallback to help with "unavailable" errors
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  (firebaseConfig as any).firestoreDatabaseId,
);

export const auth = getAuth(app);
