import './modal-error.css'
import { useEffect } from 'react';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod'

export default function ModalError({
    showError,
    date,
    notes,
    handleModalErrorClose
}) {

    const dateIsFuture = isFutureDate(date);
    const dateIsPastPP = isPastPayPeriod(date);
useEffect(() => {

},[date])

    if (!showError) return null
    return (
        <>
            <div className='modal'>
                <div className='modal-card'>
                    <div className='modal-content'>
                        {notes === '' ?
                            <p>Notes Empty</p> :
                            <p>Error</p>
                        }
                        {dateIsFuture ?
                            <p>Date is in the future!</p> :
                            <p></p>}
                        {dateIsPastPP ?
                            <p>Date is in Previous Pay Period</p> :
                            <p></p>}

                    </div>
                    <div className='top-right'>
                        <div className='close-button' onClick={handleModalErrorClose}>
                            &times;
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}