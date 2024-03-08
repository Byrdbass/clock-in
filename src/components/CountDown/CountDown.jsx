import '../../App.css'

import { useEffect } from 'react'
import { useTimer } from '../../utils/TimerProvider';

export default function CountDown({ updateCountDownTimer }) {
    const { timers } = useTimer();

    return( 
        <div className="timerSection">
        <div className="header">Time Remaining</div>
        <div className="remainingTimeText" id="remainingTimeText">{timers.countDownTimer}</div>
        <div className="progressBarContainer">
            <div className="progressBar" id="progressBar"></div>
        </div>
    </div>
    )
}