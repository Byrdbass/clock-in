import CountDown from "../CountDown/CountDown"
import CountUp2 from "../CountUp/CountUp2"
import { useTimer } from "../../utils/TimerProvider"


export default function Timers({  }) {

    
  //context hook for timers
  const { updateCountDownTimer } = useTimer()
    return (
        <>
            {/* <CountUp2 /> */}
            <CountDown updateCountDownTimer={updateCountDownTimer}/>
        </>
    )
}