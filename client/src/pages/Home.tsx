import React from "react";
import { Chat } from "../components/Chat/Chat";
import style from "./Home.module.css";
import { Link as ReactLink } from "react-router-dom";

const Home = () => {
	return (
		<div className="min-h-screen w-full bg-cover bg-center bg-[url('https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] text-white">
			<div className="shadow-md ">
				<h1 className="text-center py-20 text-6xl	">Word Paradise</h1>
				<div className="grid py-28 gap-10 text-center	">
					<ReactLink to="/login">
						<button
							className="border-white border-x-1 border-y-2 w-80 py-2 m-auto bg-gradient-to-r from-violet-500 to-Red-600 rounded-md	"
							id={style.drop_box}
						>
							Login
						</button>
					</ReactLink>
					<ReactLink to="/register">
						<button
							className="border-white border-x-1 border-y-2 w-80 py-2 m-auto bg-gradient-to-r from-violet-500 to-Red-600 rounded-md	"
							id={style.drop_box1}
						>
							Signin
						</button>
					</ReactLink>
				</div>
			</div>
		</div>
	);
};

export default Home;
