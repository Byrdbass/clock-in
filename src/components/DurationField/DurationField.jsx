import '../../App.css'

export default function DurationField({ duration, setDuration, handleDurationChange }) {
    return (
            <div className="inputSection">
                <div className="header">Duration</div>
                <input
                    type="text"
                    id="durationField"
                    placeholder="Duration (minutes)"
                    style={{ fontSize: '1em' }}
                    value={duration}
                    onChange={handleDurationChange}
                />
            </div>
    )
}