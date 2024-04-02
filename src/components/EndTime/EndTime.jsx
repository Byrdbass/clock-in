import '../../App.css'
import { useEffect } from 'react';

export default function EndTime({
    handleEndTimeData,
    handleEndDateData,
    endTime,
    setEndTime,
    startTime,
    duration,
    setEndDate }) {

    useEffect(() => {
        if (startTime && duration) {
            const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
            const startDate = new Date();
            startDate.setHours(startHours, startMinutes, startSeconds, 0)
            const newDate = new Date(startDate.getTime() + duration * 60000);
            setEndDate(newDate)
            handleEndDateData(newDate)
            const newEndTime = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            setEndTime(newEndTime)
            handleEndTimeData(newEndTime)
        }
    }, [startTime, duration, setEndTime, handleEndTimeData, handleEndDateData, setEndDate])


    return (
        <div className="timerSection">
            <div className="header"></div>
            <div id="endTime" className="timer-value" value={endTime}>
                {endTime}
            </div>
        </div>
    )
}