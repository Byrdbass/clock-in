// import '../../App.css'
import './startTime.css'
import { useEffect } from 'react';
import { useEntry } from '../../utils/EntryProvider';

export default function StartTime() {
    
    const { entry, updateStartTime, updateDuration } = useEntry();

    useEffect(() => {
        if (entry.startDateTime) {
            updateDuration(entry.startDateTime, entry.endDateTime);
        }
    }, [entry.startDateTime]);

    const handleStartTime = (e) => {
        updateStartTime(e.target.value)
    }


    return (
        <div className="startTime-outer-div">
            <input
                type="time"
                className="startTimeInput"
                value={entry.startTime}
                onChange={handleStartTime}
                style={{
                    border: 'none',
                    backgroundColor: 'inherit',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.94px',
                    width: '6.1rem'
                }}
            />
            <span className="clock-icon"></span>
        </div>
    )
}