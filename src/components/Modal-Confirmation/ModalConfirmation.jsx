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
}) {
    if (!showModal) return null

    return (
        <>
            <div>

                <div className='modal'onClick={handleModalClose}>
                    <div className='modal-card' onClick={e => e.stopPropagation()}></div>
                    {/* replace with a .svg of close button */}
                    <div className='modal-content'onClick={e => e.stopPropagation()}>
                        <p>Name: {userName}</p>
                        <p>Date: {date} </p>
                        <p>Duration: {duration} </p>
                        <p>Start Time: {startTime} </p>
                        <p>End Time: {endTime} </p>
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