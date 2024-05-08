import './SubmitButton.css'
import { createTimeEntry } from '../../helpers/airtablePost';
import { useTimer } from '../../utils/TimerProvider';
import { useEntry } from '../../utils/EntryProvider';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod';



export default function SubmitButton({
    setShowModal,
    userName,
    userRecordID,
    startTime,
    endDate,
    endTime,
    duration,
    date,
    jobcode3,
    projectRecordId,
    notes,
    setNotes,
    setSubmittedRecordId,
    setShowError
}) {

    //post helper function for Airtable
    const submitTimeEntry = createTimeEntry

    const { resetTimers } = useTimer()
    const { entry } = useEntry()
    const jobCodeRecordId = entry.jobCodeArr.recordId
    const jobCodeName = entry.jobCodeArr.jobCode

    //helper functions for incorrect date
    const dateIsFuture = isFutureDate(date);
    const dateIsPastPP = isPastPayPeriod(date);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (notes === '' ||
            dateIsFuture ||
            dateIsPastPP) {
            setShowError(true)
            return
        }
        //HAVE THIS RETURN NEW RECORD ID - SET TO USESTATE VAR
        submitTimeEntry(notes, date, startTime, jobCodeName, userRecordID, jobCodeRecordId, duration, endTime, endDate)
            .then(recordId => {
                setSubmittedRecordId(recordId);
                setShowModal(true)
                resetTimers();
            })
            .catch(err => {
                console.error("error submitting time entry:", err)
                setShowError(true)
            })
        const getCurrentTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };
        const getTodaysDate = () => {
            const today = new Date();
            return today.toISOString().split('T')[0];
        };
        //MOVE THESE TO WHEN MODAL CLOSES?
        // handleDateData(getTodaysDate())
        // setDate(getTodaysDate)
        // setStartTime(getCurrentTime())
        // handleStartTimeData(getCurrentTime())
        // setDuration(25)
        // setNotes("")
        // setDate("")
        // setClockIn(0)
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