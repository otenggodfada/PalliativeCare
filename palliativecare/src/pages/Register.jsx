/** @format */
import { handleSignUp, handleUserinfo } from "../service/databasefirebase";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import logo from "../assets/images/logo.png";
import im2 from "../assets/images/im2.png";
import jasondataa from "../service/categoriesdata";
import professiondata from "../service/professiondata";
const Register = () => {
  const [mess, setMess] = useState(false);
  const [spin, setSpin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [experience, setexpericence] = useState("");
  const [role, setrole] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [phone, setPhone] = useState("");
  const [profileurl, setProfileurl] = useState(null);
  const [profs, setprofs] = useState(null);
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const [getfeed, setfeed] = useState("");
  const dataa = jasondataa();
  const [verify, setverify] = useState(false);
  const [rating, setrating] = useState(0);
  const dataa1 = professiondata();
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedSpecializations1, setSelectedSpecializations1] = useState([]);
  const [specializations1, setSpecializations1] = useState([]);
  useEffect(() => {
    setSpecializations(dataa);
     setSpecializations1(dataa1)
  }, []);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setprofs(e);
      };
      setProfileurl(file);
      reader.readAsDataURL(file);
    }
  };
  const handleSelections = (e) => {
    setrole(e.target.value);
  };

  const handleSpecializationChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedSpecializations(selectedValues);
  };

  const handleSpecializationChange1 = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedSpecializations1(selectedValues);
  };
  return (
    <>
      <div className="bg-primaryBackground text-primaryText flex items-center flex-col justify-start min-h-screen p-4">
        <div className="pb-5 flex flex-row  justify-between w-full text-accent hover:text-primaryText cursor-pointer"></div>
        <div className="w-full max-w-md   rounded-lg shadow-md p-3 ">
          <div class=" m-2">
            <div class="flex">
              <div class="grow rounded-t-3xl  bg-white pt-6 px-6">
                <img
                  className="w-[100px] rounded-b-[70px] relative"
                  src={im2}
                  alt=""
                />
              </div>
              <div class="bg-white rounded-tl-[1.6rem] rounded-tr-3xl  ">
                <div class="inner-header p-6  bg-primaryBackground rounded-bl-3xl rounded-tr-3xl">
                  <div class="flex items-center justify-center rounded-full bg-white p-4">
                    <img className="w-[50px] h-[50px] " src={logo} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-br-3xl rounded-bl-3xl grow bg-white p-3">
              <p class="rounded-3xl bg-white p-4 font-semibold text-2xl text-primaryButton text-center ">
                Sign Up
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              setSpin(false);
              e.preventDefault();

              handleSignUp(
                email,
                password,
                navigate,
                setfeed,
                setColor,
                username,
                age,
                profileurl,
                phone,
                role,selectedSpecializations, selectedSpecializations1, experience, verify , rating
              ).then(() => {
                setMess(true), setSpin(true), setEmail(""), setPassword("");
              });
            }}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-secondaryText">
                Name
              </label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="Your name"
                required
              ></input>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-secondaryText">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="Your email"
                required
              ></input>
            </div>
            {/* Phone number */}
            <div>
              <label htmlFor="email" className="block text-secondaryText">
                Phone
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="123-456-7890"
                required
              ></input>
            </div>
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-secondaryText">
                Age
              </label>
              <input
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
                type="number"
                id="age"
                name="age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="Your age"
                required
              ></input>
            </div>
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-secondaryText">
                Register as: User/Palliative Care
              </label>
              <select
                onChange={handleSelections}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton bg-white"
                required
              >
                <option value="">--Select role--</option>
                <option value="User">User</option>
                <option value="Palliative Care">Palliative Care</option>
              </select>
              {role && <p>You selected: {role}</p>}
            </div>

            {/* Profession */}
            {role == "Palliative Care" && (
              <div>
                <label htmlFor="role" className="block text-secondaryText">
                  Your profession
                </label>
                <select
                  onChange={handleSpecializationChange1}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton bg-white"
                  required
                >
                  <option value="">--Select your profession--</option>
                  {specializations1.map((specialization, index) => (
                    <option key={index} value={specialization.name}>
                      {specialization.name}
                    </option>
                  ))}
                </select>
                <div className="mt-4">
                  {selectedSpecializations1.length > 0 ? (
                    <ul>
                      {selectedSpecializations1.map((specialization, index) => (
                        <li key={index} className="text-gray-700">
                          {specialization}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No profession selected.</p>
                  )}
                </div>
              </div>
            )}
            {/* Specialist */}
            {role == "Palliative Care" && (
              <div>
                <label htmlFor="role" className="block text-secondaryText">
                  Specialist In
                </label>
                <select
                  onChange={handleSpecializationChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton bg-white"
                  required
                >
                  <option value="">--Select your specializations--</option>
                  {specializations.map((specialization, index) => (
                    <option key={index} value={specialization.category}>
                      {specialization.category}
                    </option>
                  ))}
                </select>
                <div className="mt-4">
                  {selectedSpecializations.length > 0 ? (
                    <ul>
                      {selectedSpecializations.map((specialization, index) => (
                        <li key={index} className="text-gray-700">
                          {specialization}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      No specializations selected.
                    </p>
                  )}
                </div>
                  {/* Experience */}
  <div>
              <label htmlFor="experience" className="block text-secondaryText">
                Experience
              </label>
              <input
                onChange={(e) => {
                  setexpericence(e.target.value);
                }}
                value={experience}
                type="number"
                id="experience"
                name="experience"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="Your experience"
                required
              ></input>
            </div>
              </div>
              
            )}

            <div>
              <label htmlFor="filepicker" className="block text-secondaryText">
                Profile Picture
              </label>
              <input
                // onChange={(e)=>{setEmail(e.target.value)}}
                // value={email}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton "
                placeholder="Select profile picture"
                required
              ></input>
            </div>
            {profs && (
              <div className="w-full, flex justify-center p-2 m-0">
                {" "}
                <img
                  id="selectedImage"
                  src={profs}
                  alt="Selected Image"
                  className=" w-[100px] h-[100px] object-cover"
                ></img>
              </div>
            )}
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-secondaryText">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryButton"
                placeholder="Your password"
                required
              ></input>
            </div>
            {/* Comfirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-secondaryText"
              >
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
            <button
              type="submit"
              className=" flex justify-center w-full p-3 bg-mypink text-white font-semibold rounded-lg shadow-md hover:bg-primaryButton/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryButton"
            >
              {spin ? "Sign Up" : <Spinner />}
            </button>
          </form>
          {mess ? (
            <Alert
              className={`mt-3 rounded-none border-l-4 border-${color}   bg-white font-medium text-${color}`}
            >
              {getfeed}
            </Alert>
          ) : (
            <div></div>
          )}
          <p className="mt-6 text-center text-secondaryText">
            Already have an account?{" "}
            <a href="/login" className="text-mypink hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
