import { useEffect, useState } from "react";
import Timer from "./Timer";
import { getDataFromApi } from "./api";
// import dictionaryEn from "dictionary-en";

const Game = () => {
  // const initialState=[]
  const [input, setInput] = useState<string>("");
  const [container, setContainer] = useState<string[]>([]);
  const [box, setBox] = useState<string[]>();
  const [bt1, setBt1] = useState<string>("");
  const [bt2, setBt2] = useState<string>("");
  const [bt3, setBt3] = useState<string>("");
  const [bt4, setBt4] = useState<string>("");
  const [bt5, setBt5] = useState<string>("");
  const [bt6, setBt6] = useState<string>("");

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
        if(!container.includes(data)){
          setContainer([...container, data]);
        }
        else{
          alert("already exits")
        }
      }
      console.log(res);
    }
    else{
      alert("length should be greater")
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
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
  }, []);
  // const handeltest = () => {
  //   dictionaryEn(function (error, input) {
  //     if (error) throw error;
  //     console.log(input);
  //     // To do: use `en` somehow
  //   });
  // };

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-4/5 border-black bg-cover bg-center bg-no-repeat bg-[url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTg0M2JiMDNmYTJiOWZiZDU4ODk4NDg0MWM2Yjk5YmEyYTk1OGJiOCZjdD1n/BHNfhgU63qrks/giphy.gif')] grid p-10 ">
        <div className="h-10 fixed top-0 w-9/12 text-center text-2xl text-white rounded-xl ">
          <Timer />
        </div>
        <div className="h-36 bg-amber-500 rounded-xl border-yellow-300 border-x-8 border-y-2 p-2">
          {container?.map((e: string, index: number) => (
            <h1 key={index} className="text-white">
              {" "}
              {e}
            </h1>
          ))}
          --
        </div>
        <div className="h-74 p-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl border-yellow-300 border-x-8 border-y-2 p-2">
          <div className="h-12 rounded-md border flex text-2xl justify-center items-center tracking-wider">
            {input}
          </div>
          <div className="p-2 grid grid-cols-3 gap-4">
            <button
              onClick={() => setInput("")}
              className="h-14 text-2xl bg-gradient-to-r from-yellow-400 to-blue-500 shadow-lg shadow-cyan-100/50 rounded-xl border-l-8"
            >
              Clear
            </button>
            <button
              onClick={handleback}
              className="h-14 text-2xl bg-gradient-to-r from-yellow-400 to-blue-500 shadow-lg shadow-cyan-100/50 rounded-xl border-l-8"
            >
              Back
            </button>
            <button
              onClick={handleCheck}
              className="h-14 text-2xl bg-gradient-to-r from-yellow-400 to-blue-500 shadow-lg shadow-cyan-100/50 rounded-xl border-l-8"
            >
              Enter
            </button>
          </div>
          <div className="p-4 grid grid-cols-3 gap-4">
            <button
              onClick={() => handleinp(bt1)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt1}
            </button>
            <button
              onClick={() => handleinp(bt2)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt2}
            </button>
            <button
              onClick={() => handleinp(bt3)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt3}
            </button>
            <button
              onClick={() => handleinp(bt4)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt4}
            </button>
            <button
              onClick={() => handleinp(bt5)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt5}
            </button>
            <button
              onClick={() => handleinp(bt6)}
              className="h-14 bg-cyan-500 shadow-lg text-2xl shadow-cyan-100/50 rounded-xl border-l-8"
            >
              {bt6}
            </button>
          </div>
          {/* <button onClick={handeltest}>Enter</button> */}
        </div>
      </div>
      <div className="w-1/5 border-red-800 bg-[url('https://media1.giphy.com/media/tNt8ZSSrwNHzQcPABV/giphy.webp?cid=ecf05e47vc3hc3bylzxufiiykdoa7ix8iqn4cvtzagbdz12j&rid=giphy.webp&ct=g')]"></div>
    </div>
  );
};

export default Game;
