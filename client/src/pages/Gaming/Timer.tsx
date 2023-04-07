import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(90);

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Stop the timer and reset the time when it reaches 0
    if (time === 0) {
      clearInterval(timer);
      setTime(90);
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

  return <div>--- {formattedTime} --- </div>;
};

export default Timer;
