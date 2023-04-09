import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
// import { socket } from "../../pages/Room"
// import {socket}from "../Chat/Chat"
import { socket } from "./Room";

type ChatBoxType = {
	username: String;
	room: String;
};
type MessageData = {
	room: String;
	author: String;
	message: String;
	time: String;
};

function ChatBox({ username, room }: ChatBoxType) {
	const [currentMessage, setCurrentMessage] = useState<string>("");
	const [messageList, setMessageList] = useState<MessageData[]>([]);
	const ourSocket = socket;
	const sendMessage = async () => {
		try {
			const messageData: MessageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
			setMessageList(() => [...messageList, messageData]);
			// setMessageList([...messageList, messageData]);
			console.log("sending", messageList);
			setCurrentMessage("");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		socket.on("receive_message", (data) => {
			// setMessageList([...messageList, data]);
			setMessageList((list) => [...messageList, data]);
			console.log("received", messageList);
		});
	}, [ourSocket, messageList]);

	return (
		<div className=" p-2 rounded bg-[url('https://cdn.wallpapersafari.com/46/78/exDpS7.jpg')] text-white ">
			<div className="text-center font-bold ">
				<p>Live ChatBox</p>
			</div>
			<div className="border-2 border-blue">
				<div className="overflow-scroll h-64 w-full">
					{messageList.map((messageContent: MessageData) => {
						return (
							<div
							className="bg-gradient-to-r to-indigo-500"
							id={username === messageContent.author ? "you" : "other"}
							>
								<div className="mess-cont">
									<div className="mess-content">
										<p id="author">{messageContent.author}</p>
									</div>
									<div className="mess-meta">
										{/* <p id="time">{messageContent.time}</p> */}
										<p>{messageContent.message}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex items-center">
				<input
					type="text" 
					className="m-2 flex-5 text-black w-full p-2 border-0 outline-0"
					value={currentMessage}
					placeholder="Write Some Thing...."
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
				/>
				<button className="flex-1 p-2 rounded w-full bg-emerald-800 " onClick={sendMessage}>send</button>
			</div>
		</div>
	);
}

export default ChatBox;
