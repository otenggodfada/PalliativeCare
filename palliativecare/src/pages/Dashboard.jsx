/** @format */


import "@fortawesome/fontawesome-free/css/all.min.css";

import React from "react";

import { useEffect, useState } from "react";
import Search from "../components/search";
import DialogImage from "../components/dialogviewimage";
import { ButtonGroup, Button, IconButton } from "@material-tailwind/react";
import { readUserinfo, updateUserinfo } from "../service/databasefirebase"; 
import { Link } from "react-router-dom";
import jasondataa from "../service/categoriesdata";
import { getAllDocuments } from "../service/databasefirebase";
import { auth } from "../service/firebaseservice";
import { heart, dental, brain } from "../utils/svgfiles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faStar, faUser, faCalendar, faPhone, faEnvelope, faBriefcase,faSuitcase } from '@fortawesome/free-solid-svg-icons';
const Dashboard = () => {
  const [isFavorite, setFavorites] = React.useState([]);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
const navigate = useNavigate();
  const handleIsFavorite = async (index, user) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];

      return newFavorites;
    });
  };
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
  useEffect(() => {
    // Function to fetch documents and update state
    const fetchDocuments = async () => {
      try {
        const documents = await getAllDocuments(); // Call the function to fetch documents
        setUsers(documents); // Update state with the fetched documents
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchDocuments(); // Call the function when component mounts
  }, []);
  const filteredUsers = users
    .filter((user) => user.role.includes("Palliative Care"))
    .slice(0, 3);

  return (
    <section className="bg-offWhite pt-4 rounded mt-10 ">
      <div>
        <span className="text-mypink text-2xl font-semibold font-['Inter']">
          Find
        </span>
        <span className=" text-2xl font-semibold font-['Inter']">
          {" "}
          your desired palliative <br />
          cares
        </span>
      </div>
      <Search></Search>
      <div>
        {/* Categories */}
        <div className="flex justify-between pt-5 pb-5">
          <span>
            <h2 className=" text-xl font-medium  hover:underline">
              Categories
            </h2>
          </span>{" "}
          <Link
            to="/categories"
            className="font-medium hover:underline hover:text-mypink"
          >
            See all
          </Link>
        </div>
        {/* Categories container */}
        <div className=" inline-block space-x-3 w-full no-scrollbar overflow-x-auto whitespace-nowrap">
          {/* Dental Specialist */}
          <Link
            to="/viewallcaretakers"
            state={{
              from: "Dental Specialist",
              from1:
                "Palliative dental care to manage oral health and alleviate symptoms related to dental issues",
            }}
          >
            <div className="cursor-pointer w-32 h-48 pl-6 pr-7 pt-7 pb-6 bg-accent rounded-3xl flex-col justify-end items-center gap-7 inline-flex  hover:bg-blue-600">
      
            <div dangerouslySetInnerHTML={{__html: dental}} />

              <div className="text-center text-white text-base font-semibold font-['Inter']">
                Dental
                <br />
                Specialist
              </div>
            </div>
          </Link>
          {/* Heart Specialist */}
          <Link
            to="/viewallcaretakers"
            state={{
              from: "Heart Specialist",
              from1:
                "Cardiologists providing palliative care for patients with heart conditions",
            }}
          >
            <div className=" cursor-pointer w-32 h-48 pl-6 pr-7 pt-7 pb-6  bg-mypink rounded-3xl flex-col justify-end items-center gap-7 inline-flex hover:bg-blue-600 hover:text-rose-500">
            
            <div dangerouslySetInnerHTML={{__html: heart}} />
              <div className="text-center text-white text-base font-semibold font-['Inter']">
                Heart
                <br />
                Specialist
              </div>
            </div>
          </Link>
          {/* Brain Specialist */}
          <Link
            to="/viewallcaretakers"
            state={{
              from: "Brain Specialist",
              from1:
                "Neurologists and other specialists providing palliative care for neurological conditions.",
            }}
          >
            <div className="cursor-pointer w-32 h-48 pl-6 pr-7 pt-7 pb-6  bg-secondaryButton rounded-3xl flex-col justify-end items-center gap-7 inline-flex hover:bg-blue-600 hover:text-rose-500">
           
            <div dangerouslySetInnerHTML={{__html: brain}} />
              <div className="text-center text-white text-base font-semibold font-['Inter']">
                Brain
                <br />
                Specialist
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Top Caretakers */}
      <div className="flex justify-between pt-5 pb-5">
        <span>
          <h2 className=" text-xl font-medium">Top CareGivers</h2>
        </span>{" "}
        <Link
          to="/caretakers"
          className="font-medium hover:underline hover:text-mypink"
        >
          See all
        </Link>
      </div>

      <div className=" space-y-3 p-0 mb-20">
        {filteredUsers.map((user, index) => (
          <div key={index} className="mb-4 mt-3">
            <div className="flex p-2 w-full h-17  bg-white rounded-2xl shadow-2xl flex-col">
              {/* Profile Card */}
              <div className=" absolute right-5  px-3">
              
              </div>
              <div className="flex">
                <div>
                  {" "}
                  <DialogImage img={user.profilpc} />{" "}
                </div>

                <div className="p-2  flex-col flex justify-center  space-y-1 ">
                  {" "}
                  <div className="  text-black text-base font-bold font-['Inter']">
                    <h1> {user.username}</h1>
                  </div>
                  {user.specialists.map((e) => (
                    <div className="  text-black text-[15px] font-semibold font-['Inter']">
                      <h2>{e}</h2>
                    </div>
                  ))}
                  {user.profession.map((e) => (
                    <div className=" text-black text-sm  font-normal font-['Inter']">
                      <h3> {e}</h3>
                    </div>
                  ))}
                  <div className="flex">
                    {" "}
                    <FontAwesomeIcon icon={faBriefcase} className=" text-mypink" />
                    <div className="  text-black text-xs font-semibold font-['Inter'] pl-1">
                      {user.experience}years
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottoms */}
              <div className="pt-3">
                {" "}
                <ButtonGroup fullWidth>
                <Link className="  bg-mypink rounded-l-lg"  to={'/chat'}
            state={{
              from: `${user.Id}` , from1: `${user.profilpc}` , from2: `${user.email}` , from3: `${user.username}` ,from4: `${userData.username}`, from5: `${userData.profilpc}`, from6: `${userData.email}`
         
            }}> <Button  className=" bg-mypink">
                    <div>Message</div>
                  </Button> </Link>
                  <Button
                    onClick={() => {
                      window.location.href = `mailto:${user.email}`;
                    }}
                    className="  bg-primaryButton"
                  >
                    Email
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = `tel:${user.telephone}`;
                    }}
                    className=" bg-secondaryButton"
                  >
                    Call
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
