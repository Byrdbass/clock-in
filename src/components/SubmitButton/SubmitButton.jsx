import './SubmitButton.css'
import { createTimeEntry } from '../../helpers/airtablePost';
import { useTimer } from '../../utils/TimerProvider';
import { isFutureDate, isPastPayPeriod } from '../../helpers/isCurrentPayPeriod';



export default function SubmitButton({
    setShowModal, 
    userName, 
    userRecordID, 
    startTime, 
    endTime, 
    duration, 
    date, 
    jobcode3, 
    projectRecordId, 
    notes,
    setShowError
}) {

    //post helper function for Airtable
    const submitTimeEntry = createTimeEntry

    const { resetTimers } = useTimer()

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
        submitTimeEntry(notes, date, startTime, jobcode3, userRecordID, projectRecordId, duration)
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
        resetTimers()
        // setClockIn(0)
        setShowModal(true)
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSubmit(event)
        }
    }

    return (
        <>
            <div className="button-div">
                <button
                    type="button"
                    id="submitTimesheet"
                    onClick={handleSubmit} onKeyDown={handleEnterPress}
                    className='submit-button'
                >
                    Submit Timesheet
                </button>

            </div>
        </>
    )
}