import { useContext, useEffect, useState } from "react";
import Timer from "./Timer";
import { getDataFromApi } from "./api";
import { 
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import ChatBox from "../../components/ChatBox/ChatBox";
import { AppContext } from "../../context/context";
import ChatBox from "../ChatBox";
import axios from "axios";
// import { ChatBox } from "../../components/ChatBox/ChatBox";

// import dictionaryEn from "dictionary-en"; 
type scoretype = {
  username: string, 
  score: string
} 

const Game = () => {
  const [done, setDone] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false); 
  const [winner,setWinner] = useState<scoretype[]>([]); 
  // const initialState=[]
  const toast = useToast();
  const [score, setScore] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [username, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [container, setContainer] = useState<string[]>([]);
  const [box, setBox] = useState<string[]>();
  const [bt1, setBt1] = useState<string>("");
  const [bt2, setBt2] = useState<string>("");
  const [bt3, setBt3] = useState<string>("");
  const [bt4, setBt4] = useState<string>("");
  const [bt5, setBt5] = useState<string>("");
  const [bt6, setBt6] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chatRoom, isStatus } = useContext(AppContext);

  if (chatRoom == "2") {
    setStart(true);
    // console.log(start);
  }

  console.log(winner); 
  // console.log(chatRoom, "xontext from gaming room", start);
  useEffect(() => {
    const name = localStorage.getItem("username") || "";
    const Room = localStorage.getItem("room") || "";
    setName(name);
    setRoom(Room);
  }, []);

  const handleCheck = async () => {
    let a = input.trim().split("");
    if (a.length > 1) {
      let res: string = await getDataFromApi(input);
      let x = res.toString();
      console.log("res---", res, typeof res, typeof x, input);
      // eslint-disable-next-line eqeqeq
      if (x == input.toLowerCase()) {
        let data: string = res.toString();
        console.log("see");
        if (!container.includes(data)) {
          setScore((prev) => prev + Number(data.length));
          setContainer([...container, data]);
          setInput("");
        } else {
          toast({
            position: "top",
            title: "Already On Board ",
            // description: "Is Included",
            status: "error",
            duration: 2000,
          });
          setInput("");
        }
      } else {
        toast({
          position: "top",
          title: "Error",
          description: "Does not Exist",
          status: "warning",
          duration: 2000,
        });
        setInput("");
      }
      console.log(res);
    } else {
      toast({
        position: "top",
        title: "Error",
        description: "length should be greater",
        status: "info",
        duration: 2000,
      });
    }
  };

  const handleinp = (e: string) => {
    setInput(input + e);
  };

  const handleback = () => {
    let a = input.trim().split("");
    a.pop();
    let q = a.join("");
    setInput(q);
  };

  const showtime = (e: string[]) => {
    setBt1(e[0]);
    setBt2(e[1]);
    setBt3(e[2]);
    setBt4(e[3]);
    setBt5(e[4]);
    setBt6(e[5]);
    setBox(e);
  };
  console.log(container, "contsainer");
  useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVW".split("");

    const randomLetters: string[] = [];

    // Generate 6 random letters by selecting a random index in the array
    while (randomLetters.length < 6) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];

      if (!randomLetters.includes(randomLetter)) {
        randomLetters.push(randomLetter);
      }
    }
    showtime(randomLetters);
    // const name = localStorage.getItem("username")||""
    // const Room = localStorage.getItem("room")||""
    // setName(name);
    // setRoom(Room);
    // console.log(localStorage.getItem("username"))
    // console.log(localStorage.getItem("room"))
  }, []);
  // const handeltest = () => {
  //   dictionaryEn(function (error, input) {
  //     if (error) throw error;
  //     console.log(input);
  //     // To do: use `en` somehow
  //   });
  // };

  const endgame = async () => {
    setDone(!done);

    // let finalscore = await
  };
  const handleStart = async () => {
    setStart(!start);
    try {
      axios
        .post("http://localhost:3001/score", {
          username: username,
          score: score,
        })
        .then((res) => { 
          console.log("post", res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getscore = () => {
    try {
      axios.get("http://localhost:3001/score").then((res) => {
        setWinner(res.data); 
        console.log("result", res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleScore = async () => {
  //   try {
  //     axios
  //       .post("http://localhost:3001/score", {
  //         player: username,
  //         score: score,
  //       })
  //       .then((res) => {
  //         console.log("post",res.data);

  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="flex w-full min-h-screen ">
      {start == false ? (
        <div className="w-4/5 border-black bg-cover bg-center bg-no-repeat bg-[url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTg0M2JiMDNmYTJiOWZiZDU4ODk4NDg0MWM2Yjk5YmEyYTk1OGJiOCZjdD1n/BHNfhgU63qrks/giphy.gif')] grid p-10 ">
          <div className="bg-gradient-to-r from-indigo-500 p-6 flex justify-center items-center m-auto text-center">
            Wating for Other Player... 
            <br /> 
            <div className="mix-blend-color-burn w-9/12">
              <img src="https://icons8.com/preloaders/preloaders/1486/Hourglass.gif" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-4/5 border-black bg-cover bg-center bg-no-repeat bg-[url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTg0M2JiMDNmYTJiOWZiZDU4ODk4NDg0MWM2Yjk5YmEyYTk1OGJiOCZjdD1n/BHNfhgU63qrks/giphy.gif')] grid p-10 ">
          <div className="fixed top-0 flex justify-around w-9/12 h-10 text-2xl text-center text-white rounded-xl">
            <Timer endgame={endgame} />
            Score: {score}
          </div>
          <div className="flex flex-wrap gap-4 p-2 border-yellow-300 h-36 bg-amber-500 rounded-xl border-x-8 border-y-2 ">
            {container?.map((e: string, index: number) => (
              <h1
                key={index}
                className="flex items-center justify-center h-10 p-4 text-white bg-lime-500 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500"
              >
                {e}
              </h1>
            ))}
          </div>
          <div className="p-2 p-10 border-yellow-300 h-74 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl border-x-8 border-y-2">
            <div className="flex items-center justify-center h-12 text-2xl tracking-wider border rounded-md">
              {input}
            </div>
            <div className="grid grid-cols-3 gap-4 p-2">
              <button
                onClick={() => setInput("")}
                className="text-2xl border-l-8 shadow-lg h-14 bg-gradient-to-r from-yellow-400 to-blue-500 shadow-cyan-100/50 rounded-xl"
              >
                Clear
              </button>
              <button
                onClick={handleback}
                className="text-2xl border-l-8 shadow-lg h-14 bg-gradient-to-r from-yellow-400 to-blue-500 shadow-cyan-100/50 rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleCheck}
                className="text-2xl border-l-8 shadow-lg h-14 bg-gradient-to-r from-yellow-400 to-blue-500 shadow-cyan-100/50 rounded-xl"
              >
                Enter
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
              <button
                onClick={() => handleinp(bt1)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt1}
              </button>
              <button
                onClick={() => handleinp(bt2)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt2}
              </button>
              <button
                onClick={() => handleinp(bt3)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt3}
              </button>
              <button
                onClick={() => handleinp(bt4)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt4}
              </button>
              <button
                onClick={() => handleinp(bt5)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt5}
              </button>
              <button
                onClick={() => handleinp(bt6)}
                className="text-2xl border-l-8 shadow-lg h-14 bg-cyan-500 shadow-cyan-100/50 rounded-xl"
              >
                {bt6}
              </button>
            </div>
            {/* <button onClick={handeltest}>Enter</button> */}
          </div>
        </div>
      )}
      <div className="w-1/5 border-red-800 bg-[url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/giphy.webp?cid=ecf05e47vc3hc3bylzxufiiykdoa7ix8iqn4cvtzagbdz12j&rid=giphy.webp&ct=g')] p-2">
        <button disabled={start === true} onClick={handleStart} className="mb-2 w-full text-center bg-orange-400 text-white font-bold">
          {start ? "" : "Start"}
        </button>
        {<ChatBox username={username} room={room} />}
        <button onClick={getscore} className="mt-2 w-full text-center bg-orange-400 text-white font-bold" >Show Result</button>
        <div className="box-border h-32 w-full p-2 mt-2 border-2 ">
          Winner: { winner[0]?.username} 
          <br />
          Looser: {winner[1]?.username}  
        </div> 
      </div>
    </div>
  );
};

export default Game;
