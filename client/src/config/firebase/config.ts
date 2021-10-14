import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArjJag9_fvsY81d_nGpdbud0IJ4b-y0kg",
    authDomain: "comp30022-crm-app.firebaseapp.com",
    projectId: "comp30022-crm-app",
    storageBucket: "comp30022-crm-app.appspot.com",
    messagingSenderId: "267407061561",
    appId: "1:267407061561:web:96b163d4767118ee9d13e8",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
