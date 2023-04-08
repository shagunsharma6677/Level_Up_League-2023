import React from "react";

import { Chat } from "../components/Chat/Chat";
import style from "./Home.module.css";
import { Link as ReactLink, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-[url('https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] text-white">
      <div className="shadow-md ">
        <h1 className="py-20 text-6xl text-center ">Word Paradise</h1>
        <div className="grid gap-10 text-center py-28 ">
          <ReactLink to="/gaming">
            <button
              className="py-2 m-auto border-white rounded-md border-x-1 border-y-2 w-80 bg-gradient-to-r from-violet-500 to-Red-600 "
              id={style.drop_box}
            >
              Single Player
            </button>
          </ReactLink>
          <ReactLink to="/room">
            <button
              className="py-2 m-auto border-white rounded-md border-x-1 border-y-2 w-80 bg-gradient-to-r from-violet-500 to-Red-600 "
              id={style.drop_box1}
            >
              Multi Player
            </button>
          </ReactLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
