import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBX55Fs_k5v3FH6Z5SYzHowi0GhJwoA8Mg",
  authDomain: "multi-tenant-saas-dashboard.firebaseapp.com",
  projectId: "multi-tenant-saas-dashboard",
  storageBucket: "multi-tenant-saas-dashboard.firebasestorage.app",
  messagingSenderId: "178706384639",
  appId: "1:178706384639:web:4c39261fc676d6ae116eca",
  measurementId: "G-KB9P0PZJFM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);