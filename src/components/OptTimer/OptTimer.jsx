import './opt-timer.css'
import { useState, useEffect } from "react";
import DurationField from '../DurationField/DurationField';
import CountDown from '../CountDown/CountDown';

export default function OptTimer({duration, endTime, setDuration}) {
    const [timerModal, setTimerModal] = useState("optTimer-outer-div")
    const [showTimer, setShowTimer] = useState(false)
    const handleTimerOpen = () => {
        setTimerModal(prevOption => prevOption === 'optTimer-outer-div' ? 'optTimer-outer-div-open' : 'optTimer-outer-div')
        setShowTimer(prevOption => prevOption === false ? true : false)
    }

    return (
        <>
            <div className={`${timerModal}`}>
                <div className="menu-icon" onClick={handleTimerOpen}></div>
                <div className='optTimer-header'>OPTIONAL TIMER</div>
                {showTimer ? <CountDown duration={duration} endTime={endTime} setDuration={setDuration}/> : null}
            </div>
        </>
    )
}