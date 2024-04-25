import './alarm.css'
import useSound from "use-sound";
import { useEffect, useState } from "react";
import { useTimer } from "../../utils/TimerProvider";

import simpleNotif from "../../assets/alarm-sounds/simple-notification-152054.mp3"



export default function Alarm({totalDuration}) {
    const [play, { stop }] = useSound(simpleNotif)
    const { timers } = useTimer();
    const [isChecked, setIsChecked] = useState(false);
    
    useEffect(() => {
        let playCount = 3

        const playAlarm = () => {
            if (playCount > 0) {
                play()
                playCount--
                setTimeout(playAlarm, 3000)
            }
        }

        if (totalDuration && isChecked && timers.countDownTimer === "00:00:00") {
            playAlarm();
        }
  // Clean up to stop the sound when the component unmounts or conditions change
        return () => {
            stop()
            clearTimeout(playAlarm)
        }
    }, [isChecked, timers.countDownTimer, play, stop]);

    return (
        <div className="alarm-outer-div">
            <label className="alarm-label">
                Alarm
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
            </label>
        </div>
    )
}