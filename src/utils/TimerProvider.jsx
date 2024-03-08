import React, { createContext, useState, useContext, useEffect } from "react";

const TimerContext = createContext();

//custom hook
export function useTimer() {
  return useContext(TimerContext);
}

export function TimerProvider({ children, duration }) {
  const [timers, setTimers] = useState({
    countUpTimer: 0,
    countDownTimer: duration,
  });

  useEffect(() => {
    setTimers((prevTimers) => ({ ...prevTimers, countDownTimer: duration }));
  }, [duration]);

  const resetTimers = () => {
    setTimers({ countUpTimer: 0, countDownTimer: duration });
  };

  const updateCountDownTimer = (newDuration) => {
    setTimers((prevTimers) =>({...prevTimers, countDownTimer: newDuration}))
  }

  return (
    <TimerContext.Provider value={{ timers, resetTimers, updateCountDownTimer }}>
      {children}
    </TimerContext.Provider>
  );
}
