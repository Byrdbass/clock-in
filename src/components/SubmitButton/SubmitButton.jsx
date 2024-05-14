import './SubmitButton.css'
import { createTimeEntry } from '../../helpers/airtablePost';
import { useTimer } from '../../utils/TimerProvider';
import { useEntry } from '../../utils/EntryProvider';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod';



export default function SubmitButton({
    userRecordID,
    startTime,
    endDate,
    endTime,
    duration,
    date,
    jobcode3,
    projectRecordId,
    setSubmittedRecordId,
    setShowError
}) {

    //post helper function for Airtable
    const submitTimeEntry = createTimeEntry

    const { resetTimers } = useTimer()
    const { entry, handleModalOpen, showError } = useEntry()
    const jobCodeRecordId = entry.jobCodeArr.recordId
    const jobCodeName = entry.jobCodeArr.jobCode

    //helper functions for incorrect date
    const dateIsFuture = isFutureDate(date);
    const dateIsPastPP = isPastPayPeriod(date);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (Object.keys(entry.jobCodeArr).length === 0 ||
            typeof entry.jobCodeArr === "string" ||
            entry.notes === '' ||
            dateIsFuture ||
            dateIsPastPP) {
            showError()
            return
        }
        submitTimeEntry(entry.notes, date, startTime, jobCodeName, userRecordID, jobCodeRecordId, duration, endTime, endDate)
            .then(recordId => {
                setSubmittedRecordId(recordId);
                handleModalOpen()
                resetTimers();
            })
            .catch(err => {
                console.error("error submitting time entry:", err)
                setShowError(true)
            })
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSubmit(event)
        }
    }

    return (
        <>
            <div className="button-outer-div">
                <button
                    type="button"
                    // id="submitTimesheet"
                    onClick={handleSubmit} onKeyDown={handleEnterPress}
                    className='submit-button'
                >
                    CLOCK OUT
                </button>

            </div>
        </>
    )
}