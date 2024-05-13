import './modal-error.css'
import { useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod'

export default function ModalError({
    showError,
    date,
    notes,
    handleModalErrorClose
}) {

    const { entry } = useEntry()
    const dateIsFuture = isFutureDate(date);
    const dateIsPastPP = isPastPayPeriod(date);
// useEffect(() => {

// },[date])

    if (!entry.showErrorModal) return null
    return (
        <>
            <div className='modal'>
                <div className='modal-card'>
                    <div className='modal-content'>
                        {entry.notes === '' ?
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