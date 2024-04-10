import './count-up.css'
import { useTimer } from "../../utils/TimerProvider";

export default function CountUp2() {
    const { timers } = useTimer()

    return (
        <>
            <div className="countUp-header">CURRENT DURATION</div>
            <div className="countUp-timer-value">{timers.countUpTimer}</div>
            <div className="countUp-border"></div>
        </>
    );
}