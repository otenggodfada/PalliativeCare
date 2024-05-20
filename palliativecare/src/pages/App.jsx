import Home from "./Home";
import SplashScreen from "./Splashscreen";
import React, { useState, useEffect } from 'react';
function App() {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 4000); // Adjust the timeout as needed
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="App">
        {loading ? <SplashScreen /> : <Home />}
      </div>
    );
  }
  
  export default App;