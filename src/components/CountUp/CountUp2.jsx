import './count-up.css'
import { useTimer } from "../../utils/TimerProvider";

export default function CountUp2(){
    const { timers } = useTimer()

    return (
        <div className="outer-div">
            <div className="header">CURRENT DURATION</div>
            <div id="countUpTimer" className="timer-value">{timers.countUpTimer}</div>
        </div>
    );
}