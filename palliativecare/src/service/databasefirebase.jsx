/** @format */

import {
  auth,
  db,
  setDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  storage,
} from "../service/firebaseservice";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { data } from "autoprefixer";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Timestamp } from "firebase/firestore";
// upload file to db

// Function to upload profile image to Firebase Storage
const uploadProfileImage = async (profileUrl) => {
 
  const storageRef = ref(storage, "profile_images/" + generateRandomName());
  try {
    const metadata = {
      contentType: 'image/jpeg'
    };
    // Upload file to Firebase Storage
    await uploadBytes(storageRef, profileUrl, metadata);
    const downloadURL = await getDownloadURL(storageRef);

    //return the download link
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

// Function to generate a random name for the image
const generateRandomName = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomName = "";
  for (let i = 0; i < 10; i++) {
    randomName += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomName;
};
// Handle signup

// calcute timestamp
let time = {
  seconds: 1613748319,
  nanoseconds: 47688698687,
}

const fireBaseTime = new Date(
  time.seconds * 1000 + time.nanoseconds / 1000000,
);
const date = fireBaseTime.toDateString();
const atTime = fireBaseTime.toLocaleTimeString();
const handleSignUp = async (
  email,
  password,
  navii,
  errr,
  setcolor,
  username,
  age,
  profileurl,
  telephone,
  role

) => {
  try {
    const getprofilelink = await uploadProfileImage(profileurl);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username: username,
      age: age,
      profilpc: getprofilelink,
      telephone: telephone,
      dcreated: atTime,
      role: role
    });
    errr("User signed up successfully!");
    console.log("User signed up:", userCredential.user);
    setcolor("mygreen");
    setTimeout(() => {
      navii("/home");
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
    navii("/login");
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
const handleUserinfo = async () => {
  try {
    await setDoc(doc(db, "users", "alovelace"), {
      firstname: "Ada",
      lastname: "Lovelace",
    });
  } catch (error) {}
};
// Read or listen to user info from db
const readUserinfo = (userdetails) => {
 
  try {
    
    const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnapshot) => {
      if (docSnapshot.exists()) {

        var locall = []
   locall = docSnapshot.data()
   


userdetails(locall)
    
   
    
      } else {
        console.log("No such document!");
      } 
    }); 
    
    // Optional: Return the unsubscribe function if you want to stop listening later
    return unsubscribe;
    
  } catch (error) {
    console.error("Error reading user info: ", error);
  }

};





//Read or listen to public users

const getAllDocuments = async () => {
  try {
    // Fetch all documents in the "users" collection
    const querySnapshot = await getDocs(collection(db, "users"));
    
    // Extract the data from each document
    const documents = querySnapshot.docs.map(doc => doc.data());
    
    // Log each username to the console
    documents.forEach(doc => {
      console.log(doc.username);
    });
    
    // Return the array of document data
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

getAllDocuments();


export {
  handleSignUp,
  handleSignOut,
  handlelogin,
  handleUserinfo,
  readUserinfo,
  getAllDocuments
};
