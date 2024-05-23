/** @format */

import { auth, db , setDoc, doc , onSnapshot} from "../service/firebaseservice";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";


// Handle signup

const handleSignUp = async (email, password, navii, errr, setcolor, username, age, profileurl, telephone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", "alovelace"), {
   username : username,
   age: age, 
   profileurl: profileurl,
   telephone: telephone
   
    
    });
    errr("User signed up successfully!");
    console.log("User signed up:", userCredential.user);
    setcolor("mygreen");
    setTimeout(() => {
      navii("/");
    }, 3000);

  
  } catch (error) {
    console.error("Error signing up:", error);

    errr(error.message);
    setcolor("mypink");
  }
};

// Handle Sign Out
const handleSignOut = async (navii) => {
  try {
    await signOut(auth);
  navii('/login')
    // alert("signout successfully");
  } catch (error) {
    alert("couldnt");
  }
};

const handlelogin = async (email, password, navii, errr, setcolor) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setcolor("mygreen");
    setTimeout(() => {
      navii("/");
    }, 3000);
    errr("User signed in successfully!");
  } catch (error) {
    errr(error.message);
    setcolor("mypink");
  }
};
// Write User info to db
const handleUserinfo =async ()=>{
  try {
     await setDoc(doc(db, "users", "alovelace"), {
      firstname: "Ada",
      lastname: "Lovelace",
    });
  } catch (error) {
    
  }
}
// Read or listen to user info from db
const readUserinfo =async ()=>{
  try {
    onSnapshot(doc(db, "users", "alovelace"), (docSnapshot) => {
      console.log("Latest data: ", docSnapshot.data());
      // ...
    });
  } catch (error) {
    
  }
}


export { handleSignUp, handleSignOut, handlelogin , handleUserinfo, readUserinfo};
