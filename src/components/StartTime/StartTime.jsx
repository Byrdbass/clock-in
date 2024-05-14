// import '../../App.css'
import './startTime.css'
import { useState, useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';

export default function StartTime({ handleStartTimeData, startTime, setStartTime }) {
    const { entry } = useEntry();
    const [ startTimeFormatted, setStartTimeFormatted ] = useState("")
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const offset = new Date().getTimezoneOffset()
    const getCurrentTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        return timeString;
    };

    useEffect(() => {
            const currentTime = getCurrentTime();
            setStartTime(currentTime);

            const options = { hour: '2-digit', minute: '2-digit', hour12: false };
            const timeString = entry.startDateTime.toLocaleTimeString('en-US', options);
            setStartTimeFormatted(timeString)
    }, [entry.startDateTime])



    const updateStartTime = (e) => {
        setStartTime(e.target.value);
        handleStartTimeData(e.target.value);
    }


    return (
        <div className="startTime-outer-div">
            <input
                type="time"
                className="startTimeInput"
                value={startTimeFormatted}
                onChange={updateStartTime}
                style={{
                    border: 'none',
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    width: '6.1rem'
                }}
            />
            <span className="clock-icon"></span>
        </div>
    )
}