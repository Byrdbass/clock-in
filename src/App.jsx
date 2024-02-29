import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'
import { createTimeEntry } from './helpers/airtablePost'
import { getTeammateRecord } from './helpers/airTableGetJobcodes'
import Button from './components/Button/Button'
import Notes from './components/Notes/Notes'
import DateInput from './components/Date/DateInput'
import StartTime from './components/StartTime/StartTime'
import EndTime from './components/EndTime/EndTime'
import JobCodes from './components/JobCodes/JobCodes'

function App() {

  const [hasError, setHasError] = useState(false)

  function getDerivedStateFromError() {
    return setHasError(true)
  }
  const params = new URLSearchParams(window.location.search);
  // console.log(params)
  const [userName, setUserName] = useState(params.get('user'))
  const [userRecordID, setUserRecordID] = useState(
    "recMhLRHRvxzjIHpn")
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [endTime, setEndTime] = useState("");
  const [countUpTimer, setCountUpTimer] = useState('00:00');
  const [remainingTimeText, setRemainingTimeText] = useState('--:--');
  const [date, setDate] = useState('');
  const [jobcode3, setJobcode3] = useState('');
  const [notes, setNotes] = useState("");
  const [teammateRecords, setTeammateRecords] = useState(null);

  const submitTimeEntry = createTimeEntry
  const handleStartTimeData = (data) => {
    setStartTime(data)
  }
  const handleEndTimeData = (data) => {
    setEndTime(data)
  }
  //TODO: move to child component
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  useEffect(() => {
    const prefillDuration = params.get('prefill_Timesheet_Duration_Minutes');
    const prefillUserRecordID = params.get('userRecordID');
    if (prefillDuration) {
      setDuration(prefillDuration)
    }
    if (prefillUserRecordID){
      setUserRecordID(prefillUserRecordID)
    }
  }, [])
  
  useEffect(() => {
    const fetchTeammateRecord = async () => {
      try {
          // getRecordFields()
            const recordFields = await getTeammateRecord(userRecordID);
            console.log(recordFields); // Use recordId as needed
        } catch (error) {
            console.error("Failed to fetch teammate record:", error);
            // Handle error (e.g., update state to show an error message)
        }
    };
    
    if (userRecordID) {
      fetchTeammateRecord();
    }
  }, [userRecordID]);
  const handleDateData = (data) => {
    setDate(data)
  }
  const handleNotesData = (data) => {
    setNotes(data)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitTimeEntry(notes, date, startTime, userRecordID)
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

          <div className="timerSection">
            <div className="header">On the Clock</div>
            <div id="countUpTimer" className="timer-value">{countUpTimer}</div>
          </div>
          <div className="timerSection">
            <div className="header">Time Remaining</div>
            <div className="remainingTimeText" id="remainingTimeText">{remainingTimeText}</div>
            <div className="progressBarContainer">
              <div className="progressBar" id="progressBar"></div>
            </div>
          </div>
          <div className="inputSection" style={{ width: '100%', textAlign: 'center' }}>
            <div className="header">Adjust Duration</div>
            <input
              type="range"
              id="durationSlider"
              min="1"
              max="240"
              value={duration}
              onChange={handleDurationChange}
              style={{ width: '60%' }}
            />
            <div className="sliderValue" id="sliderValue">{duration} Minutes</div>
          </div>
          <div className="formSection" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
            <div className="inputSection">
              <div className="header">Duration</div>
              <input
                type="text"
                id="durationField"
                placeholder="Duration (minutes)"
                style={{ fontSize: '1em' }}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <DateInput
              handleDateData={handleDateData}
              date={date}
              setDate={setDate}
            />
            <JobCodes 
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
