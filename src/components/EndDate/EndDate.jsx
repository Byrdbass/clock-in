import StartTime from '../StartTime/StartTime';
import './end-date.css'
import calendarIcon from '../../assets/date-time-icons/calendar-24px-rounded-edges.png'
import { useState, useEffect } from 'react'

export default function EndDate({ endDate, endTime, duration }) {
    // console.log(startDate)
    const [endDateStr, setEndDateStr] = useState('')
    useEffect(() => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const newDateStr = new Date(endDate)
        setEndDateStr(newDateStr.toLocaleDateString('en-US', options))
    }, [endDate, endTime, duration])
    return (
        <>
            <div className="endDate-outer-div">
                <div className="endDate-inner-div">
                    {endDateStr}
                    <div className="cal-icon-div">
                        {/* <span className="cal-icon"></span> */}
                        <img className="cal-icon" src={calendarIcon} alt="calendar" />
                    </div>
                </div>
            </div>
        </>
    )
}