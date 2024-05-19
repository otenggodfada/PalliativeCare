import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Settings from './pages/Settings.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import App from './pages/App.jsx';
import SplashScreen from './pages/Splashscreen.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <BrowserRouter>
 <Routes>
<Route path='/' element={<App/>}/>
<Route path='home' element={<Home/>}/>
<Route path='login' element={<Login/>}/>
<Route path='register' element={<Register/>}/>
<Route path='settings' element={<Settings/>}/>
<Route path='dashboard' element={<Dashboard/>}/>
<Route path='profile' element={<Profile/>}/>


 </Routes>
 </BrowserRouter>
  </React.StrictMode>,
)
