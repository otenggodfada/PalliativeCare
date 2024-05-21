import Home from "./Home";
import { auth } from "../service/firebaseservice";
import SplashScreen from "./Splashscreen";
import React, { useState, useEffect } from 'react';

import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="App">
      {loading ? <SplashScreen /> : user ? <Home /> : <Login />}
    </div>
  );
}

export default App;
