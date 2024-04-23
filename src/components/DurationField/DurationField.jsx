import CountDown from '../CountDown/CountDown'
import './duration-field.css'

export default function DurationField({ duration, setDuration, handleDurationChange }) {
    return (
            <div className="duration-field-outer-div">
                <input
                    type="number"
                    className='minute-input'
                    placeholder="Duration (minutes)"
                    style={{ fontSize: '14px' }}
                    value={CountDown}
                    onChange={handleDurationChange}
                />
            </div>
    )
}