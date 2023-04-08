import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import { Room } from "./pages/Room";
// import { Chat } from "./components/Chat/Chat";
import Game from "./pages/Gaming/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/room" element={<Room />} />
        <Route path="/gaming" element={<Game />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </div>
  );
}

export default App;
