import './clock-in-btn.css'
import { useEffect } from 'react';
import { useTimer } from '../../utils/TimerProvider';

export default function ClockInBtn({ handleStartTime }) {

    // WHEN BUTTON CLICKED RESET TIMERS
    const {resetTimers} = useTimer()
    const getCurrentTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        return timeString;
    };

    const updateStartTime = () => {
        handleStartTime(getCurrentTime);
        resetTimers();
    }

    return(
        <>
            <button className='clock-in'
            onClick={updateStartTime}
            >CLOCK IN</button>
        </>
    )
}