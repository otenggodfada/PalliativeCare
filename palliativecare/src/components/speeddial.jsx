import React, { useState , useEffect} from 'react';
import { auth } from '../service/firebaseservice';
import { readUserinfo } from '../service/databasefirebase';
import { 
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction, 
  Typography
} from "@material-tailwind/react";
import {
 PlusCircleIcon,
 PencilIcon,
 PlusIcon,
  HomeIcon,
  CogIcon,
  ClipboardDocumentIcon,
  Square3Stack3DIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
} 
from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
const SpeedDial1 = ({onchangedd}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        readUserinfo(setUserData);
      } else {
        setUserData({});
      }
    });

    return () => unsubscribe();
  }, []);
  const navigate = useNavigate();
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal text-mypink",
  };

  return (
    
      <div onMouseEnter={()=>{onchangedd(true)}} onMouseLeave={()=>{onchangedd(false)}} onClick={()=>{}} className="fixed bottom-0 right-0 mb-[70px] pr-5 ">
     <SpeedDial  >
          <SpeedDialHandler >
            <IconButton size="lg" className="rounded-full bg-mypink border border-white shadow-2xl">
              <PlusCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10">
        {userData.role ==='Palliative Care'&&     <SpeedDialAction onClick={()=>{navigate('/createblog')}}className="relative">
              <PencilIcon className="h-5 w-5 text-mypink" />
              <Typography {...labelProps}>Blog</Typography>
            </SpeedDialAction>}
            <SpeedDialAction onClick={()=>{navigate('/stracker')}} className="relative">
              <ClipboardDocumentListIcon className="h-5 w-5 text-mypink" />
              <Typography {...labelProps}>Symptom Tracking</Typography>
            </SpeedDialAction>
            <SpeedDialAction onClick={()=>{navigate('/healthr')}} className="relative">
              <CircleStackIcon className="h-5 w-5 text-mypink" />
              <Typography  {...labelProps}>Health Records</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
 
  );
};

export default SpeedDial1;