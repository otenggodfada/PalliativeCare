import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ButtonGroup, Button } from "@material-tailwind/react";
import DialogImage from "../components/dialogviewimage";
import { getAllDocuments } from "../service/databasefirebase";

const ViewAllCaretakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const history1 = createBrowserHistory();
  const location = useLocation();
  const { from: catego, from1: descriptions } = location.state;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true); // Start loading
        const documents = await getAllDocuments();
        setUsers(documents);
        setLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false); // End loading in case of error
      }
    };

    fetchDocuments();
  }, []);

  const filteredUsers = users.filter(user =>
    user.specialists.some(profession =>
      profession.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const finalUser = filteredUsers.filter(user => user.role.includes("Palliative Care"));
  const finest = finalUser.filter(user => user.profession.some(p => p.includes(catego)));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const goBack = () => {
    history1.back();
  };

  return (
    <div>
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
          <div className="w-full flex justify-center">
            <h1 className="text-2xl font-bold">{catego}</h1>
          </div>
        </div>
      </header>

      <ul className="mt-20 pr-2 pl-2">
        <div className="pt-5">
          <div className="w-full h-12 pl-3.5 rounded-3xl border border-mypink flex items-center">
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
        <div className="p-5">
          <h2 className="text-xl font-semibold">{catego}</h2>
          <p>{descriptions}</p>
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          ) : finest.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No caretakers found</p>
            </div>
          ) : (
            finest.map((user, index) => (
              <li key={index} className="mb-4 mt-3">
                <div className="flex p-2 w-full h-17 bg-white rounded-2xl shadow-2xl flex-col">
                  <div className="flex">
                    <DialogImage img={user.profilpc} />
                    <div className="p-2 flex-col flex justify-center space-y-1">
                      <div className="text-black text-base font-bold">
                        <h1>{user.username}</h1>
                      </div>
                      {user.specialists.map((specialist, i) => (
                        <div key={i} className="text-black text-[15px] font-semibold">
                          <h2>{specialist}</h2>
                        </div>
                      ))}
                      {user.profession.map((prof, i) => (
                        <div key={i} className="text-black text-sm font-normal">
                          <h3>{prof}</h3>
                        </div>
                      ))}
                      <div className="flex">
                       
                    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ff145b"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>
                    <div className="  text-black text-xs font-semibold font-['Inter'] pl-1">
                    {user.experience}years
                    </div>
                      </div>
                    </div>
                  </div>
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
              </li>
            ))
          )}
        </div>
      </ul>
    </div>
  );
};

export default ViewAllCaretakers;
