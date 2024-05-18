/** @format */

import { useEffect, useState } from "react";
import backgroundImage from "../assets/images/paa.jpg";

const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <body class="bg-primaryBackground text-primaryText flex flex-col min-h-screen">
      <header class="bg-accent text-white p-4">
        <div className="flex   items-center justify-between">
          {" "}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </div>{" "}
          <div className=" pl-4">
            <h1 class="text-2xl font-bold">Palliative Care</h1>
          </div>
          <div className="text-sm font-medium text-white ">
            <span className="hover:text-primaryText p-2">
              <a href="/login">Signin</a>
            </span>
            <span className="hover:text-primaryText">
              <a href="/register">Signup</a>
            </span>
          </div>
        </div>
      </header>

      <main class="p-4 flex-grow">
        <div class="bg-warmAccent p-4 rounded mb-4">
          <p class="text-primaryText">This is a warm accent background.</p>
        </div>

        <div class="mb-4">
          <p class="text-secondaryText">
            Secondary text for less prominent information.
          </p>
        </div>

        <button class="bg-primaryButton text-primaryText p-2 rounded mb-2">
          Primary Action
        </button>
        <button class="bg-secondaryButton text-primaryText p-2 rounded">
          Secondary Action
        </button>

        <div class="mt-4">
          <p class="text-accent">
            Important information highlighted with accent color.
          </p>
        </div>

        <div class="bg-positiveNotification text-white p-4 mt-4 rounded">
          Success notification message.
        </div>
      </main>

      <footer class="bg-accent text-white p-4 mt-4">
        <div class="container mx-auto">
          <p>&copy; 2024 Palliative Care Application. All rights reserved.</p>
          <p class="text-secondaryText">
            Contact us at:{" "}
            <a
              href="mailto:support@palliativecareapp.com"
              class="text-white underline"
            >
              support@palliativecareapp.com
            </a>
          </p>
        </div>
      </footer>
    </body>
  );
};
export default Home;
