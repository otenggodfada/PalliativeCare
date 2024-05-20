/** @format */

import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png"
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";
import Dropdown from '../components/dropdwon';
import DrawerWithNavigation from "../components/drawer";
const Home = () => {
  const [navigation, setNavigations] = useState(Dashboard);
  const [ishome, setHome]= useState(true)
  const [issettings, setSettings]= useState(false)
  const [isprofile, setProfile]= useState(false)
  function paginations(pagess,) {
    setNavigations(pagess);
    
   
  }

  return (
    <div className="bg-primaryBackground text-primaryText flex flex-col min-h-screen">
      <header className="bg-accent text-white p-4 fixed top-0 w-screen">
        <div className="flex   items-center justify-between">
          {" "}
          <div>
         <DrawerWithNavigation></DrawerWithNavigation>
          </div>{" "}
          <div className=" pl-4 flex-row flex">
          <img className=" size-9" src={logo} alt="logo" />
            <h1 className="text-2xl font-bold">alliative Care</h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff145b"><path d="M360-160q-19 0-34-11t-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11Z"/></svg>
          </div>
       

<Dropdown/>
        </div>
      </header>

      <main className="p-4 flex-grow">{navigation}</main>

      <footer className="bg-accent text-white p-4 mt-4 fixed bottom-0 w-full ">
        <div className="container mx-auto flex justify-between">
          <div 
            onClick={() => {
              paginations(Dashboard);
              setHome(true)
              setProfile(false)
              setSettings(false)
      
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={ishome? "#FF2A70":"white"}
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </div>
          <div
            onClick={() => {
              paginations(Settings );
              setHome(false)
              setProfile(false)
              setSettings(true)
        
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={issettings? "#FF2A70":"white"}
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </div>
          <div
            onClick={() => {
              paginations(Profile );
              setHome(false)
              setProfile(true)
              setSettings(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={isprofile? "#FF2A70":"white"}
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </div>
        </div>
      </footer>
      
    </div>
  );
};
export default Home;
