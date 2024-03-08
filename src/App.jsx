import { useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'
import { createTimeEntry } from './helpers/airtablePost'

import ClockInForm from './Pages/ClockInForm/ClockInForm'
import { useTimer } from './utils/TimerProvider'
import { TimerProvider } from './utils/TimerProvider'


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
  const [userRecordID, setUserRecordID] = useState(
    "recMhLRHRvxzjIHpn")
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

  const { resetTimers } = useTimer()



  //handle enter key on notes submission
  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event)
    }
  }

  return (
    <>
      <TimerProvider duration={duration}>
        <h1>Clock in for {userName}</h1>
        <ClockInForm
        />
      </TimerProvider>
    </>
  )
}

export default App
