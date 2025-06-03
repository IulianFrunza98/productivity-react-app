import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkoYk7h5bgvkLNOkkOFk-B53HB309Pvbk",
  authDomain: "react-tasks-manager-a8488.firebaseapp.com",
  projectId: "react-tasks-manager-a8488",
  storageBucket: "react-tasks-manager-a8488.firebasestorage.app",
  messagingSenderId: "775529283520",
  appId: "1:775529283520:web:7344c17fc43c1101b4d225",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
