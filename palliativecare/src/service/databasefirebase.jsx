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

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// upload file to db

// Function to upload profile image to Firebase Storage
const uploadProfileImage = async (profileUrl) => {
  const storageRef = ref(storage, "profile_images/" + generateRandomName());
  try {
    const metadata = {
      contentType: "image/jpeg",
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
};

const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
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
  role,
  profession,
  specialists,
  experience,
  verify,
  rating
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
      role: role,
      profession: profession,
      specialists: specialists,
      email: email,
      experience: experience,
      verify: verify,
      rating: rating,
      Id: auth.currentUser.uid,
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
 window.confirm('Are you sure?')
 navii("/login");
    // alert("signout successfully");
  } catch (error) {
    alert("couldnt");
  }
};


//Handle login
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
  } catch (error) { }
};
// Read or listen to user info from db
const readUserinfo = (userdetails) => {
  try {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          var locall = [];
          locall = docSnapshot.data();

          userdetails(locall);
        } else {
          console.log("No such document!");
        }
      }
    );

    // Optional: Return the unsubscribe function if you want to stop listening later
    return unsubscribe;
  } catch (error) {
    console.error("Error reading user info: ", error);
  }
};

// Function to update user info in Firestore single
export const updateUserinfo = async (userData) => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData, { merge: true });
  }
};

//Read or listen to public users

const getAllDocuments = async () => {
  try {
    // Fetch all documents in the "users" collection
    const querySnapshot = await getDocs(collection(db, "users"));

    // Extract the data from each document
    const documents = querySnapshot.docs.map((doc) => doc.data());

    // Return the array of document data
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};
getAllDocuments();

//Update user data by public
const setAllDocuments = async (documents) => {
  try {
    // Iterate over the documents array and set each document in the "users" collection
    const setPromises = documents.map((document) => {
      const docRef = doc(collection(db, "users"), document.id); // Assuming each document has an 'id' field
      return setDoc(docRef, document);
    });

    // Wait for all set operations to complete
    await Promise.all(setPromises);

    console.log("All documents have been set successfully");
  } catch (error) {
    console.error("Error setting documents: ", error);
  }
};

export {
  handleSignUp,
  handleSignOut,
  handlelogin,
  handleUserinfo,
  readUserinfo,
  getAllDocuments,
  setAllDocuments,
};
