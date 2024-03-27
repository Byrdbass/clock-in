import '../../App.css'
import { useEffect } from 'react';

export default function EndTime({ handleEndTimeData, endTime, setEndTime, startTime, duration }) {

    useEffect(() => {
        if (startTime && duration) {
            const [startHours, startMinutes] = startTime.split(":").map(Number);
            const startDate = new Date();
            startDate.setHours(startHours, startMinutes, 0, 0)
            const endDate = new Date(startDate.getTime() + duration * 60000);
            const newEndTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            setEndTime(newEndTime)
            handleEndTimeData(newEndTime)
        }
    }, [startTime, duration, setEndTime, handleEndTimeData])


    return (
        <div className="timerSection">
            <div className="header">End Time</div>
            <div id="endTime" className="timer-value" value={endTime}>
                {endTime}
            </div>
        </div>
    )
}