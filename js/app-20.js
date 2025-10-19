const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const img = document.querySelector('.timer-display-wrapper .img');
const textEl = document.querySelector(".text");

let timer;
let imgTimer;
let timeLeft = 20 * 60 * 60 / 60; // 初期は20分
let isWorkTime = true; // trueなら作業中、falseなら休憩中

// 表示更新
function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  minutesEl.textContent = String(mins).padStart(2, '0');
  secondsEl.textContent = String(secs).padStart(2, '0');
}

// タイマー開始
function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        switchMode(); // 0になったらモード切替
      }
    }, 1000);
    startImageLoop();
  }
}

// finish sound function
function playFinishBeep(){
  const audio = new Audio('/custom-timer/目覚まし時計のアラーム.mp3');
  audio.play();
  audio.addEventListener("ended", () =>{
    startTimer();
  });
}

// start sound function
function playStartBeep() {
  const audio = new Audio('/custom-timer/sounds/カウントダウン電子音.mp3')
  audio.play();
  audio.addEventListener("ended", () =>{
    startTimer();
  });
}

// タイマー停止
function pauseTimer() {
  clearInterval(timer);
  timer = null;
  stopImageLoop();
}

// タイマーリセット
function resetTimer() {
  clearInterval(timer);
  clearInterval(imgTimer);
  timer = null;
  imgTimer = null;
  isWorkTime = true;
  timeLeft = 20 * 60 * 60 / 60;
  img.src = '/custom-timer/img/20-20-20-work1.png';
  textEl.textContent = "Working...";
  updateDisplay();
}

// モード切替（作業 ⇔ 休憩）
function switchMode() {
  if (isWorkTime) {
    // 作業 → 休憩
    isWorkTime = false;
    timeLeft = 20; // 20秒
    textEl.textContent = "Break...";
    textEl.classList.remove("working");
    textEl.classList.add("break");
    
    const audio = new Audio('/custom-timer/sounds/目覚まし時計のアラーム.mp3');
    audio.play();
    audio.addEventListener("ended", () =>{
      startTimer();
    });

  } else {
    // 休憩 → 作業
    isWorkTime = true;
    timeLeft = 20 * 60; // 20分
    textEl.textContent = "Working...";
    textEl.classList.remove("break");
    textEl.classList.add("working");
    const audio = new Audio('/custom-timer/sounds/カウントダウン電子音.mp3')
    audio.play();
    audio.addEventListener("ended", () =>{
      startTimer();
    });

  }
  updateDisplay();
}


// 作業用の画像リスト
const workImages = [
  '/custom-timer/img/20-20-20-work1.png',
  '/custom-timer/img/20-20-20-work2.png',
  '/custom-timer/img/20-20-20-work3.png'
];

// 休憩用の画像リスト
const breakImages = [
  '/custom-timer/img/20-20-20-rest1.png',
  '/custom-timer/img/20-20-20-rest2.png'
];

let imgIndex = 0;


// 画像切り替え
function changeImage() {
  if (isWorkTime) {
    // 作業中のループ
    imgIndex = (imgIndex + 1) % workImages.length;
    img.src = workImages[imgIndex];
  } else {
    // 休憩中のループ
    imgIndex = (imgIndex + 1) % breakImages.length;
    img.src = breakImages[imgIndex];
  }
}

// 画像ループ開始
function startImageLoop() {
  if (!imgTimer) {
    imgIndex = 0; // 切り替え開始時にリセット
    imgTimer = setInterval(changeImage, 1000);
  }
}
function stopImageLoop() {
  clearInterval(imgTimer);
  imgTimer = null;
}

// ボタンイベント
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// 初期表示
updateDisplay();




// ボタン効果音
function playClickSound() {
  const audio = new Audio('/custom-timer/sounds/決定ボタンを押す42.mp3');
  audio.currentTime = 0; // 連打しても頭から再生
  audio.play();
}

// Startボタン
startBtn.addEventListener("click", () => {
  playClickSound(); // クリック音

  audio.addEventListener("ended", () => {
    startTimer();
  });
});

// Pauseボタン
pauseBtn.addEventListener("click", () => {
  playClickSound(); // クリック音
  pauseTimer();
});

// Resetボタン
resetBtn.addEventListener("click", () => {
  playClickSound(); // クリック音
  resetTimer();
});
