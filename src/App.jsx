import { useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'
import { createTimeEntry } from './helpers/airtablePost'

import ClockInForm from './pages/ClockInForm/ClockInForm'
import { useTimer } from './utils/TimerProvider'
import { TimerProvider } from './utils/TimerProvider'
import DurationSlider from './components/DurationSlider/DurationSlider'


function App() {
  const params = new URLSearchParams(window.location.search);
  const [userName, setUserName] = useState(params.get('user'))
  const [hasError, setHasError] = useState(false)
  const [duration, setDuration] = useState(25);
  const [userRecordID, setUserRecordID] = useState(params.get('userRecordID'))

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  function getDerivedStateFromError() {
    return setHasError(true)
  }

  const intervalRef = useRef(null); // Ref to store the interval ID
  const setIntervalIdInParent = (id) => {
    intervalRef.current = id; // Function to update the ref with the interval ID
  };


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

  useEffect(() => {
  })

  return (
    <>
      <TimerProvider duration={duration}>
        <h1>Clock in for {userName}</h1>
        <DurationSlider
          duration={duration}
          setDuration={setDuration}
          handleDurationChange={handleDurationChange}
        />
        <ClockInForm
          duration={duration}
          setDuration={setDuration}
          userRecordID={userRecordID}
          setUserRecordID={setUserRecordID}
          handleDurationChange={handleDurationChange}
        />
      </TimerProvider>
    </>
  )
}

export default App
