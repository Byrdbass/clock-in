import './count-down.css'
import { useEffect, useState } from 'react'
import { useTimer } from '../../utils/TimerProvider';

export default function CountDown({ updateCountDownTimer, setDuration }) {
    const { timers, stopTimer, setCountDownTime, isEditable } = useTimer();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const formatTime = (num) => `${num < 10 ? '0' : ''}${num}`;

    const handleTimeChange = () => {
        // Ensure values are numbers
        const hrs = parseInt(hours, 10);
        const mins = parseInt(minutes, 10);

        // Format the time string correctly
        const formattedTime = `${formatTime(hrs)}:${formatTime(mins)}`;
        setCountDownTime(formattedTime);
        const newDuration = mins + (hrs * 60);
        setDuration(newDuration)
    };

    return (
        <div className="count-down-outer-div">
            {isEditable ? (
                <div className='stopWatchInput'>
                    <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" />
                    <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Minutes" />
                    {/* <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="Seconds" /> */}
                    <button onClick={handleTimeChange}>Set Time</button>
                </div>
            ) : (
                <div className='stopWatchDisplay'>
                    <div className="remainingTimeText">{timers.countDownTimer}</div>
                    {/* <div className="progressBarContainer">
                    <div className="progressBar"></div>
                </div> */}
                    <button onClick={stopTimer}>Edit</button>
                </div>

            )}
            <div className="progressBarContainer">
                <div className="progressBar" ></div>
            </div>
        </div>
    )
}