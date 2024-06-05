/** @format */
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import Dashboard from "./Dashboard";

import Profile from "./Profile";
import Dropdown from "../components/dropdwon";
import DrawerWithNavigation from "../components/drawer";

import { readUserinfo } from "../service/databasefirebase";
import { auth } from "../service/firebaseservice";

import SpeedDial from "../components/speeddial";
import MyChats from "../components/mychats";

import BlogListPage from "../components/BlogListPage";
const Home = () => {
  const [navigation, setNavigation] = useState(<Dashboard />);
  const [activePage, setActivePage] = useState("Dashboard");
  const [userd, setuserd] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        readUserinfo(setuserd);
      } else {
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleNavigation = (page) => {
    switch (page) {
      case "Dashboard":
        setNavigation(<Dashboard />);
        break;
      case "Messages":
        setNavigation(<MyChats />);
        break;
      case "Allblogs":
        setNavigation(<BlogListPage />);
        break;
      case "Profile":
        setNavigation(<Profile />);
        break;
      default:
        setNavigation(<Dashboard />);
    }
    setActivePage(page);
  };

  return (

   <>

<div className="bg-primaryBackground text-primaryText flex flex-col min-h-screen">

   

      <main className="p-4 flex-grow">{navigation}
      <header className="bg-accent text-white p-4 fixed top-0 right-0 left-0 w-full  ">

<div className="flex items-center justify-between">
  <DrawerWithNavigation />
  <div className="pl-4 flex flex-row items-center">
    <img className="size-9" src={logo} alt="logo" />
    <h1 className="text-2xl font-bold">Palliative Care</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#ff145b"
    >
      <path d="M360-160q-19 0-34-11t-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11Z" />
    </svg>
  </div>
  <Dropdown imgg={userd.profilpc} />
</div>
</header>
      <SpeedDial></SpeedDial>
      </main>

      <footer className="bg-accent text-white p-4 mt-4 fixed bottom-0 w-full">
        <div className="container mx-auto flex justify-between">
          <div onClick={() => handleNavigation("Dashboard")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={activePage === "Dashboard" ? "#FF2A70" : "white"}
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </div>

          <div onClick={() => handleNavigation("Messages")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={activePage === "Messages" ? "#FF2A70" : "white"}
            >
              <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
            </svg>
          </div>
          <div onClick={() => handleNavigation("Allblogs")}>
         

            <svg xmlns="http://www.w3.org/2000/svg" height="27px" viewBox="0 -960 960 960" width="27px"
              fill={activePage === "Allblogs" ? "#FF2A70" : "white"}><path d="M200-120q-33 0-56.5-23.5T120-200q0-33 23.5-56.5T200-280q33 0 56.5 23.5T280-200q0 33-23.5 56.5T200-120Zm480 0q0-117-44-218.5T516-516q-76-76-177.5-120T120-680v-120q142 0 265 53t216 146q93 93 146 216t53 265H680Zm-240 0q0-67-25-124.5T346-346q-44-44-101.5-69T120-440v-120q92 0 171.5 34.5T431-431q60 60 94.5 139.5T560-120H440Z"/></svg>
          </div>
          <div onClick={() => handleNavigation("Profile")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="27px"
              viewBox="0 -960 960 960"
              width="27px"
              fill={activePage === "Profile" ? "#FF2A70" : "white"}
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </div>
        </div>
        
      </footer>
    </div>
   </>
  );
};

export default Home;
