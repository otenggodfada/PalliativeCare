import jasondataa from "../service/categoriesdata";
import img2 from "../assets/images/im2.png";
import DialogImage from "../components/dialogviewimage";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { getAllDocuments } from "../service/databasefirebase";
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom'

const ViewAllCaretakers = ({props}) => {
    
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]); // State to hold the fetched users
    const history1 = createBrowserHistory();
    const location = useLocation()
    const { from, from1 } = location.state
    
    const descriptions =from1
    const catego = from
    const goBack = () => {
      history1.back();

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
    const filteredUsers = users.filter(user => user.specialists.some(profession => profession.toLowerCase().includes(searchQuery.toLowerCase())));
const finaluser = filteredUsers.filter(user => user.role.includes("Palliative Care"));
const finest = finaluser.filter(user => user.profession.some(p => p.includes(catego)))
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    
    return ( 
        <div className=" ">
        <header className="bg-accent text-white p-4 fixed top-0 w-screen">
          <div className="flex items-center">
           
           <div onClick={goBack}>
           <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
              </svg>
           </div>
           
          <div className=" w-full flex justify-center">  <h1 className="text-2xl font-bold ">{catego}</h1></div>
          </div>
        </header>
  
        <ul className="mt-20 pr-2 pl-2">
          {/* Search container */}
          <div className="pt-5">
            {/* Search box */}
            <div className="w-full h-12 pl-3.5 rounded-3xl border border-mypink justify-between items-center flex">
              {/* Search icon */}
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0633 8.53C17.0633 10.4123 16.4522 12.1511 15.4226 13.5619L20.6155 18.7578C21.1282 19.2704 21.1282 20.1029 20.6155 20.6155C20.1027 21.1282 19.2701 21.1282 18.7574 20.6155L13.5645 15.4196C12.1535 16.4531 10.4144 17.06 8.53167 17.06C3.81874 17.06 0 13.242 0 8.53C0 3.818 3.81874 0 8.53167 0C13.2446 0 17.0633 3.818 17.0633 8.53ZM8.53167 14.4354C9.30732 14.4354 10.0754 14.2826 10.792 13.9859C11.5086 13.6891 12.1597 13.2541 12.7082 12.7057C13.2567 12.1574 13.6918 11.5064 13.9886 10.7899C14.2854 10.0734 14.4382 9.30551 14.4382 8.53C14.4382 7.75449 14.2854 6.98658 13.9886 6.27011C13.6918 5.55363 13.2567 4.90263 12.7082 4.35426C12.1597 3.8059 11.5086 3.37091 10.792 3.07414C10.0754 2.77736 9.30732 2.62462 8.53167 2.62462C7.75601 2.62462 6.98795 2.77736 6.27133 3.07414C5.55472 3.37091 4.90359 3.8059 4.35511 4.35426C3.80664 4.90263 3.37157 5.55363 3.07474 6.27011C2.7779 6.98658 2.62513 7.75449 2.62513 8.53C2.62513 9.30551 2.7779 10.0734 3.07474 10.7899C3.37157 11.5064 3.80664 12.1574 4.35511 12.7057C4.90359 13.2541 5.55472 13.6891 6.27133 13.9859C6.98795 14.2826 7.75601 14.4354 8.53167 14.4354Z"
                  fill="#FF2B70"
                />
              </svg>
              {/* Search Input */}
              <div className="w-full p-1">
                <input
                  type="search"
                  className="p-1 w-full border-none bg-transparent focus:border-transparent focus:outline-none"
                  placeholder="Search professions"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
         <div className=" p-5">
         <h2 className="text-xl font-semibold">
                      {catego}
                    </h2>
                    <p>{descriptions}</p>
         </div>
          <div>
            {finest.map((user, index) => (
              <li key={index} className="mb-4 mt-3 ">
                      <div className="flex p-2 w-full h-17  bg-white rounded-2xl shadow-2xl flex-col">
              {/* Profile Card */}
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
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0ZM6.34375 3.28125V7C6.34375 7.21875 6.45312 7.42383 6.63633 7.54688L9.26133 9.29688C9.56211 9.49922 9.96953 9.41719 10.1719 9.11367C10.3742 8.81016 10.2922 8.40547 9.98867 8.20312L7.65625 6.65V3.28125C7.65625 2.91758 7.36367 2.625 7 2.625C6.63633 2.625 6.34375 2.91758 6.34375 3.28125Z"
                        fill="black"
                      />
                    </svg>
                    <div className="  text-black text-xs font-semibold font-['Inter'] pl-1">
                      10:00 AM - 12:30 PM
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
                  <Button className="  bg-primaryButton">Email</Button>
                  <Button className=" bg-secondaryButton">Call</Button>
                </ButtonGroup>
              </div>
            </div>
              </li>
            ))}
          </div>
        </ul>
      </div>

     );
}
 
export default ViewAllCaretakers;