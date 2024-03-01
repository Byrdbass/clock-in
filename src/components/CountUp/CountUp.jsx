import "../../App.css";
import { useEffect, useState } from 'react';

export default function CountUp({ countUpTimer, setCountUpTimer, resetCount }) {
    // Convert the initial countUpTimer value to total seconds
    const [initialTotalSeconds, setInitialTotalSeconds] = useState(() => {
        const [hours, minutes, seconds] = countUpTimer.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    });

    useEffect(() => {
        let elapsedSeconds = 0; // Counter for elapsed seconds

        const calculateElapsedTime = () => {
            elapsedSeconds++; // Increment elapsed seconds
            const totalSeconds = initialTotalSeconds + elapsedSeconds; // Total elapsed seconds including initial time

            // Convert total seconds back into hours, minutes, and seconds
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Format the time string and update using setCountUpTimer
            setCountUpTimer(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        };

        // Update the elapsed time every second
        const timer = setInterval(calculateElapsedTime, 1000);

        // Clear the interval on component unmount
        return () => clearInterval(timer);
    }, [initialTotalSeconds, setCountUpTimer]); // Depend on initialTotalSeconds and setCountUpTimer

    useEffect(() => {
        if (resetCount) {
            setInitialTotalSeconds(0);  // Reset the count
            setCountUpTimer("00:00:00");  // Reset the display
        }
    }, [resetCount, setCountUpTimer]);

    return (
        <div className="timerSection">
            <div className="header">Elapsed Time</div>
            <div id="countUpTimer" className="timer-value">{countUpTimer}</div>
        </div>
    );
}


