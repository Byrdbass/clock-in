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
 
    </>
  )
}