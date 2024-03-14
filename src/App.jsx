import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'

import ClockInForm from './pages/ClockInForm/ClockInForm'
import { TimerProvider } from './utils/TimerProvider'
import DurationSlider from './components/DurationSlider/DurationSlider'


function App() {
  const params = new URLSearchParams(window.location.search);
  const [userName, setUserName] = useState(params.get('user')
      //COMMENT OUT FOR PRODUCTION
      || "test"
  )
  const [hasError, setHasError] = useState(false)
  const [duration, setDuration] = useState(25);
  const [clockIn, setClockIn] = useState(0)
  const [userRecordID, setUserRecordID] = useState(params.get('userRecordID'))

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  function getDerivedStateFromError() {
    return setHasError(true)
  }

  useEffect(() => {
    const prefillDuration = params.get('prefill_Timesheet_Duration_Minutes');
    const prefillUserRecordID = params.get('userRecordID') 
    //COMMENT OUT FOR PRODUCTION
    || "recMhLRHRvxzjIHpn";
    if (prefillDuration) {
      setDuration(prefillDuration)
    }
    if (prefillUserRecordID) {
      setUserRecordID(prefillUserRecordID)
    }
  }, [])

  return (
    <>
      <TimerProvider duration={duration}>
        <h1>Clock in for {userName}</h1>
        <DurationSlider
          duration={duration}
          clockIn={clockIn}
          setDuration={setDuration}
          handleDurationChange={handleDurationChange}
        />
        <ClockInForm
          userName={userName}
          duration={duration}
          setDuration={setDuration}
          clockIn={clockIn}
          setClockIn={setClockIn}
          userRecordID={userRecordID}
          setUserRecordID={setUserRecordID}
          handleDurationChange={handleDurationChange}
        />
      </TimerProvider>
    </>
  )
}

export default App
