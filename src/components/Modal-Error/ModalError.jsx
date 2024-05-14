import './modal-error.css'
import { useEntry } from '../../utils/EntryProvider';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod'

export default function ModalError({
    date,
}) {

    const { entry, showError } = useEntry()
    const dateIsFuture = isFutureDate(date);
    const dateIsPastPP = isPastPayPeriod(date);

    const handleModalErrorClose = () => {
        showError()
    }

    const isObjectEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    if (!entry.showErrorModal) return null
    return (
        <>
            <div className='modal'>
                <div className='modal-card'>
                    <div className='modal-content'>
                        {isObjectEmpty(entry.jobCodeArr) ?
                            <p>No job code selected. Please select a job code.</p> :
                            <p>Error Contact Leland for help</p>
                            }
                        {entry.notes === '' ?
                            <p>Notes Empty</p> :
                            <p>Error Contact Leland for help</p>
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