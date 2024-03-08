import "../../App.css";
import { useEffect, useState } from 'react';
import { useTimer } from "../../utils/TimerProvider";

export default function CountUp2(){
    const { timers } = useTimer()

    return (
        <div className="timerSection">
            <div className="header">Elapsed Time</div>
            <div id="countUpTimer" className="timer-value">{timers.countUpTimer}</div>
        </div>
    );
}