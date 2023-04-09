// import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react"; 

type Timetype ={
  endgame: () => void;
}

const Timer = (props:Timetype) => { 
  const [time, setTime] = useState(90);
  // const { isOpen, onOpen, onClose } = useDisclosure() ; 

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Stop the timer and reset the time when it reaches 0
    if (time === 0) {
      clearInterval(timer);
      props.endgame(); 
    }

    // Cleanup function to stop the timer when the component unmounts
    return () => clearInterval(timer);
  }, [time]);

  // Format the time as mm:ss
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  if(time===0){
    return <div>Time: 0</div> 
  }

  return <div> Time: {formattedTime} </div>;
};

export default Timer;
