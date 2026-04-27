
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-interviewer-e8865.firebaseapp.com",
  projectId: "ai-interviewer-e8865",
  storageBucket: "ai-interviewer-e8865.firebasestorage.app",
  messagingSenderId: "683992247673",
  appId: "1:683992247673:web:78de27164f911864a3d3a8",
  measurementId: "G-FKWRWP2VRF"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider}