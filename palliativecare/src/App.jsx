import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import history from './service/history.jsx';
import './index.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Settings from './pages/Settings.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SplashScreen from './pages/Splashscreen.jsx';

import Caretakers from './components/caretakers.jsx';
import Categories from './components/categories.jsx';




const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a Protected Route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // User not logged in, redirect to SplashScreen
    return <Navigate to="/" />;
  }

  return children;
};




ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
 <BrowserRouter history={history}>

<Routes>
          <Route path='/' element={<SplashScreen />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path='/settings' element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path='/categories' element={
            <ProtectedRoute>
              <Categories/>
            </ProtectedRoute>
          }/>
          <Route path='/caretakers' element={
            <ProtectedRoute>
              <Caretakers />
            </ProtectedRoute>
          }/>
          {/* ... other routes */}
        </Routes>



 </BrowserRouter>
</AuthProvider>
)

