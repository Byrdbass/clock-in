import './modal-confirmation.css'
import { useEffect, useState } from "react";

export default function ModalConfirmation({
    showModal, 
    handleModalClose
}) {
if (!showModal) return null

    return(
        <>
            <div className='modal'>
                <div className='modal-card'></div>
                    MODAL
                    {/* replace with a .svg of close button */}
                    <span className='close-button' onClick={handleModalClose}>&times;</span>
                    <p>Your time entry has been submitted</p>
                   
            </div>
        </>
    )
}