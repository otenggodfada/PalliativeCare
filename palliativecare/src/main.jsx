import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <BrowserRouter>
 <Routes>
<Route path='/' element={<Home/>}/>
<Route path='login' element={<Login/>}/>
<Route path='register' element={<Register/>}/>


 </Routes>
 </BrowserRouter>
  </React.StrictMode>,
)
