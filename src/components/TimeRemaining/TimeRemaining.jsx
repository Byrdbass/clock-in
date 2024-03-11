import '../../App.css'

import { useEffect } from 'react'

export default function TimeRemaining({ remainingTimeText, setRemainingTimeText, duration }) {
//EXPORT THIS TO HELPER FILE
    function beep() {
        var context = new AudioContext();
        var o = context.createOscillator();
        var g = context.createGain();
        o.frequency.value = 432; // Beep frequency
        o.connect(g);
        g.connect(context.destination);
        o.start(0);
        g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1); // Beep duration
    }

    useEffect(() => {
        let beepCount = 0;
        const beepLimit = 3;
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
                clearInterval(timer); 
                if (beepCount < beepLimit) {
                    // beep()
                    beepCount++
                }
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


    return (
        <div className="timerSection">
            <div className="header">Time Remaining</div>
            <div className="remainingTimeText" id="remainingTimeText">{remainingTimeText}</div>
            <div className="progressBarContainer">
                <div className="progressBar" id="progressBar"></div>
            </div>
        </div>
    )
}