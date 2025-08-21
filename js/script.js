let timerInterval;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutes');

function updateDisplay() {
  const min = Math.floor(remainingTime / 60);
  const sec = remainingTime % 60;
  timerDisplay.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function startTimer() {
  if (remainingTime <= 0) {
    const inputMinutes = parseInt(minutesInput.value);
    if (isNaN(inputMinutes) || inputMinutes <= 0) return;
    remainingTime = inputMinutes * 60;
  }

  startBtn.disabled = true;

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      startBtn.disabled = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  updateDisplay();
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
updateDisplay();
