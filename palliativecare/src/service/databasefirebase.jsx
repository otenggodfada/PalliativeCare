/** @format */

import { auth, db } from "../service/firebaseservice";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";


// Handle signup

const handleSignUp = async (email, password, navii, errr, setcolor) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    setcolor("mygreen");
    setTimeout(() => {
      navii("/");
    }, 3000);

    errr("User signed up successfully!");
  } catch (error) {
    console.error("Error signing up:", error);

    errr(error.message);
    setcolor("mypink");
  }
};

// Handle Sign Out
const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert("signout successfully");
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

export { handleSignUp, handleSignOut, handlelogin };
