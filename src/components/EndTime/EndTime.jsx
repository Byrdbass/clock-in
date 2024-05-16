import './endTime.css'
import clockIcon from '../../assets/date-time-icons/clock-24px-simple.png'
import { useEffect } from 'react';
import { useTimer } from '../../utils/TimerProvider';
import { useEntry } from '../../utils/EntryProvider';

export default function EndTime() {
    
    const { entry, updateEndTime, updateDuration } = useEntry();
    const { setCountDownTime } = useTimer();

    useEffect(() => {
        if (entry.endDateTime) {
            updateDuration(entry.startDateTime, entry.endDateTime);
        }
    }, [entry.endDateTime]);

    const handleEndTime = (e) => {
        //TODO: Timer used to be set here
        // add the option in a button to coordinate end time with countdown timer
        updateEndTime(e.target.value)
        console.log("in endTime", entry.endDateTime, e.target.value)
    }

    return (
        <div className="endTime-outer-div">
            <input
                type="time"
                className="endTimeInput"
                value={entry.endTime}
                onChange={handleEndTime}
                style={{
                    border: 'none',
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    height: '20px',
                    width: '6.1rem',
                    // color: 'black',
                    // zIndex: '1'
                }}
            />
            {/* TODO: add spinning icon back! */}
            {/* <div className="endTime-icon-div"></div> */}
        </div>
    )
}