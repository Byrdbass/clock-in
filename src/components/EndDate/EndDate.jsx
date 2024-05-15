import './end-date.css'
import calendarIcon from '../../assets/date-time-icons/calendar-24px-rounded-edges.png'
import { useState, useEffect } from 'react'
import { useEntry } from '../../utils/EntryProvider'

export default function EndDate({ endDate, endTime, duration }) {
    const [endDateStr, setEndDateStr] = useState('')
    const { entry, updateEndDate } = useEntry()

    useEffect(() => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const newDateStr = new Date(endDate)
        setEndDateStr(newDateStr.toLocaleDateString('en-US', options))
    }, [endDate, endTime, duration])
    return (
        <>
            <div className="endDate-outer-div">
                <div className="endDate-inner-div">
                    {/* TODO change this to end date but only if duration pushes this past midnight */}
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