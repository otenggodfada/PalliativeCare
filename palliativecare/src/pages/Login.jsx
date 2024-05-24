
import {handlelogin} from "../service/databasefirebase"
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import logo from '../assets/images/logo.png';
import im2 from '../assets/images/man.png';
const Login = () => {

  const [mess, setMess]= useState(false)
  const [spin, setSpin]= useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("");
    const navigate = useNavigate();
    const [getfeed, setfeed]= useState('')

    return (    <div className="bg-primaryBackground text-primaryText flex items-center flex-col justify-start min-h-screen p-4">
    <div
      className="pb-5 flex flex-row  justify-between w-full text-accent hover:text-primaryText cursor-pointer"
    
    >
   
    </div>
    <div className="w-full max-w-md   rounded-lg shadow-md p-3 ">
  
  <div class=" m-2">
<div class="flex">
<div class="grow rounded-t-3xl  bg-white pt-6 px-6">
<img className="w-[120px] rounded-b-[70px] relative" src={im2} alt="" />
</div>
<div class="bg-white rounded-tl-[1.6rem] rounded-tr-3xl">
  
  <div class="inner-header p-6  bg-primaryBackground rounded-bl-3xl rounded-tr-3xl">
    <div class="flex items-center justify-center rounded-full bg-white p-4">
     <img className="w-[50px] h-[50px] " src={logo} alt="" />
    </div>
  </div>
</div>
</div>
<div class="rounded-br-3xl rounded-bl-3xl grow bg-white p-3">
<p class="rounded-3xl bg-white p-4 font-semibold text-2xl text-primaryButton text-center ">Sign In</p>
</div>
</div>
      <form onSubmit={(e) => {setSpin(false)
      e.preventDefault();
   
      handlelogin(email, password, navigate, setfeed, setColor).then(()=>{setMess(true)  ,setSpin(true),setEmail(''), setPassword('')},  );
    
    }}className="space-y-4">
     
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
     
        <button type="submit"
  
          className=" flex justify-center w-full p-3 bg-mypink text-white font-semibold rounded-lg shadow-md hover:bg-primaryButton/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryButton"
        >
          {spin? ('Sign In'):<Spinner /> }
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
        Don't have account?{" "}
        <a href="/register" className="text-mypink hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>);
}
 
export default Login;