import './endTime.css'
import clockIcon from '../../assets/date-time-icons/clock-24px-simple.png'
import { useEffect } from 'react';
import { useTimer } from '../../utils/TimerProvider';

export default function EndTime({
    handleEndTimeData,
    handleEndDateData,
    endTime,
    setEndTime,
    startTime,
    duration,
    setDuration,
    endDate,
    setEndDate }) {

    const { setCountDownTime } = useTimer();
    const formatTime = (num) => `${num < 10 ? '0' : ''}${num}`;

    useEffect(() => {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0)
        const newDate = new Date(startDate.getTime() + duration * 60000);
        if (newDate.getTime() !== endDate?.getTime()) {
            setEndDate(newDate)
            handleEndDateData(newDate)
        }
        const newEndTime = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        if (newEndTime !== endTime) {
            setEndTime(newEndTime)
            handleEndTimeData(newEndTime)
        }

    }, [startTime, duration, endTime, endDate])


    const updateEndTime = (e) => {
        const newEndTimeValue = e.target.value;
        setEndTime(newEndTimeValue);
        handleEndTimeData(newEndTimeValue);
        //comparing values for change
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = newEndTimeValue.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);
        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0);

        //updating Timer
        const formattedTime = `${formatTime(endHours)}:${formatTime(endMinutes)}`;
        setCountDownTime(formattedTime)

        const newDuration = (endDate - startDate) / 60000;
        if (newDuration >= 0) {
            setDuration(newDuration);
            setEndTime(newEndTimeValue);
            handleEndTimeData(newEndTimeValue);
        }
    }

    return (
        <div className="endTime-outer-div">
            <input
                type="time"
                className="endTimeInput"
                value={endTime}
                onChange={updateEndTime}
                style={{
                    border: 'none',
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    height: '20px',
                    width: '6.1rem',
                    // color: 'black',
                    // zIndex: '1'
                }}
            />
            {/* <div className="endTime-icon-div"></div> */}
        </div>
    )
}