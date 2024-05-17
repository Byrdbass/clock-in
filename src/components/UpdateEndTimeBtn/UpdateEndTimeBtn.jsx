import './end-time-btn.css'
import { useEntry } from '../../utils/EntryProvider'
import { getCurrentTime, getCurrentDate } from '../../helpers/getCurrentTime';

export default function UpdateEndTimeBtn() {

    const { entry, updateEndTime, updateStartDate } = useEntry();

    const handleEndTime = () => {
        const now = getCurrentTime()
        const today = getCurrentDate()
        updateEndTime(now)
        updateStartDate(today)
    }

    return (
        <div className="endTimeBtn-outer-div">
            <div className="endTimeBtn-inner-div">
                <button 
                onClick={handleEndTime}
                className="endTimeBtn">
                    NOW
                </button>
            </div>
        </div>
    )
}