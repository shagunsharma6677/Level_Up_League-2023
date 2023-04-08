import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import { socket } from "../Chat/Chat";

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
  const [currentMessage, setCurrentMessage] = useState("");
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
      setMessageList([...messageList, messageData]);
      setCurrentMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      console.log("received", data);
    });
  }, [ourSocket]);

  return (
    <div className="chatBox-div">
      <div className="header">
        <p>Live ChatBox</p>
      </div>
      <div className="chatBox-Main">
        <div className="mess-container">
          {messageList.map((messageContent: MessageData) => {
            return (
              <div
                className="mess"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="mess-cont">
                  <div className="mess-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="mess-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Write Some Thing...."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatBox;
