import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'
import { EntryProvider } from './utils/EntryProvider'
import { TimerProvider } from './utils/TimerProvider'
import ModalConfirmation from './components/Modal-Confirmation/ModalConfirmation'
import Navbar from './components/Navbar/Navbar'
import AmountWorked from './components/AmountWorked/AmountWorked'
import OptTimer from './components/OptTimer/OptTimer'

//TODO - MAKE THIS A LINK TO MULTI ENTRY
import TimeSheetHeader from './components/TimeSheetHeader/TimeSheetHeader'
import CountUp2 from './components/CountUp/CountUp2'
import DateInput from './components/StartDate/DateInput'
import StartTime from './components/StartTime/StartTime'
import ClockInBtn from './components/ClockInBtn/ClockInBtn'
import EndDate from './components/EndDate/EndDate'
import EndTime from './components/EndTime/EndTime'
import UpdateEndTimeBtn from './components/UpdateEndTimeBtn/UpdateEndTimeBtn'
import JobCodes from './components/JobCodes/JobCodes'
import Notes from './components/Notes/Notes'
import SubmitButton from './components/SubmitButton/SubmitButton'

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

  //TODO DELETE DUPLICATE
  const getCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString('en-US', options);
    return timeString;
  };
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartTime] = useState(getCurrentTime()); //TODO DELETE
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState(null);
  const [jobcode3, setJobcode3] = useState('');
  const [taskNum, setTaskNum] = useState();
  const [notes, setNotes] = useState("");
  const [submittedRecordId, setSubmittedRecordId] = useState("")
  const [showError, setShowError] = useState(false)

  const [clockIn, setClockIn] = useState(0) //needed?
  const [userRecordID, setUserRecordID] = useState(params.get('userRecordID'))
  const handleModalClose = () => {
    setNotes("")
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
  // TODO: what can i do this this? 
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
    <EntryProvider >
      <ModalError
        showError={showError}
        date={date}
        notes={notes}
        handleModalErrorClose={handleModalErrorClose}
      />
      <TimerProvider duration={duration} setDuration={setDuration}>
        <ModalConfirmation
          showModal={showModal}
          userName={userName}
          date={date}
          duration={duration}
          startTime={startDate}
          endTime={endTime}
          jobcode3={jobcode3}
          setJobcode3={setJobcode3}
          notes={notes}
          submittedRecordId={submittedRecordId}
          handleModalClose={handleModalClose}
        />
        <Navbar
          userRecordID={userRecordID}
        />
        <div className="timer-work-outer-div">
          <AmountWorked
            userRecordID={userRecordID}
          />
          <OptTimer 
          duration={duration}
          endTime={endTime}
          setDuration={setDuration}
          />
        </div>
        <div className='entry-and-timers'>
          <div className='clock-in-container'>
            {/* <TimeSheetHeader /> */}
            <CountUp2 />
            <div className='start-container'>
              <DateInput />
              <StartTime />
              <ClockInBtn />
            </div>
            <div className="input-fields">
              <JobCodes
                projectRecordId={projectRecordId}
                setProjectRecordId={setProjectRecordId}
                jobcode3={jobcode3}
                setJobcode3={setJobcode3}
              />
              <Notes
                handleNotesData={handleNotesData}
                notes={notes}
                setNotes={setNotes}
              />
            </div>

            <div className="end-container">
              <EndDate
                endDate={endDate}
                endTime={endTime}
                duration={duration}
              />
              <EndTime
                startTime={startDate}
                duration={duration}
                setDuration={setDuration}
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
                endDate={endDate}
                endTime={endTime}
                duration={duration}
                date={date}
                jobcode3={jobcode3}
                projectRecordId={projectRecordId}
                notes={notes}
                setSubmittedRecordId={setSubmittedRecordId}
                setShowError={setShowError}
              />
            </div>
            < UpdateEndTimeBtn />
          </div>
          {/* <div className='timer-container'>
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
    </EntryProvider>
    </>
  )
}

export default App
