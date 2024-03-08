import CountDown from "../CountDown/CountDown"
import CountUp2 from "../CountUp/CountUp2"

export default function Timers({ updateCountDownTimer }) {
    return (
        <>
            <CountUp2 />
            <CountDown updateCountDownTimer={updateCountDownTimer}/>
        </>
    )
}