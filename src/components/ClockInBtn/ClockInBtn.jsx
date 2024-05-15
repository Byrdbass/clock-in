import './clock-in-btn.css'
import { useTimer } from '../../utils/TimerProvider';
import { useEntry } from '../../utils/EntryProvider';
import { getCurrentTime, getCurrentDate } from '../../helpers/getCurrentTime';

export default function ClockInBtn() {

    // WHEN BUTTON CLICKED RESET TIMERS
    const {resetTimers} = useTimer()
    const { entry, updateStartTime, updateStartDate } = useEntry()

    const handleStartTime = () => {
        let newStartTime = getCurrentTime();
        let newStartDate = getCurrentDate();
        updateStartTime(newStartTime)
        updateStartDate(newStartDate)
        resetTimers();
    }

    return(
        <>
            <button className='clock-in'
            onClick={handleStartTime}
            >UPDATE START TIME</button>
        </>
    )
}