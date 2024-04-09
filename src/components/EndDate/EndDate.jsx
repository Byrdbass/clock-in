import StartTime from '../StartTime/StartTime';
import './end-date.css'
import calendarIcon from '../../assets/date-time-icons/calendar-24px-rounded-edges.png'
import { useState, useEffect } from 'react'

export default function EndDate({ endDate }) {
    // console.log(startDate)
    const [endDateStr, setEndDateStr] = useState('')
    useEffect(() => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const newDateStr = new Date(endDate)
        setEndDateStr(newDateStr.toLocaleDateString('en-US', options))
    }, [endDate])
    return (
        <>
            <div className="date-outer-div">
                <div className="date-inner-div">
                    {endDateStr}
                    <div className="cal-icon">

                        <img className="cal-icon" src={calendarIcon} alt="calendar" />
                    </div>
                </div>
            </div>
        </>
    )
}