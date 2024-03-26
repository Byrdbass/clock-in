import '../../App.css'
import { useEffect } from 'react';

export default function StartTime({ handleStartTimeData, startTime, setStartTime }) {
    
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const offset = new Date().getTimezoneOffset()
    useEffect(() => {
        // if (!startTime || startTime === ""){
            const currentTime = getCurrentTime();
            setStartTime(currentTime);
            handleStartTimeData(currentTime)
        // }
    }, [])

    const getCurrentTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        return timeString.slice(0,5);
    };


    const updateStartTime = (e) => {
        setStartTime(e.target.value);
        handleStartTimeData(e.target.value);
    }


    return (
        <div className="timerSection">
            <div className="header">Start Time</div>
            <input
                type="time"
                className="editableTime startTimeInput"
                value={startTime}
                onChange={updateStartTime}
            />
        </div>
    )
}