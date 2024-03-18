import "./durationSlider.css"

export default function DurationSlider({ duration, setDuration, handleDurationChange}) {
    return (
        <div className="duration-outer-div">
            <div className="duration-header">Adjust Duration</div>
            <input
                type="range"
                className="duration-input"
                min="1"
                max="240"
                value={duration}
                onChange={handleDurationChange}
                // why is css file not reading this?
                style={{ width: '60%', margin: '0px' }}
            />
            <div className="duration-value">{duration} Minutes</div>
        </div>
    )
}