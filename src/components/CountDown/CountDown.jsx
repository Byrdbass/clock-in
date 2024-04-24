import './count-down.css'
import { useEffect, useState } from 'react'
import { useTimer } from '../../utils/TimerProvider';

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
    }, [timers.countDownTimer, totalDuration]);

    useEffect(()=>{
        if(isNaN(progressBarWidth)){
            setProgressBarWidth("100%")
        }
    }, [isEditable])

    // useEffect(()=>{
    //     let hrs;
    //     let mins;
    //     if(duration >= 60){
    //         hrs = duration/60;
    //         mins = duration%60;
    //     }else{
    //         mins = duration;
    //     }
    //     const formattedTime = `${formatTime(hrs)}:${formatTime(mins)}`;
    //     setCountDownTime(formattedTime)
    // }, [duration, endTime])

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
            {isEditable ? (
                <div className='stopWatchInput'>
                    <label htmlFor="hours" className="hours-label">hours</label>
                    <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" min="0" />
                    <label htmlFor="minutes" className="minutes-label"></label>
                    <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Minutes" min="0" />
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
                <div className="progressBar" style={{ width: progressBarWidth }}></div>
            </div>
        </div>
    )
}