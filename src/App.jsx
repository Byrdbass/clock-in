import { useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'
import { createTimeEntry } from './helpers/airtablePost'

import Button from './components/Button/Button'
import Notes from './components/Notes/Notes'
import DateInput from './components/Date/DateInput'
import StartTime from './components/StartTime/StartTime'
import EndTime from './components/EndTime/EndTime'
import JobCodes from './components/JobCodes/JobCodes'
import TimeRemaining from './components/TimeRemaining/TimeRemaining'
import CountUp from './components/CountUp/CountUp'
import DurationSlider from './components/DurationSlider/DurationSlider'
import DurationField from './components/DurationField/DurationField'

function App() {

  const [hasError, setHasError] = useState(false)

  function getDerivedStateFromError() {
    return setHasError(true)
  }

  const intervalRef = useRef(null); // Ref to store the interval ID
  const setIntervalIdInParent = (id) => {
    intervalRef.current = id; // Function to update the ref with the interval ID
  };

  const params = new URLSearchParams(window.location.search);
  // console.log(params)
  const [userName, setUserName] = useState(params.get('user'))
  const [userRecordID, setUserRecordID] = useState("")
  const [projectRecordId, setProjectRecordId] = useState('')
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [endTime, setEndTime] = useState("");
  const [countUpTimer, setCountUpTimer] = useState('00:00:00');
  const [resetCount, setResetCount] = useState(false);
  const [remainingTimeText, setRemainingTimeText] = useState('--:--');
  const [date, setDate] = useState('');
  const [jobcode3, setJobcode3] = useState('');
  const [notes, setNotes] = useState("");
  const [teammateRecords, setTeammateRecords] = useState(null);

  const submitTimeEntry = createTimeEntry
  
  useEffect(() => {
    const prefillDuration = params.get('prefill_Timesheet_Duration_Minutes');
    const prefillUserRecordID = params.get('userRecordID');
    if (prefillDuration) {
      setDuration(prefillDuration)
    }
    if (prefillUserRecordID) {
      setUserRecordID(prefillUserRecordID)
    }
  }, [])
  
  
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
  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value)); 
  };

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
    setDuration(30)
    setResetCount(true)
  };

  //handle enter key on notes submission
  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event)
    }
  }

  return (
    <>
      <h1>Clock in for {userName}</h1>
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
          <CountUp
            countUpTimer={countUpTimer}
            setCountUpTimer={setCountUpTimer}
            resetCount={resetCount}
            />

          <TimeRemaining
            remainingTimeText={remainingTimeText}
            setRemainingTimeText={setRemainingTimeText}
            duration={duration}
          />
          <DurationSlider 
          duration={duration}
          setDuration={setDuration}
          handleDurationChange={handleDurationChange}
          />

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

export default App
