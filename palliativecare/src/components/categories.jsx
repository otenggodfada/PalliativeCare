/** @format */
import img2 from "../assets/images/im2.png";
import { useState } from "react";
import jasondataa from "../service/categoriesdata";
import history from "../service/history";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

const Categories = () => {
  const dataa = jasondataa();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = dataa.filter((service) =>
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" ">
      <header className="bg-accent text-white p-4 fixed top-0 w-screen">
        <div onClick={  history.push('/home')} className="flex items-center">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </a>{" "}
        <div className=" w-full flex justify-center">  <h1 className="text-2xl font-bold ">Categories</h1></div>
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
                placeholder="Search categories"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div>
          {filteredCategories.map((service, index) => (
            <li key={index} className="mb-4 mt-3 ">
              <div className=" w-full shadow bg-white rounded-lg" >
                {" "}
             
                  <CardBody>
                    <h2 className="text-xl font-semibold">
                      {service.category}
                    </h2>
                    <p>{service.description}</p>
                    <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                      <Tooltip content="Dr.Wilson">
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                          <img className="h-5 w-5" src={img2} alt="" />
                        </span>
                      </Tooltip>

                      <Tooltip content="+2 more">
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                          <div className="h-5 w-5 flex justify-center items-center">
                            +2
                          </div>
                        </span>
                      </Tooltip>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true} className="bg-mypink">
                      View all caretakers
                    </Button>
                  </CardFooter>
          
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Categories;

{
  /* <h2 className="text-xl font-semibold">{service.category}</h2>
<p>{service.description}</p> */
}
