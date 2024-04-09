import './opt-timer.css'
import { useState, useEffect } from "react";


export default function OptTimer() {
    const [timerModal, setTimerModal] = useState("optTimer-outer-div")
    const handleTimerOpen = () => {
        setTimerModal(prevOption => prevOption === 'optTimer-outer-div' ? 'optTimer-outer-div-open' : 'optTimer-outer-div')
    }

    return (
        <>
            <div className={`${timerModal}`}>
                <div className="menu-icon" onClick={handleTimerOpen}></div>
                <div className='optTimer-header'>OPTIONAL TIMER</div>
            </div>
        </>
    )
}