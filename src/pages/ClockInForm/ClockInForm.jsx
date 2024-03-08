import "../../App.css"
import { useState, useEffect, useRef } from 'react'
import Button from "../../components/Button/Button"
import Notes from "../../components/Notes/Notes"
import DateInput from "../../components/Date/DateInput"
import StartTime from "../../components/StartTime/StartTime"
import EndTime from "../../components/EndTime/EndTime"
import JobCodes from "../../components/JobCodes/JobCodes"
import DurationSlider from "../../components/DurationSlider/DurationSlider"
import DurationField from "../../components/DurationField/DurationField"
import Timers from "../../components/Timers/Timers"

import { createTimeEntry } from "../../helpers/airtablePost"
import { useTimer } from "../../utils/TimerProvider"

export default function ClockInForm({ duration, setDuration, userRecordID, setUserRecordID, handleDurationChange}) {
    const params = new URLSearchParams(window.location.search);

    const [projectRecordId, setProjectRecordId] = useState('')
    const [date, setDate] = useState('');
    const [jobcode3, setJobcode3] = useState('');
    const [notes, setNotes] = useState("");
    const [teammateRecords, setTeammateRecords] = useState(null);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState("");
    const [countUpTimer, setCountUpTimer] = useState('00:00:00');
    const [resetCount, setResetCount] = useState(false);
    const [remainingTimeText, setRemainingTimeText] = useState('--:--');

    const submitTimeEntry = createTimeEntry
    const { updateCountDownTimer } = useTimer()

    const handleStartTimeData = (data) => {
        setStartTime(data)
      }
      const handleEndTimeData = (data) => {
        setEndTime(data)
      }
      const handleDateData = (data) => {
        setDate(data)
      }
      const handleNotesData = (data) => {
        setNotes(data)
      }

    
      const { resetTimers } = useTimer()

    const handleSubmit = (event) => {
        event.preventDefault()
        submitTimeEntry(notes, date, startTime, jobcode3, userRecordID, projectRecordId)
        setNotes("")
        setDate("")
        const getCurrentTime = () => {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          return `${hours}:${minutes}`;
        };
        const getTodaysDate = () => {
          const today = new Date();
          return today.toISOString().split('T')[0];
        };
        handleDateData(getTodaysDate())
        setDate(getTodaysDate)
        setStartTime(getCurrentTime())
        handleStartTimeData(getCurrentTime())
        setDuration(25)
        setResetCount(true)
        resetTimers()
      };

      const handleEnterPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          handleSubmit(event)
        }
      }


    return (
        <>
            <form action="submit" onSubmit={handleSubmit} onKeyDown={handleEnterPress}>
                <div className="timerContainer">
                    <StartTime
                        handleStartTimeData={handleStartTimeData}
                        startTime={startTime}
                        setStartTime={setStartTime}
                    />
                    <EndTime
                        startTime={startTime}
                        duration={duration}
                        handleEndTimeData={handleEndTimeData}
                        endTime={endTime}
                        setEndTime={setEndTime}
                    />
                        <Timers updateCountDownTimer={updateCountDownTimer}/>
                    {/* <CountUp
            countUpTimer={countUpTimer}
            setCountUpTimer={setCountUpTimer}
            resetCount={resetCount}
          /> */}
                    {/* <TimeRemaining
            remainingTimeText={remainingTimeText}
            setRemainingTimeText={setRemainingTimeText}
            duration={duration}
            /> */}

                    <div className="formSection" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
                        <DurationField
                            duration={duration}
                            setDuration={setDuration}
                            handleDurationChange={handleDurationChange}
                        />
                        <DateInput
                            handleDateData={handleDateData}
                            date={date}
                            setDate={setDate}
                        />
                        <JobCodes
                            projectRecordId={projectRecordId}
                            setProjectRecordId={setProjectRecordId}
                            jobcode3={jobcode3}
                            setJobcode3={setJobcode3}
                            userRecordID={userRecordID}
                        />
                        <Notes
                            handleNotesData={handleNotesData}
                            notes={notes}
                            setNotes={setNotes}
                        />
                        <Button />
                    </div>
                </div>
            </form>
        </>
    )
}