  const durationField = document.getElementById('durationField');
  const durationSlider = document.getElementById('durationSlider');
  const sliderValueDisplay = document.getElementById('sliderValue'); // Text display for the slider value
  const progressBar = document.getElementById('progressBar');
  const endTimeDisplay = document.getElementById('endTime'); // Display clock for the calculated end time
  const countdownTimerDisplay = document.getElementById('remainingTimeText'); // "Time Remaining" display


  // Update function for end time, progress bar, slider text, and remaining time
  function updateUI() {
      const startTime = new Date(`${dateField.value}T${startTimeInput.value}`);
      const durationMinutes = parseInt(durationField.value, 10);
      const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

      // Update the end time display
      endTimeDisplay.textContent = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      // Update the slider value text
      sliderValueDisplay.textContent = `${durationField.value} Minutes`;

      // Calculate and update remaining time
      const remainingTime = endTime - new Date();
      if (remainingTime > 0) {
          const hours = Math.floor(remainingTime / 3600000);
          const minutes = Math.floor((remainingTime % 3600000) / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          countdownTimerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
          countdownTimerDisplay.textContent = "00:00:00";
      }

      // Recalculate and update the progress bar
      const elapsed = new Date() - startTime;
      const totalDuration = endTime - startTime;
      const percentageElapsed = (elapsed / totalDuration) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, percentageElapsed))}%`;
  }

  // Event listeners for changes
  startTimeInput.addEventListener('change', updateUI);
  durationField.addEventListener('input', () => {
      durationSlider.value = durationField.value; // Sync slider with manual input
      updateUI();
  });
  durationSlider.addEventListener('input', () => {
      durationField.value = durationSlider.value; // Sync field with slider adjustment
      updateUI();
  });

  // Initial setup
  prefillInputs();
  updateUI();

  // Continuous update for the progress bar and remaining time to reflect real-time changes
  setInterval(updateUI, 1000);
})