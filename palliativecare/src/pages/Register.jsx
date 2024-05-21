/** @format */
import {handleSignUp} from "../service/databasefirebase"
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
const Register = () => {
const [mess, setMess]= useState(false)
const [spin, setSpin]= useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const [getfeed, setfeed]= useState('')
  return (
    <>
    
    
     <div className="bg-primaryBackground text-primaryText flex items-center flex-col justify-start min-h-screen p-4">
      <div
        className="pb-5 flex flex-row  justify-between w-full text-accent hover:text-primaryText cursor-pointer"
      
      >
     
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-mypink">
          Sign Up
        </h2>
        <form onSubmit={(e) => {setSpin(false)
        e.preventDefault();
     
        handleSignUp(email, password, navigate, setfeed, setColor).then(()=>{setMess(true)  ,setSpin(true),setEmail(''), setPassword('')},  );
      
      }}className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-secondaryText">
              Name
            </label>
            <input 
           
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
              placeholder="Your name"
              required
            ></input>
          </div>
          <div>
            <label   htmlFor="email" className="block text-secondaryText">
              Email
            </label>
            <input  onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
              placeholder="Your email"
              required
            ></input>
          </div>
          <div>
            <label  htmlFor="password" className="block text-secondaryText">
              Password
            </label>
            <input
            value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
              placeholder="Your password"
              required
            ></input>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-secondaryText">
              Confirm Password
            </label>
            <input
             
              id="confirm-password"
              name="confirm-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
              placeholder="Confirm your password"
              required
            ></input>
          </div>
          <button type="submit"
    
            className=" flex justify-center w-full p-3 bg-mypink text-white font-semibold rounded-lg shadow-md hover:bg-primaryButton/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryButton"
          >
            {spin? ('Sign Up'):<Spinner /> }
          </button>
        </form>
        {mess? (
       
          <Alert
    
         className={`mt-3 rounded-none border-l-4 border-${color}   bg-white font-medium text-${color}`}
       >
   {getfeed}
       </Alert>
      
      ):( <div >
         
        </div>)}
        <p className="mt-6 text-center text-secondaryText">
          Already have an account?{" "}
          <a href="/login" className="text-mypink hover:underline">
            Log in
          </a>
        </p>
      
      </div>
    </div></>
  );
};

export default Register;
