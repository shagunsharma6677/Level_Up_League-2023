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
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const socket = io("http://localhost:3001");
export const Room = () => {
	const [username, setUsername] = useState<String>("");
	const [room, setRoom] = useState<String>("");
	const [showChat, setShowChat] = useState<Boolean>(false);
	const navigate = useNavigate();

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);

			navigate("/gaming");
		}
	};

	return (
		<div className="min-h-screen w-full bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/11816425/pexels-photo-11816425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
			<div
				className="grid py-40  text-center	m-auto text-2xl h-screen"
				id={style.main_room}
			>
				<Tabs variant="soft-rounded" colorScheme="blue" margin={"auto"}>
					<TabList mb="1em" gap={4}>
						<Tab fontSize="2xl" color="white">
							Join Room
						</Tab>
						<Tab fontSize="2xl" color="white">
							Create Room
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<VStack gap={6}>
								<Input
									placeholder="User Name"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
								/>
								<Input
									placeholder="Secret Room Key"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
								/>
								<button
									className=" w-4/5 sm:w-4/5 lg:w-2/4  py-2
								
									m-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md   rounded-md  "
									id={style.drop_box}
								>
									Join Room
								</button>
							</VStack>
						</TabPanel>
						<TabPanel>
							<VStack gap={6}>
								{/* <Input
									placeholder="User Name"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
								/>
								<Input
									placeholder="Enter Room Name"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
								/>
								<button
									className=" w-4/5 sm:w-4/5 lg:w-2/4 	 py-2 m-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md  "
									id={style.drop_box1}
								>
									Create Room
								</button> */}
								<Input
									placeholder="User Name"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
								<Input
									placeholder="Enter Room Name"
									size="md"
									w={"80%"}
									color="white"
									fontSize="2xl"
									alignItems={"center"}
									onChange={(event) => {
										setRoom(event.target.value);
									}}
								/>
								<button
									className=" w-4/5 sm:w-4/5 lg:w-2/4 	 py-2 m-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md  "
									id={style.drop_box1}
									onClick={joinRoom}
								>
									Join A Room
								</button>
							</VStack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};
