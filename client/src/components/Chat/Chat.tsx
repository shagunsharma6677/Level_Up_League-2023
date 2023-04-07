import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatBox from "../ChatBox/ChatBox";

const socket = io("http://localhost:3001");


const Chat = () => {
  const [username, setUsername] = useState<String>("");
  const [room, setRoom] = useState<String>("");
  const [showChat, setShowChat] = useState<Boolean>(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="main-chat-div">
      {!showChat ? (
        <div className="join-cont">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Player..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatBox username={username} room={room} />
      )}
    </div>
  );
};

export { Chat, socket };
