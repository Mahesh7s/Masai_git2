
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
  import { getFirestore} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAX4VqL2mgwkhghELL5PHH_XrGmEK-_dLo",
    authDomain: "auth-d4729.firebaseapp.com",
    projectId: "auth-d4729",
    storageBucket: "auth-d4729.firebasestorage.app",
    messagingSenderId: "539612669376",
    appId: "1:539612669376:web:360435dc93abf140e4d425",
    measurementId: "G-NSCE9DFS7L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 export const auth = getAuth(app)
 export  const db = getFirestore(app)
