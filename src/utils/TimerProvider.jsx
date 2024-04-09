import React, { createContext, useState, useContext, useEffect } from "react";

const TimerContext = createContext();

//custom hook
export function useTimer() {
  return useContext(TimerContext);
}

export function TimerProvider({ children, duration, clockIn }) {
  const [timers, setTimers] = useState({
    countUpTimer: "0:00:00",
    countDownTimer: duration,
  });
  const [countUpIntervalId, setCountUpIntervalId] = useState(null);
  const [countDownIntervalId, setCountDownIntervalId] = useState(null);

  //WORKING COUNTDOWN TIMER
  useEffect(() => {
    //parsing duration to dateTime obj
    const endTime = new Date(new Date().getTime() + duration * 60000);
    // let newCountDown;

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
        // clearInterval(newCountDown);
        return "00:00:00";
      }
    };

    //keeping track of changes in duration for Countdown timer
    const updateRemainingTime = () => {
      setTimers((prevTimers) => ({ ...prevTimers, countDownTimer: calculateTimeRemaining() }));
    };

    const countDownInterval = setInterval(updateRemainingTime, 1000);
    setCountDownIntervalId(countDownInterval);

    // clear interval before updateRemainingTime is run
    // clearInterval(newCountDown)
    // newCountDown = setInterval(updateRemainingTime, 1000)

    // clear the interval when component is rendered/unmounted AND when duration changes
    return () => clearInterval(countDownInterval)
  }, [duration])

  useEffect(() => {
    const startTime = new Date();

    const calculateTimeClockedIn = () => {
      const now = new Date();
      const timeLogged = now - startTime
      const hours = Math.floor((timeLogged / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLogged / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLogged / 1000) % 60);
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    const updateTimeClockedIn = () => {
      setTimers((prevTimers) => ({ ...prevTimers, countUpTimer: calculateTimeClockedIn() }))
    }

    const countUpInterval = setInterval(updateTimeClockedIn, 1000);
    setCountUpIntervalId(countUpInterval);

    // clearInterval(countUpInterval)
    // countUpInterval = setInterval(updateTimeClockedIn, 1000)

    return () => clearInterval(countUpInterval)
  }, [clockIn])

  const resetTimers = () => {
    clearInterval(countUpIntervalId);
    clearInterval(countDownIntervalId);
    setTimers({ countUpTimer: "0:00:00", countDownTimer: duration });

    const newCountDownInterval = setInterval(() => {
      const endTime = new Date(new Date().getTime() + duration * 60000);
      const timeRemaining = endTime - new Date();
      if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        setTimers((prevTimers) => ({
          ...prevTimers,
          countDownTimer: `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
        }));
      } else {
        clearInterval(newCountDownInterval);
        setTimers((prevTimers) => ({ ...prevTimers, countDownTimer: "00:00:00" }));
      }
    }, 1000);
    setCountDownIntervalId(newCountDownInterval);

    const newStartTime = new Date();
    const newCountUpInterval = setInterval(() => {
      const timeLogged = new Date() - newStartTime;
      const hours = Math.floor((timeLogged / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLogged / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLogged / 1000) % 60);
      setTimers((prevTimers) => ({
        ...prevTimers,
        countUpTimer: `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
      }));
    }, 1000);
    setCountUpIntervalId(newCountUpInterval);
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
