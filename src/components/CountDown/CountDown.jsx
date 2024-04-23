import './count-down.css'
import { useEffect } from 'react'
import { useTimer } from '../../utils/TimerProvider';

export default function CountDown({ updateCountDownTimer }) {
    const { timers } = useTimer();

    return( 
        <div className="count-down-outer-div">
        <div className="remainingTimeText" >{timers.countDownTimer}</div>
        <div className="progressBarContainer">
            <div className="progressBar" ></div>
        </div>
    </div>
    )
}