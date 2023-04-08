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
import { Navigate, useNavigate } from "react-router-dom";
import { UserLogin, UserRegister } from "../utils";
import axios from "axios";
import { AppContext } from "../context/context";
const socket = io("http://localhost:3001");
export const Room = () => {
  // const [username, setUsername] = useState<String>("");
  //   const [room, setRoom] = useState<String>("");
  //   const [showChat, setShowChat] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const {isStatus,chatRoom} = useContext(AppContext)

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      navigate("/gaming");
    }
  };
  const handleLogin = (): void => {
    localStorage.setItem("username" , name)
    localStorage.setItem("room", room)
    const payload: UserLogin = {
      password,
      email,
    };

    axios
      .post(`http://localhost:3001/users/login`, payload)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          sessionStorage.setItem("username", res.data.data);
          isStatus()
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
        } else if (res.status === 201) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
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
              Join Room
            </Tab>
            <Tab fontSize="2xl" color="white">
              Create Room
            </Tab>
          </TabList>
          <TabPanels>
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
                  placeholder="Secret Room Key"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                />
                <button
                  className="w-4/5 py-2 m-auto rounded-md sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
                  id={style.drop_box}
                >
                  Login
                </button> */}
                <Input
                  type="text"
                  placeholder="Enter Email"
                  size="md"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <Input
                  placeholder="Enter Room Name"
                  size="md"
                  w={"80%"}
                  color="white"
                  fontSize="2xl"
                  alignItems={"center"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRoom(e.target.value)
                  }
                />

                <button onClick={handleLogin}>Login</button>
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
									className="w-4/5 py-2 m-auto rounded-md sm:w-4/5 lg:w-2/4 bg-gradient-to-r from-cyan-500 to-blue-500"
									id={style.drop_box1}
								>
									Create Room
								</button> */}
                <Input
                  type="text"
                  placeholder="Enter Name"
                  size="md"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Enter Email"
                  size="md"
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
