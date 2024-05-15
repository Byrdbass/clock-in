// import '../../App.css'
import './startTime.css'
import { useState, useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';

export default function StartTime({ handleStartTimeData, startTime, setStartTime }) {
    const { entry, updateStartTime } = useEntry();
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

            const options = { hour: '2-digit', minute: '2-digit', hour24: false };
            const timeString = entry.startTime
            setStartTimeFormatted(timeString)
    }, [entry.startDateTime])



    const handleStartTime = (e) => {
        // console.log(e.target.value)
        setStartTime(e.target.value);
        handleStartTimeData(e.target.value);
        updateStartTime(e.target.value)
    }


    return (
        <div className="startTime-outer-div">
            <input
                type="time"
                className="startTimeInput"
                value={entry.startTime}
                onChange={handleStartTime}
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