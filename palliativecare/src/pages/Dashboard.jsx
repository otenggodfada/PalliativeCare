/** @format */


import "@fortawesome/fontawesome-free/css/all.min.css";

import React from "react";

import { useEffect, useState } from "react";
import Search from "../components/search";
import DialogImage from "../components/dialogviewimage";
import { ButtonGroup, Button, IconButton } from "@material-tailwind/react";

import { Link } from "react-router-dom";
import jasondataa from "../service/categoriesdata";
import { getAllDocuments } from "../service/databasefirebase";

import { heart, dental, brain } from "../utils/svgfiles";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isFavorite, setFavorites] = React.useState([]);

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
          <h2 className=" text-xl font-medium">Top CareTakers</h2>
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
                <IconButton
                  variant="text"
                  size="sm"
                  color={isFavorite[index] ? "red" : "blue-gray"}
                  onClick={() => {
                    handleIsFavorite(index, user);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </IconButton>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="14px"
                      viewBox="0 -960 960 960"
                      width="14px"
                      fill="#ff145b"
                    >
                      <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                    </svg>
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
              from: `${user.Id}` , from1: `${user.profilpc}` , from2: `${user.email}` , from3: `${user.username}` 
         
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
