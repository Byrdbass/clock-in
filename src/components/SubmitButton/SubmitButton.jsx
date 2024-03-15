import './SubmitButton.css'

export default function SubmitButton({

}) {

    const handleSubmit = (event) => {
        event.preventDefault()
        //HAVE THIS RETURN NEW RECORD ID - SET TO USESTATE VAR
        submitTimeEntry(notes, date, startTime, jobcode3, userRecordID, projectRecordId)
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
        setClockIn(0)
        setShowModal(true)
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSubmit(event)
        }
    }

    return (
        <>
            <div className="inputSection" style={{ flexBasis: '100%', textAlign: 'center' }}>
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