/** @format */
import img1 from "../assets/images/im1.png";
import { handdlecall } from "../service/communication";
import "@fortawesome/fontawesome-free/css/all.min.css";

import React from "react";
import { readUserinfo, updateUserinfo } from "../service/databasefirebase"; // Assuming you have an update function
import { useEffect, useState } from "react";
import Search from "../components/search";
import DialogImage from "../components/dialogviewimage";
import { ButtonGroup, Button, IconButton } from "@material-tailwind/react";
import Catergories from "../components/categories";
import { Link } from "react-router-dom";
import jasondataa from "../service/categoriesdata";
import { getAllDocuments } from "../service/databasefirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faStar,
  faUser,
  faCalendar,
  faPhone,
  faEnvelope,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import {
  auth,
  db,
  setDoc,
  doc,
  onSnapshot,
  storage,
} from "../service/firebaseservice";

const Dashboard = () => {
  const [isFavorite, setFavorites] = React.useState([]);

  const [users, setUsers] = useState([]);

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
              <svg
                width="56"
                height="65"
                viewBox="0 0 56 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4788 2.9294C20.0281 1.04414 17.0232 0.014502 13.9307 0.014502C6.22871 0.014502 0 6.20685 0 13.8639V14.763C0 17.0543 0.539724 19.3021 1.56082 21.3614L4.9888 28.1918C5.64522 29.4825 6.09742 30.8602 6.35999 32.2814L11.7135 62.1265C12.0052 63.7507 13.4056 64.9399 15.0539 64.9979C16.7023 65.0559 18.1756 63.9247 18.5548 62.3295L22.7705 44.7386C23.3686 42.3168 25.5275 40.62 28.0073 40.62C30.4871 40.62 32.646 42.3168 33.2295 44.7241L37.4452 62.315C37.8244 63.9247 39.2977 65.0414 40.9461 64.9834C42.5944 64.9254 43.9948 63.7362 44.2865 62.112L49.64 32.2669C49.9026 30.8457 50.3548 29.468 51.0112 28.1773L54.4392 21.3469C55.4749 19.3021 56 17.0398 56 14.7485V14.444C56 6.46788 49.4941 0 41.4712 0C37.9557 0 34.5569 1.27617 31.9021 3.56749L31.4353 3.97354L34.2798 6.17784C35.3009 6.96095 35.4759 8.42565 34.6882 9.44079C33.9005 10.4559 32.4272 10.63 31.4061 9.84684L27.8468 7.09147L22.4496 2.9149L22.4788 2.9294Z"
                  fill="white"
                />
              </svg>

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
              <svg
                width="56"
                height="66"
                viewBox="0 0 56 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.9703 63.6023L5.20625 38.5583C4.74687 37.9793 4.30938 37.3558 3.90469 36.7175H13.4203C15.8922 36.7175 18.1234 34.6985 19.075 31.5959L20.2234 27.8548L25.6156 44.1104C26.0312 45.3723 26.9391 46.1888 27.9563 46.2036C28.9734 46.2185 29.9031 45.4614 30.3625 44.2292L35 31.6256L35.1859 32.1303C36.225 34.9509 38.3469 36.7323 40.6656 36.7323H52.0953C51.6906 37.3707 51.2531 37.9942 50.7937 38.5732L31.0297 63.6023C30.2094 64.6415 29.1266 65.2205 28 65.2205C26.8734 65.2205 25.7906 64.6415 24.9703 63.6023ZM55.0922 29.5917H40.6547C40.3266 29.5917 40.0203 29.3394 39.8672 28.9386L37.3297 22.0652C36.8812 20.8627 35.9734 20.0908 34.9781 20.0908C33.9828 20.0908 33.075 20.8479 32.6266 22.0652L28.0984 34.3571L22.5203 17.4483C22.0937 16.1568 21.1312 15.3254 20.0922 15.3551C19.0531 15.3848 18.1125 16.231 17.7078 17.5522L14.2297 28.8792C14.0984 29.3245 13.7703 29.6066 13.4203 29.6066H1.75C1.46563 29.6066 1.20312 29.666 0.951562 29.7699C0.328125 27.3946 0 24.8709 0 22.3027V21.4417C0 11.0648 5.52344 2.21702 13.0594 0.509809C18.0469 -0.618433 23.1219 1.59352 26.6875 6.43308L28 8.21452L29.3125 6.43308C32.8781 1.59352 37.9531 -0.618433 42.9406 0.509809C50.4766 2.21702 56 11.0648 56 21.4417V22.3027C56 24.8116 55.6938 27.2759 55.0922 29.5917Z"
                  fill="white"
                />
              </svg>

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
              <svg
                width="56"
                height="65"
                viewBox="0 0 56 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.125 0C23.5047 0 26.25 3.18652 26.25 7.10938V57.8906C26.25 61.8135 23.5047 65 20.125 65C16.9641 65 14.3609 62.2197 14.0328 58.6396C13.4641 58.8174 12.8625 58.9062 12.25 58.9062C8.38906 58.9062 5.25 55.2627 5.25 50.7812C5.25 49.8418 5.39219 48.9277 5.64375 48.0898C2.34062 46.6426 0 42.9355 0 38.5938C0 34.5439 2.04531 31.04 5.00937 29.415C4.05781 28.0312 3.5 26.2793 3.5 24.375C3.5 20.4775 5.8625 17.2275 9.0125 16.4277C8.8375 15.7295 8.75 14.9805 8.75 14.2188C8.75 10.4229 11.0031 7.22363 14.0328 6.33496C14.3609 2.78027 16.9641 0 20.125 0ZM35.875 0C39.0359 0 41.6281 2.78027 41.9672 6.33496C45.0078 7.22363 47.25 10.4102 47.25 14.2188C47.25 14.9805 47.1625 15.7295 46.9875 16.4277C50.1375 17.2148 52.5 20.4775 52.5 24.375C52.5 26.2793 51.9422 28.0312 50.9906 29.415C53.9547 31.04 56 34.5439 56 38.5938C56 42.9355 53.6594 46.6426 50.3562 48.0898C50.6078 48.9277 50.75 49.8418 50.75 50.7812C50.75 55.2627 47.6109 58.9062 43.75 58.9062C43.1375 58.9062 42.5359 58.8174 41.9672 58.6396C41.6391 62.2197 39.0359 65 35.875 65C32.4953 65 29.75 61.8135 29.75 57.8906V7.10938C29.75 3.18652 32.4953 0 35.875 0Z"
                  fill="white"
                />
              </svg>

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
                  <Button className=" bg-mypink">
                    <div>Message</div>
                  </Button>
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
