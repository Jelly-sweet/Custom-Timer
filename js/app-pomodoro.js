const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const img = document.querySelector('.pomodoro-img');
const textEl = document.querySelector(".text");
const donut = document.querySelector('.donut-marker');

let timer;
let timeLeft = 25 * 60;
let isWorkTime = true;

// --- ドーナツ回転制御 ---
let donutRotation = 0;
let donutAnim = null;

function rotateDonut() {
  if (!isWorkTime) return; // 休憩中は動かさない

  // 25分（1500秒）で1周するための角速度
  const degreesPerSecond = 360 / 6000; 
  const degreesPerFrame = degreesPerSecond / 60; // 1秒=約60フレーム

  donutRotation += degreesPerFrame;

  // 中心を基準に半径60pxで回転（1時の位置からスタート）
  const radius = 70; // ← 円の大きさ
  const radian = (Math.PI / 180) * donutRotation;

  const x = Math.cos(radian - Math.PI / 3) * radius; // -π/3 で「1時の位置」スタート
  const y = Math.sin(radian - Math.PI / 3) * radius;

  donut.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

  donutAnim = requestAnimationFrame(rotateDonut);
}

function stopDonutRotation() {
  cancelAnimationFrame(donutAnim);
  donutAnim = null;
}

function resetDonutPosition() {
  donutRotation = 0;
  const radius = 60;
  const x = Math.cos(-Math.PI / 3) * radius; // 初期位置（1時）
  const y = Math.sin(-Math.PI / 3) * radius;
  donut.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

// --- 画像ループ制御 ---
const workImages = ['/custom-timer/img/pomodoro1.png','/custom-timer/img/pomodoro2.png'];
const breakImages = ['/custom-timer/img/pomodoro-finish1.png','/custom-timer/img/pomodoro-finish2.png'];

let imgIndex = 0;
let imgTimer = null;

function changeImage() {
  if (isWorkTime) {
    imgIndex = (imgIndex + 1) % workImages.length;
    img.src = workImages[imgIndex];
  } else {
    imgIndex = (imgIndex + 1) % breakImages.length;
    img.src = breakImages[imgIndex];
  }
}

function startImageLoop() {
  if (!imgTimer) {
    imgIndex = 0;
    img.src = isWorkTime ? workImages[0] : breakImages[0];
    imgTimer = setInterval(changeImage, 1000);
  }
}
function stopImageLoop() {
  clearInterval(imgTimer);
  imgTimer = null;
  imgIndex = 0;
}

// --- タイマー制御 ---
function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  minutesEl.textContent = String(mins).padStart(2, '0');
  secondsEl.textContent = String(secs).padStart(2, '0');
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        switchMode();
      }
    }, 1000);
    startImageLoop();
    rotateDonut(); // ★ドーナツ回転開始
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  stopImageLoop();
  stopDonutRotation(); // ★ドーナツ停止
}

function resetTimer() {
  clearInterval(timer);
  stopImageLoop();
  stopDonutRotation(); // ★ドーナツ停止
  timer = null;
  isWorkTime = true;
  timeLeft = 25 * 60;
  img.src = workImages[0];
  textEl.textContent = "Focus";
  donut.style.display = "block";
  donut.style.transform = "translate(10%, -100%) rotate(0deg)";
  resetDonutPosition();
  updateDisplay();
}

function switchMode() {
  if (isWorkTime) {
    isWorkTime = false;
    timeLeft = 5 * 60;
    textEl.textContent = "Break!";
    donut.style.display = "none";
    stopDonutRotation();

    const audio = new Audio('/custom-timer/sounds/目覚まし時計のアラーム.mp3');
    audio.play();
    audio.addEventListener("ended", () =>{
      startTimer();
    });

  } else {
    isWorkTime = true;
    timeLeft = 25 * 60;
    textEl.textContent = "Focus";
    donut.style.display = "block";
    const audio = new Audio('/custom-timer/sounds/カウントダウン電子音.mp3')
    audio.play();
    audio.addEventListener("ended", () =>{
      startTimer();
    });

    resetDonutPosition();
    rotateDonut();
  }
  updateDisplay();
}

// --- ボタン音 ---
function playClickSound() {
  const audio = new Audio('/custom-timer/sounds/決定ボタンを押す42.mp3');
  audio.currentTime = 0;
  audio.play();
}

// --- イベント登録 ---
startBtn.addEventListener("click", () => { playClickSound(); startTimer(); });
pauseBtn.addEventListener("click", () => { playClickSound(); pauseTimer(); });
resetBtn.addEventListener("click", () => { playClickSound(); resetTimer(); });

// --- 初期表示 ---
updateDisplay();
resetDonutPosition();
