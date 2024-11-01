/** @format */
// import { Input, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { OpenAI } from "openai";

const ChatBot = () => {
  const [response, setResponse] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const openai = new OpenAI({
//           apiKey: "sk-proj-YYLl0hvwMatRfvLyd5FeT3BlbkFJmVeMDhBkMHmbsHuvPi7w",
//           dangerouslyAllowBrowser: true,
//           organization: "org-wTvJC6GCcbtSAZDNjE87AH7x",
//         });

//         const completion = await openai.chat.completions.create({
//           messages: [{ role: "user", content: "You are a helpful assistant." }],
//           model: "tts-1-hd",
//         });

//         console.log(completion.choices[0]);
//         setResponse(completion.choices[0].message.content);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle error, set response to an error message or handle it accordingly
//       }
//     }

//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    // Searchcontainer
    <>
    <div className="pt-5 flex">
        {/* Search box */}
      <div className="w-full h-12 pl-3.5  rounded-3xl border border-mypink justify-between items-center flex ">
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
        <div className=" flex w-full max-w-[24rem]">
        <input type="search" className=" p-1 border-none bg-transparent focus:border-transparent focus:outline-none" name="" id="" placeholder="Ask AI about symptoms" />

    </div>
        {/* filter icon */}

        <div className="w-13 h-12 px-5 py-3.5 bg-mypink rounded-tl-3xl rounded-tr-3xl rounded-br-3xl justify-center items-center inline-flex">
          <svg
            width="21"
            height="28"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 23.3333C0 24.3658 0.837891 25.2 1.875 25.2H5.08008C5.80078 26.8508 7.45313 28 9.375 28C11.2969 28 12.9492 26.8508 13.6699 25.2H28.125C29.1621 25.2 30 24.3658 30 23.3333C30 22.3008 29.1621 21.4667 28.125 21.4667H13.6699C12.9492 19.8158 11.2969 18.6667 9.375 18.6667C7.45313 18.6667 5.80078 19.8158 5.08008 21.4667H1.875C0.837891 21.4667 0 22.3008 0 23.3333ZM7.5 23.3333C7.5 22.8383 7.69754 22.3635 8.04918 22.0134C8.40081 21.6633 8.87772 21.4667 9.375 21.4667C9.87228 21.4667 10.3492 21.6633 10.7008 22.0134C11.0525 22.3635 11.25 22.8383 11.25 23.3333C11.25 23.8284 11.0525 24.3032 10.7008 24.6533C10.3492 25.0033 9.87228 25.2 9.375 25.2C8.87772 25.2 8.40081 25.0033 8.04918 24.6533C7.69754 24.3032 7.5 23.8284 7.5 23.3333ZM18.75 14C18.75 13.5049 18.9475 13.0301 19.2992 12.6801C19.6508 12.33 20.1277 12.1333 20.625 12.1333C21.1223 12.1333 21.5992 12.33 21.9508 12.6801C22.3025 13.0301 22.5 13.5049 22.5 14C22.5 14.4951 22.3025 14.9699 21.9508 15.3199C21.5992 15.67 21.1223 15.8667 20.625 15.8667C20.1277 15.8667 19.6508 15.67 19.2992 15.3199C18.9475 14.9699 18.75 14.4951 18.75 14ZM20.625 9.33333C18.7031 9.33333 17.0508 10.4825 16.3301 12.1333H1.875C0.837891 12.1333 0 12.9675 0 14C0 15.0325 0.837891 15.8667 1.875 15.8667H16.3301C17.0508 17.5175 18.7031 18.6667 20.625 18.6667C22.5469 18.6667 24.1992 17.5175 24.9199 15.8667H28.125C29.1621 15.8667 30 15.0325 30 14C30 12.9675 29.1621 12.1333 28.125 12.1333H24.9199C24.1992 10.4825 22.5469 9.33333 20.625 9.33333ZM11.25 6.53333C10.7527 6.53333 10.2758 6.33667 9.92418 5.9866C9.57254 5.63653 9.375 5.16174 9.375 4.66667C9.375 4.1716 9.57254 3.6968 9.92418 3.34673C10.2758 2.99667 10.7527 2.8 11.25 2.8C11.7473 2.8 12.2242 2.99667 12.5758 3.34673C12.9275 3.6968 13.125 4.1716 13.125 4.66667C13.125 5.16174 12.9275 5.63653 12.5758 5.9866C12.2242 6.33667 11.7473 6.53333 11.25 6.53333ZM15.5449 2.8C14.8242 1.14917 13.1719 0 11.25 0C9.32813 0 7.67578 1.14917 6.95508 2.8H1.875C0.837891 2.8 0 3.63417 0 4.66667C0 5.69917 0.837891 6.53333 1.875 6.53333H6.95508C7.67578 8.18417 9.32813 9.33333 11.25 9.33333C13.1719 9.33333 14.8242 8.18417 15.5449 6.53333H28.125C29.1621 6.53333 30 5.69917 30 4.66667C30 3.63417 29.1621 2.8 28.125 2.8H15.5449Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatBot;
