import './clock-in-btn.css'
import { useEffect } from 'react';

export default function ClockInBtn({ handleStartTime }) {

    // WHEN BUTTON CLICKED RESET TIMERS
    const getCurrentTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        return timeString;
    };

    const updateStartTime = () => {
        handleStartTime(getCurrentTime);
    }

    return(
        <>
            <button className='clock-in'
            onClick={updateStartTime}
            >CLOCK IN</button>
        </>
    )
}