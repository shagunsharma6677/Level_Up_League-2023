import style from "./Room.module.css";
import { io, Socket } from "socket.io-client";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Input,
	Button,
	VStack,
	WrapItem,
	Avatar,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin, UserRegister } from "../utils";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { AppContext } from "../context/context";

export const socket = io("http://localhost:3001");
export const Room = () => {
	// const [username, setUsername] = useState<String>("");
	//   const [room, setRoom] = useState<String>("");
	//   const [showChat, setShowChat] = useState<Boolean>(false);
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [room, setRoom] = useState<string>("");
	const toast = useToast();
	const { isStatus, chatRoom } = useContext(AppContext);
	console.log("chat room from room ", chatRoom);
	const joinRoom = () => {
		console.log("outside join room ,");
		console.log(name, "nameeeee", room, "roooooooom");
		if (name !== "" && room !== "") {
			socket.emit("join_room", room);
			console.log("inside  join room ,");
			navigate("/gaming");
			isStatus();
		}
	};
	const handleLogin = (): void => {
		localStorage.setItem("username", name);
		localStorage.setItem("room", room);
		const payload: UserLogin = {
			password,
			email,
		};

		axios
			.post(`http://localhost:3001/users/login`, payload)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					localStorage.setItem("username", res.data.data);
					toast({
						title: "Loggedin Successfully",
						status: "success",
						duration: 1000,
						isClosable: true,
					});
					// socket.emit("join_room", room);
					// navigate("/gaming");
					joinRoom();
					//   navigate("/room", { replace: true });
				} else if (res.status === 201) {
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleRegister = (): void => {
		const payload: UserRegister = {
			name,
			password,
			email,
			isOnline: true,
		};

		axios
			.post(`http://localhost:3001/users/register`, payload)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					toast({
						title: "Account created.",
						description: "We've created your account for you.",
						status: "success",
						duration: 1000,
						isClosable: true,
					});
				} else if (res.status === 201) {
					toast({
						title: "User Already Exists.",
						status: "error",
						duration: 1000,
						isClosable: true,
					});
				}
			})
			.catch((err) => {
				toast({
					title: "Something Went Wrong!",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
			});
	};

	return (
		<div className="min-h-screen w-full bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/11816425/pexels-photo-11816425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
			<div
				className="grid h-screen py-40 m-auto text-2xl text-center"
				id={style.main_room}
			>
				<Tabs variant="soft-rounded" colorScheme="blue" margin={"auto"}>
					<TabList mb="1em" gap={4}>
						<Tab fontSize="2xl" color="white">
							Old User
						</Tab>
						<Tab fontSize="2xl" color="white">
							New User
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<VStack gap={6}>
								<Input
									type="text"
									placeholder="Enter Email"
									size="md"
									value={email}
									color="white"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setEmail(e.target.value)
									}
								/>
								<Input
									type="text"
									placeholder="Enter Password"
									size="md"
									value={password}
									color="white"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
								/>
								<Input
									placeholder="Enter Room Name"
									size="md"
									w={"80%"}
									value={room}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setRoom(e.target.value)
									}
								/>

								<button
									className="w-4/5 py-2 m-auto rounded-md sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
									id={style.drop_box}
									onClick={handleLogin}
								>
									Login
								</button>
							</VStack>
						</TabPanel>
						<TabPanel>
							<VStack gap={6}>
								<Input
									type="text"
									placeholder="Enter Name"
									size="md"
									color="white"
									value={name}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setName(e.target.value)
									}
								/>
								<Input
									type="text"
									placeholder="Enter Email"
									size="md"
									color="white"
									value={email}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setEmail(e.target.value)
									}
								/>
								<Input
									type="text"
									placeholder="Enter Password"
									size="md"
									value={password}
									color="white"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
								/>

								<button
									className="w-4/5 py-2 m-auto rounded-md sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
									id={style.drop_box1}
									onClick={handleRegister}
								>
									Register
								</button>
							</VStack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};
