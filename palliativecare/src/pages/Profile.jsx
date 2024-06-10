/** @format */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from "react";
import { readUserinfo, updateUserinfo } from "../service/databasefirebase"; // Assuming you have an update function
import { auth } from "../service/firebaseservice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faStar, faUser, faCalendar, faPhone, faEnvelope, faBriefcase, } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      try {
        readUserinfo(setUserData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      } else {
        setUserData({});
        
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setEditableData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableData((prevData) => ({
        ...prevData,
        profilpc: reader.result, // Update editableData with new profile picture
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUserinfo(editableData)
      .then(() => {
        setUserData(editableData);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user information: ", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-[60px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div>

     {
      loading? (  Array(1).fill().map((_, index) => (
        <div key={index} className="mb-4 mt-3 h-full flex justify-center items-center">
          <div className="flex p-2 w-full h-full bg-white rounded-2xl shadow-2xl flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div>
                <Skeleton circle={true} height={100} width={100} />
              </div>
              <div className="p-2 flex-col  flex justify-center space-y-1 items-center">
                <div className="text-black text-base font-bold font-['Inter']">
                  <Skeleton width={100} />
                </div>
                <Skeleton width={150} />
                <Skeleton width={100} />
                <div className="flex">
                  <Skeleton width={20} height={20} />
                  <Skeleton width={50} />
                </div>
              </div>
            </div>
            <div className="pt-3 flex flex-row gap-3 items-center">
              <Skeleton height={30} width={70} />       <Skeleton height={30} width={70} />
            </div>
          </div>
        </div>
      ))):(<>
       <div
        className="bg-cover bg-center h-56"
        style={{
          backgroundImage:
            "url('https://www.healthstream.com/images/default-source/blog/blog-images_drs-patients_608x320_artboard-21_dbe44baaad3be544d3a8000faeb6fe59c5.png?sfvrsn=d0aeeebb_0')",
        }}
      ></div>

      <div className="p-6">
        {editMode ? (
          <>
            <div className="flex justify-center -mt-16">
              <img
                className="object-cover w-32 h-32 border-4 border-white rounded-full"
                src={editableData.profilpc || userData.profilpc}
                alt="Profile"
              />
              <div className="flex items-center justify-center ml-4">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-gray-500 cursor-pointer"
                  size="2x"
                  onClick={() => document.getElementById("file-upload").click()}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center -mt-16">
            <img
              className="object-cover w-32 h-32 border-4 border-white rounded-full"
              src={userData.profilpc}
              alt="Profile"
            />
          </div>
        )}
        <div className="text-center mt-2">
          {editMode ? (
            <>
              <div className="flex items-center mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                <input
                  className="flex-grow outline-none"
                  type="text"
                  name="username"
                  value={editableData.username || ""}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="flex items-center mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md">
                <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-500" />
                <input
                  className="flex-grow outline-none"
                  type="text"
                  name="age"
                  value={editableData.age || ""}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>
              <div className="flex items-center mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                <input
                  className="flex-grow outline-none"
                  type="text"
                  name="telephone"
                  value={editableData.telephone || ""}
                  onChange={handleChange}
                  placeholder="Telephone"
                />
              </div>
              <div className="flex items-center mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                <input
                  className="flex-grow outline-none"
                  type="text"
                  name="email"
                  value={editableData.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
        {userData.role==='Palliative Care'&&(<div className="flex items-center mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-gray-500" />
          <input
            className="flex-grow outline-none"
            type="text"
            name="experience"
            value={editableData.experience || ""}
            onChange={handleChange}
            placeholder="Experience"
          />
        </div>)}
            </>
          ) : (
            <>
              <h2 className="text-2xl text-mypink font-semibold">{userData.username}</h2>
              <p className="text-gray-900 font-bold">{userData.role}</p>
              <p className="text-gray-600 font-semibold text-[14px]">{userData.specialists}</p>
              <p className="text-gray-400 text-[13px]">{userData.profession}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          <div className="text-center">
            {editMode ? (
              <>
                {/* Editable fields are displayed above */}
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-2">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 text-mypink" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Age:</span> {userData.age}
                  </p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-mypink" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Telephone:</span> {userData.telephone}
                  </p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-mypink" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {userData.email}
                  </p>
                </div>
            {userData.role==='Palliative Care'&&(  <div className="flex items-center justify-center mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-mypink" />
                <p className="text-gray-600">
                  <span className="font-semibold">Experience:</span> {userData.experience}years
                </p>
              </div>)}
               {userData.role==='Palliative Care'&&( <div className="flex items-center justify-center mb-2">
                  <FontAwesomeIcon icon={faStar} className="mr-2 text-mypink" />
                  <p className="text-gray-600">
                    <span className="font-semibold">Rating:</span> {userData.rating}
                  </p>
                </div>)}
              </>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          {editMode ? (
            <>
              <button
                className="px-4 py-2 mr-2 bg-mypink text-white rounded-full hover:bg-blue-500 focus:outline-none"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 mr-2 bg-mypink text-white rounded-full hover:bg-blue-500 focus:outline-none"
                onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                {userData.verify ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-[#577bf160] text-white rounded-full focus:outline-none"
                  >
                    Verified✔️
                  </button>
                ) : (
               <Link to={'/kyc'}  className="px-4 py-2 bg-mypink text-white rounded-full hover:bg-blue-500 focus:outline-none ">Verify</Link>
                )}
              </>
            )}
          </div>
        </div>
      </>)
     }
      </div>
      </div>
    );
  };
  
  export default Profile;
  
