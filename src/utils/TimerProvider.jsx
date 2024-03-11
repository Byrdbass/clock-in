import React, { createContext, useState, useContext, useEffect } from "react";

const TimerContext = createContext();

//custom hook
export function useTimer() {
  return useContext(TimerContext);
}

export function TimerProvider({ children, duration }) {
  const [timers, setTimers] = useState({
    countUpTimer: "00:00:00",
    countDownTimer: duration,
  });

  //WORKING COUNTDOWN TIMER
  useEffect(() => {
    //parsing duration to dateTime obj
    const endTime = new Date(new Date().getTime() + duration * 60000);
    let newCountDown;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const timeRemaining = endTime - now;
      //parsing timeDate values to Strings
      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      } else {
        clearInterval(newCountDown);
        return "00:00:00";
      }
    };

    //keeping track of changes in duration for Countdown timer
    const updateRemainingTime = () => {
      setTimers((prevTimers) => ({ ...prevTimers, countDownTimer: calculateTimeRemaining() }));
    };

    // clear interval before updateRemainingTime is run
    clearInterval(newCountDown)
    newCountDown = setInterval(updateRemainingTime, 1000)

    // clear the interval when component is rendered/unmounted AND when duration changes
    return () => clearInterval(newCountDown)
  }, [duration, setTimers])



  const resetTimers = () => {
    setTimers({ countUpTimer: 0, countDownTimer: duration });
  };

  return (
    <TimerContext.Provider value={{
      timers, resetTimers,
      // updateCountDownTimer 
    }}>
      {children}
    </TimerContext.Provider>
  );
}
