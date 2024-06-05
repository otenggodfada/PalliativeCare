import React, { useState } from 'react';

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
const SpeedDial1 = () => {
  const navigate = useNavigate();
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  return (
    
      <div className="fixed bottom-0 right-0 mb-[70px] pr-5 ">
     <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full bg-mypink border border-white shadow-2xl">
              <PlusCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="rounded-full border border-blue-gray-50 bg-white shadow-xl shadow-black/10">
            <SpeedDialAction onClick={()=>{navigate('/createblog')}}className="relative">
              <PencilIcon className="h-5 w-5" />
              <Typography {...labelProps}>Blog</Typography>
            </SpeedDialAction>
            <SpeedDialAction onClick={()=>{navigate('/stracker')}} className="relative">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <Typography {...labelProps}>Symptom Tracking</Typography>
            </SpeedDialAction>
            <SpeedDialAction onClick={()=>{navigate('/healthr')}} className="relative">
              <CircleStackIcon className="h-5 w-5" />
              <Typography {...labelProps}>Health Records</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
 
  );
};

export default SpeedDial1;