import './modal-confirmation.css'
import { useEffect, useState } from "react";
import { useEntry } from '../../utils/EntryProvider';

export default function ModalConfirmation({
    date,
    duration,
    startTime,
    endTime,
    submittedRecordId,
}) 
{
    const [newStartTime, setNewStartTime] = useState()
    const [newEndTime, setNewEndTime] = useState()
    const { entry, handleModalClose } = useEntry()

    useEffect(() => {
        const [hours, minutes] = entry.startTime.split(":").map(Number)
        const AMorPM = hours > 12 ? "PM": "AM"
        const format12hr = hours%12 || 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setNewStartTime(`${format12hr}:${formattedMinutes} ${AMorPM}`)
    }, [entry.startTime])

    useEffect(() => {
        const [hours, minutes] = entry.startTime.split(":").map(Number)
        const AMorPM = hours > 12 ? "PM": "AM"
        const format12hr = hours%12 || 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        setNewEndTime(`${format12hr}:${formattedMinutes} ${AMorPM}`)
        // setNewEndTime(`${endTime.replace(/^0+/, "")}`)
    }, [entry.endTime])

    if (!entry.showConfirmModal) return null

    return (
        <>
            <div>
                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-card' onClick={e => e.stopPropagation()}></div>
                    {/* replace with a .svg of close button */}
                    <div className='modal-content'onClick={e => e.stopPropagation()}>
                        <p className='modal-row'>Name: {entry.userName}</p>
                        <p>Date: {entry.startDate} </p>
                        <p>Duration: {entry.duration} </p>
                        <p>Start Time: {newStartTime} </p>
                        <p>End Time: {newEndTime} </p>
                        <p>Job-Code/Product: {entry.jobCodeArr.jobCode} </p>
                        <p>Notes on Entry: {entry.notes} </p>
                        <p> RECORD ID: {submittedRecordId}</p>
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