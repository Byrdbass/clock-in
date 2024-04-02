import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'

import ClockInForm from './pages/ClockInForm/ClockInForm'
import { TimerProvider } from './utils/TimerProvider'
import { useTimer } from './utils/TimerProvider'
import ModalConfirmation from './components/Modal-Confirmation/ModalConfirmation'
import Navbar from './components/Navbar/Navbar'
import AmountWorked from './components/AmountWorked/AmountWorked'
import TimeSheetHeader from './components/TimeSheetHeader/TimeSheetHeader'
import CountUp2 from './components/CountUp/CountUp2'
import DateInput from './components/StartDate/DateInput'
import StartTime from './components/StartTime/StartTime'
import ClockInBtn from './components/ClockInBtn/ClockInBtn'
import EndDate from './components/EndDate/EndDate'
import EndTime from './components/EndTime/EndTime'
import JobCodes from './components/JobCodes/JobCodes'
import Notes from './components/Notes/Notes'
import SubmitButton from './components/SubmitButton/SubmitButton'

import TimersHeader from './components/TimersHeader/TimersHeader'
import Timers from './components/Timers/Timers'
import DurationSlider from './components/DurationSlider/DurationSlider'
import DurationField from './components/DurationField/DurationField'
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
  const [startDate, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState();
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
  const handleEndDateData = (data) => {
    setEndDate(data)
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
          startTime={startDate}
          endTime={endTime}
          jobcode3={jobcode3}
          notes={notes}
          handleModalClose={handleModalClose}
        />
        <Navbar
          userRecordID={userRecordID}
        />
        <AmountWorked
          userRecordID={userRecordID}
        />
        <div className='entry-and-timers'>
          <div className='clock-in-container'>
            {/* <TimeSheetHeader /> */}
            <CountUp2 />
            <div className='start-container'>
              <DateInput
                handleDateData={handleDateData}
                date={date}
                setDate={setDate}
              />
              <StartTime
                handleStartTimeData={handleStartTimeData}
                startTime={startDate}
                setStartTime={setStartTime}
              />
              <ClockInBtn 
              />
            </div>
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

            <div className="end-container">
              <EndDate

                endDate={endDate}
              />
              <EndTime
                startTime={startDate}
                duration={duration}
                handleEndTimeData={handleEndTimeData}
                handleEndDateData={handleEndDateData}
                endTime={endTime}
                setEndTime={setEndTime}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            <SubmitButton
              setShowModal={setShowModal}
              userName={userName}
              userRecordID={userRecordID}
              startTime={startDate}
              endTime={endTime}
              duration={duration}
              date={date}
              jobcode3={jobcode3}
              projectRecordId={projectRecordId}
              notes={notes}
              setShowError={setShowError}
            />
            </div>
          </div>
          {/* <div className='timer-container'>
            <TimersHeader />
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
            <Timers />
          </div> */}

        </div>
      </TimerProvider>
    </>
  )
}

export default App
