import './endTime.css'
import clockIcon from '../../assets/date-time-icons/clock-24px-simple.png'
import { useEffect } from 'react';

export default function EndTime({
    handleEndTimeData,
    handleEndDateData,
    endTime,
    setEndTime,
    startTime,
    duration,
    endDate,
    setEndDate }) {

    useEffect(() => {
        if (startTime && duration) {
            const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
            const startDate = new Date();
            startDate.setHours(startHours, startMinutes, startSeconds, 0)
            const newDate = new Date(startDate.getTime() + duration * 60000);
            if (newDate.getTime() !== endDate?.getTime()) {
                setEndDate(newDate)
                handleEndDateData(newDate)
            }
            const newEndTime = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            if (newEndTime !== endTime) {
                setEndTime(newEndTime)
                handleEndTimeData(newEndTime)
            }
        }
    }, [startTime, duration, endTime, endDate])


    return (
        <div className="endTime-outer-div">
            <div className="endTime-inner-div">
                    {endTime}
                <div className="endTime-icon-div">
                    <img src={clockIcon} alt="clock" className="endTime-icon" />
                </div>
            </div>
        </div>
    )
}