// import '../../App.css'
import './startTime.css'
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
        return timeString;
    };


    const updateStartTime = (e) => {
        setStartTime(e.target.value);
        handleStartTimeData(e.target.value);
    }


    return (
        <div className="startTime-outer-div">
            <input
                type="time"
                className="startTimeInput"
                value={startTime}
                onChange={updateStartTime}
                style={{
                    border: 'none',
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    width: '95px'
                }}
            />
            <span className="clock-icon"></span>
        </div>
    )
}