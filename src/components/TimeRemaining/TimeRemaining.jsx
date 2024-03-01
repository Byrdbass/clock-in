import '../../App.css'

import { useEffect } from 'react'

export default function TimeRemaining({ remainingTimeText, setRemainingTimeText, duration }) {
    useEffect(() => {
        const endTime = new Date(new Date().getTime() + duration * 60000);

        const calculateTimeRemaining = () => {
          const now = new Date();
          const timeRemaining = endTime - now;
      
          if (timeRemaining > 0) {
            const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
            const seconds = Math.floor((timeRemaining / 1000) % 60);
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          } else {
            clearInterval(timer); // Stop the timer when it reaches 0
            return "00:00:00";
          }
        };
      
        const updateRemainingTime = () => {
          setRemainingTimeText(calculateTimeRemaining());
        };
      
        // Update the time remaining every second
        const timer = setInterval(updateRemainingTime, 1000);
      
        // Clear the interval on component unmount
        return () => clearInterval(timer);
      }, [duration, setRemainingTimeText]);
      

    return(
        <div className="timerSection">
        <div className="header">Time Remaining</div>
        <div className="remainingTimeText" id="remainingTimeText">{remainingTimeText}</div>
        <div className="progressBarContainer">
          <div className="progressBar" id="progressBar"></div>
        </div>
      </div>
    )
}