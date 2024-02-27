import '../../App.css'

export default function StartTime({ handleStartTimeData, startTime, setStartTime }) {

    const updateStartTime = (e) => {
        setStartTime(e.target.value);
        handleStartTimeData(e.target.value);
    }

    return (
        <div className="timerSection">
            <div className="header">Start Time</div>
            <input
                type="time"
                className="editableTime startTimeInput"
                value={startTime}
                onChange={updateStartTime}
            />
        </div>
    )
}