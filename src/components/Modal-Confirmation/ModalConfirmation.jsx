import './modal-confirmation.css'
import { useEffect, useState } from "react";

export default function ModalConfirmation({
    showModal,
    userName,
    date,
    duration,
    startTime,
    endTime,
    jobcode3,
    notes,
    handleModalClose
}) 
{
    const [newStartTime, setNewStartTime] = useState()
    const [newEndTime, setNewEndTime] = useState()

    useEffect(() => {
        const [hours, minutes] = startTime.split(":").map(Number)
        const AMorPM = hours > 12 ? "PM": "AM"
        const format12hr = hours%12 || 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setNewStartTime(`${format12hr}:${formattedMinutes} ${AMorPM}`)

    }, [startTime])

    useEffect(() => {
        setNewEndTime(`${endTime.replace(/^0+/, "")}`)
    }, [endTime])

    if (!showModal) return null

    return (
        <>
            <div>

                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-card' onClick={e => e.stopPropagation()}></div>
                    {/* replace with a .svg of close button */}
                    <div className='modal-content'onClick={e => e.stopPropagation()}>
                        <p className='row'>Name: {userName}</p>
                        <p>Date: {date} </p>
                        <p>Duration: {duration} </p>
                        <p>Start Time: {newStartTime} </p>
                        <p>End Time: {newEndTime} </p>
                        <p>Job-Code/Product: {jobcode3} </p>
                        <p>Notes on Entry: {notes} </p>
                        <p>Your time entry has been submitted!</p>
                    </div>
                    <div className='top-right'>

                        <span className='close-button' onClick={handleModalClose}>&times;</span>
                    </div>

                </div>
            </div>
        </>
    )
}