import "../../App.css"
import { useState } from 'react'
import SubmitButton from "../../components/SubmitButton/SubmitButton"
import Notes from "../../components/Notes/Notes"
import DateInput from "../../components/Date/DateInput"
import StartTime from "../../components/StartTime/StartTime"
import EndTime from "../../components/EndTime/EndTime"
import JobCodes from "../../components/JobCodes/JobCodes"
import DurationSlider from "../../components/DurationSlider/DurationSlider"
import DurationField from "../../components/DurationField/DurationField"
import Timers from "../../components/Timers/Timers"
import ModalConfirmation from "../../components/Modal-Confirmation/ModalConfirmation"

import { createTimeEntry } from "../../helpers/airtablePost"
import { useTimer } from "../../utils/TimerProvider"

export default function ClockInForm({ 
  duration, 
  setDuration, 
  clockIn, 
  setClockIn, 
  userName,
  userRecordID, 
  setUserRecordID, 
  handleDurationChange }) {
  const params = new URLSearchParams(window.location.search);

  const [projectRecordId, setProjectRecordId] = useState('')
  const [date, setDate] = useState('');
  const [jobcode3, setJobcode3] = useState('');
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  //post helper function for Airtable
  const submitTimeEntry = createTimeEntry
  //context hook for timers
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
  const handleModalClose = () => {
    return setShowModal(false)
  }

  const { resetTimers } = useTimer()




  return (
    <>
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
      <form action="submit">
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
          <Timers updateCountDownTimer={updateCountDownTimer} />
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
            <SubmitButton 
            />
          </div>
        </div>
      </form>
    </>
  )
}