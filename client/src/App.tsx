import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Room } from "./pages/Room";
import { Chat } from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/room" element={<Room />} /> 

      </Routes>
    </div>
  );
}

export default App;
