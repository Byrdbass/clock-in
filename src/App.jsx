import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' - public folder
import './App.css'

function App() {
  const [hasError, setHasError] = useState(false)

  function getDerivedStateFromError() {
    return setHasError(true)
  }
  const params = new URLSearchParams(window.location.search);
  console.log(params)
  const [userName, setUserName] = useState(params.get("user"))
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('00:00');
  const [countUpTimer, setCountUpTimer] = useState('00:00');
  const [remainingTimeText, setRemainingTimeText] = useState('--:--');
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState('');
  const [jobcode3, setJobcode3] = useState('');
  const [notes, setNotes] = useState('');

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    // Additional logic to adjust other time-related states
  };

  const handleSubmit = () => {
    // Logic to process the form submission
    console.log('Submitting timesheet');
  };

  

  // document.addEventListener("DOMContentLoaded", function () {
  //   const params = new URLSearchParams(window.location.search);
  //   const dateField = document.getElementById('dateField');
  //   const startTimeInput = document.getElementById('startTimeInput');
  //   const durationField = document.getElementById('durationField');
  //   const durationSlider = document.getElementById('durationSlider');
  //   const sliderValueDisplay = document.getElementById('sliderValue'); // Text display for the slider value
  //   const progressBar = document.getElementById('progressBar');
  //   const endTimeDisplay = document.getElementById('endTime'); // Display clock for the calculated end time
  //   const countdownTimerDisplay = document.getElementById('remainingTimeText'); // "Time Remaining" display

  //   // Prefill function with URL parameters
  //   function prefillInputs() {
  //       const prefillDate = params.get('prefill_Timesheet_Entry_Date');
  //       const prefillStartTime = params.get('prefill_Timesheet_Start_Time');
  //       const prefillDuration = params.get('prefill_Timesheet_Duration_Minutes');

  //       if (prefillDate) {
  //           dateField.value = prefillDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2');
  //       }
  //       if (prefillStartTime) {
  //           startTimeInput.value = prefillStartTime.substring(0, 5); // Ensure HH:MM format
  //       }
  //       if (prefillDuration) {
  //           durationField.value = prefillDuration;
  //           durationSlider.value = prefillDuration;
  //           sliderValueDisplay.textContent = `${prefillDuration} Minutes`;
  //       }
  //   }

  //   // Update function for end time, progress bar, slider text, and remaining time
  //   function updateUI() {
  //       const startTime = new Date(`${dateField.value}T${startTimeInput.value}`);
  //       const durationMinutes = parseInt(durationField.value, 10);
  //       const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

  //       // Update the end time display
  //       endTimeDisplay.textContent = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  //       // Update the slider value text
  //       sliderValueDisplay.textContent = `${durationField.value} Minutes`;

  //       // Calculate and update remaining time
  //       const remainingTime = endTime - new Date();
  //       if (remainingTime > 0) {
  //           const hours = Math.floor(remainingTime / 3600000);
  //           const minutes = Math.floor((remainingTime % 3600000) / 60000);
  //           const seconds = Math.floor((remainingTime % 60000) / 1000);
  //           countdownTimerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  //       } else {
  //           countdownTimerDisplay.textContent = "00:00:00";
  //       }

  //       // Recalculate and update the progress bar
  //       const elapsed = new Date() - startTime;
  //       const totalDuration = endTime - startTime;
  //       const percentageElapsed = (elapsed / totalDuration) * 100;
  //       progressBar.style.width = `${Math.min(100, Math.max(0, percentageElapsed))}%`;
  //   }

  //   // Event listeners for changes
  //   startTimeInput.addEventListener('change', updateUI);
  //   durationField.addEventListener('input', () => {
  //       durationSlider.value = durationField.value; // Sync slider with manual input
  //       updateUI();
  //   });
  //   durationSlider.addEventListener('input', () => {
  //       durationField.value = durationSlider.value; // Sync field with slider adjustment
  //       updateUI();
  //   });

  //   // Initial setup
  //   prefillInputs();
  //   updateUI();

  //   // Continuous update for the progress bar and remaining time to reflect real-time changes
  //   setInterval(updateUI, 1000);
  // })
  return (
    <>
    <form action="submit">
      <h1>Hello {userName}</h1>
    <div className="timerContainer">
      <div className="timerSection">
        <div className="header">Start Time</div>
        <input
          type="time"
          className="editableTime startTimeInput"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="timerSection">
        <div className="header">End Time</div>
        <div id="endTime" className="timer-value">{endTime}</div>
      </div>
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
        <div className="inputSection">
          <div className="header">Date</div>
          <input
            type="date"
            id="dateField"
            style={{ fontSize: '1em' }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="inputSection">
          <div className="header">Jobcode3</div>
          <input
            type="text"
            id="jobcode3Field"
            placeholder="Jobcode3"
            style={{ fontSize: '1em' }}
            value={jobcode3}
            onChange={(e) => setJobcode3(e.target.value)}
          />
        </div>
        <div className="inputSection" style={{ flexBasis: '100%' }}>
          <div className="header">Notes</div>
          <textarea
            id="notesField"
            placeholder="Enter notes here"
            style={{ height: '100px', fontSize: '1em' }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="inputSection" style={{ flexBasis: '100%', textAlign: 'center' }}>
          <button
            id="submitTimesheet"
            style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={handleSubmit}
          >
            Submit Timesheet
          </button>
        </div>
      </div>
    </div>

    </form>
    </>
  )
}

export default App
