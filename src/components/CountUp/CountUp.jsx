import "../../App.css";
import { useEffect, useState } from 'react';

export default function CountUp({ countUpTimer, setCountUpTimer, resetCount }) {
    // Convert the initial countUpTimer value to total seconds
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(() => {
        const [hours, minutes, seconds] = countUpTimer.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    });

    useEffect(() => {
        let elapsedSeconds = 0; 

        const calculateElapsedTime = () => {
            elapsedSeconds++; 
            const totalSeconds = initialTotalSeconds + elapsedSeconds; 

            const hours = Math.floor(totalSeconds / 3600) % 24;
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setCountUpTimer(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        };

        const timer = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(timer);
    }, [initialTotalSeconds, setCountUpTimer]); 

    useEffect(() => {
        if (resetCount) {
            setInitialTotalSeconds(0);  
            setCountUpTimer("00:00:00");
        }
    }, [resetCount, setCountUpTimer]);

    return (
        <div className="timerSection">
            <div className="header">Elapsed Time</div>
            <div id="countUpTimer" className="timer-value">{countUpTimer}</div>
        </div>
    );
}


