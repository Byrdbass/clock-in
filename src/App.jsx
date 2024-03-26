import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'

import ClockInForm from './pages/ClockInForm/ClockInForm'
import { TimerProvider } from './utils/TimerProvider'
import { useTimer } from './utils/TimerProvider'
import ModalConfirmation from './components/Modal-Confirmation/ModalConfirmation'
import StartTime from './components/StartTime/StartTime'
import EndTime from './components/EndTime/EndTime'
import Timers from './components/Timers/Timers'
import DurationSlider from './components/DurationSlider/DurationSlider'
import DurationField from './components/DurationField/DurationField'
import DateInput from './components/Date/DateInput'
import JobCodes from './components/JobCodes/JobCodes'
import Notes from './components/Notes/Notes'
import SubmitButton from './components/SubmitButton/SubmitButton'
import ModalError from './components/Modal-Error/ModalError'



function App() {

  const params = new URLSearchParams(window.location.search);
  const [userName, setUserName] = useState(params.get('user')
    //COMMENT OUT FOR PRODUCTION
    || "Test User"
  )
  const [projectRecordId, setProjectRecordId] = useState('')
  // const [hasError, setHasError] = useState(false)

  const getCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString('en-US', options);
    return timeString;
};
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState(25);
  const [jobcode3, setJobcode3] = useState('');
  const [notes, setNotes] = useState("");
  const [showError, setShowError] = useState(false)

  const [clockIn, setClockIn] = useState(0) //needed?
  const [userRecordID, setUserRecordID] = useState(params.get('userRecordID'))


  const handleModalClose = () => {
    return setShowModal(false)
  }
  const handleStartTimeData = (data) => {
    setStartTime(data)
  }
  const handleEndTimeData = (data) => {
    setEndTime(data)
  }
  const handleDateData = (data) => {
    setDate(data)
  }
  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };
  const handleNotesData = (data) => {
    setNotes(data)
  }
  const handleModalErrorClose = () => {
    return setShowError(false)
  }
  // function getDerivedStateFromError() {
  //   return setHasError(true)
  // }


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
      <ModalError 
      showError={showError}
      date={date}
      notes={notes}
      handleModalErrorClose={handleModalErrorClose}
      />
      <TimerProvider duration={duration}>
        <ModalConfirmation
          showModal={showModal}
          userName={userName}
          date={date}
          duration={duration}
          startTime={startTime}
          endTime={endTime}
          jobcode3={jobcode3}
          notes={notes}
          handleModalClose={handleModalClose}
        />
        <div className='timerContainer'>
          <h1 className='user-name'>Clock in for {userName}</h1>
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
          <Timers />
          <div className='form-section'>
          <DurationSlider
            duration={duration}
            clockIn={clockIn}
            setDuration={setDuration}
            handleDurationChange={handleDurationChange}
          />
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
          </div>
          <SubmitButton
          setShowModal={setShowModal}
          userName={userName}
          userRecordID={userRecordID}
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          date={date}
          jobcode3={jobcode3}
          projectRecordId={projectRecordId}
          notes={notes}
          setShowError={setShowError}
          />
        </div>
      </TimerProvider>
    </>
  )
}

export default App
