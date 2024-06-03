import React from 'react';
import { createBrowserHistory } from 'history';
const Header = ({title}) => {
    const history1 = createBrowserHistory();

    const goBack = () => {
      history1.back();

    };
  return (
    <header className="bg-accent text-white p-4 fixed top-0 w-screen ">
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
          <h1 className="text-2xl font-bold text-center">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
