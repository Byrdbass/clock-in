import '../../App.css'

export default function DurationSlider({ duration, setDuration, handleDurationChange}) {
    return (
        <div className="inputSection" style={{ width: '100%', textAlign: 'center' }}>
            <div className="header">Adjust Duration</div>
            <input
                type="range"
                id="durationSlider"
                min="1"
                max="240"
                value={duration}
                onChange={handleDurationChange}
                style={{ width: '60%' }}
            />
            <div className="sliderValue" id="sliderValue">{duration} Minutes</div>
        </div>
    )
}