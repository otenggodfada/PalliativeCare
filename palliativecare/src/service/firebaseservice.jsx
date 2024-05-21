import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


    const firebaseConfig = {
        apiKey: "AIzaSyAClVlejY-DZyIkrWApwJcpwS05Cti15z4",
        authDomain: "palliativecare-26a3b.firebaseapp.com",
        projectId: "palliativecare-26a3b",
        storageBucket: "palliativecare-26a3b.appspot.com",
        messagingSenderId: "819101533522",
        appId: "1:819101533522:web:b338c183a94e9b44fce68b"
      };
      
      const app = initializeApp(firebaseConfig);

      // Initialize Firestore
      const db = getFirestore(app);
      
      // Initialize Firebase Auth
      const auth = getAuth(app);
    

 
export { app, db, auth };