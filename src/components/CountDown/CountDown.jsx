import './count-down.css'
import { useEffect, useState } from 'react'
import { useTimer } from '../../utils/TimerProvider';
import Alarm from '../Alarm/Alarm';

export default function CountDown({ updateCountDownTimer, duration, endTime, setDuration }) {
    const { timers, stopTimer, setCountDownTime, isEditable } = useTimer();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timeString, setTimeString] = useState("0:00:00")
    const [totalDuration, setTotalDuration] = useState(null);
    const [progressBarWidth, setProgressBarWidth] = useState('0%');

    const formatTime = (num) => `${num < 10 ? '0' : ''}${num}`;

    useEffect(() => {
        if (totalDuration && typeof timers.countDownTimer === 'string' && timers.countDownTimer.includes(":")) {
            setTimeString(timers.countDownTimer)
            const [hrs, mins, secs] = timeString.split(":").map(Number);
            const currentTimeInMinutes = hrs * 60 + mins + secs / 60;
            const progressPercentage = ((totalDuration - currentTimeInMinutes) / totalDuration) * 100;
            setProgressBarWidth(`${100 - Math.max(0, progressPercentage)}%`);
        }
        if(timers.countDownTimer === "00:00:00"){
            setTotalDuration(null)
        }
    }, [timers.countDownTimer, totalDuration]);

    useEffect(() => {
        if (isNaN(progressBarWidth)) {
            setProgressBarWidth("100%")
        }
    }, [isEditable])


    const handleTimeChange = () => {
        // Ensure values are numbers
        const hrs = parseInt(hours, 10);
        const mins = parseInt(minutes, 10);

        // Format the time string correctly
        const formattedTime = `${formatTime(hrs)}:${formatTime(mins)}`;
        setCountDownTime(formattedTime);
        const newDuration = mins + (hrs * 60);
        setDuration(newDuration)
        setTotalDuration(newDuration)
    };

    return (
        <div className="count-down-outer-div">
            <div className="count-down-inner-div">
                {isEditable ? (
                    <div className='stopWatchInput'>
                        <div className="label-div">
                            <label htmlFor="hours" className="hours-label">hrs</label>
                            <label htmlFor="minutes" className="minutes-label">min</label>
                        </div>
                        <div className="input-div">
                            <input className="num-input" type="number" value={hours} onChange={(e) => setHours(e.target.value)} min="0" />
                            <input className="num-input" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} min="0" />
                            <button className="set-time-btn" onClick={handleTimeChange}>Set Time</button>
                        </div>
                        {/* <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="Seconds" /> */}
                    </div>
                ) : (
                    <div className='stopWatchDisplay'>
                        <div className="remainingTimeText">{timers.countDownTimer}</div>
                        {/* <div className="progressBarContainer">
                    <div className="progressBar"></div>
                </div> */}
                        <button className="edit-time-btn" onClick={stopTimer}>Edit</button>
                    </div>

                )}
                <Alarm totalDuration={totalDuration} />
            </div>
            <div className="progressBarContainer">
                <div className="progressBar" style={{ width: progressBarWidth }}></div>
            </div>
        </div>
    )
}