import '../../App.css'
import { useEffect } from 'react';

export default function StartTime({ handleStartTimeData, startTime, setStartTime }) {
    
    useEffect(() => {
        if (!startTime || startTime === ""){
            const currentTime = getCurrentTime();
            setStartTime(currentTime);
            handleStartTimeData(currentTime)
        }
    }, [])

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
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