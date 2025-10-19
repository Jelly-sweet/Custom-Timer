const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const img = document.querySelector('.timer-display-wrapper .img');
const textEl = document.querySelector(".text");

let timer;
let imgTimer;
let timeLeft = 15 * 60 ;
let isRunning = false; // タイマー状態管理

// 表示更新
function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    minutesEl.textContent = String(mins).padStart(2, '0');
    secondsEl.textContent = String(secs).padStart(2, '0');
}

// タイマー開始
function startTimer() {
    if (!timer && timeLeft > 0) {
        isRunning = true;
        timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            isRunning = false;
            textEl.textContent = "Finish!";
            playFinishBeep();
            startFinishImageLoop();
        }
        }, 1000);
        startImageLoop();
    }
}

// タイマー停止
function pauseTimer() {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    stopImageLoop();
}

// タイマーリセット
function resetTimer() {
    clearInterval(timer);
    clearInterval(imgTimer);
    timer = null;
    imgTimer = null;
    isRunning = false;
    timeLeft = 15 * 60; // 15分
    img.src = '../img/Stretch1.png';
    textEl.textContent = "Stretching...";
    updateDisplay();
}

// --- サウンド ---
function playFinishBeep(){
    const audio = new Audio('../sounds/目覚まし時計のアラーム.mp3');
    audio.play();
}

function playClickSound() {
    const audio = new Audio('../sounds/決定ボタンを押す42.mp3');
    audio.currentTime = 0;
    audio.play();
}

// --- 画像関連 ---
const workImages = [
    '../img/Stretch1.png',
    '../img/Stretch2.png',
    '../img/Stretch3.png',
    '../img/Stretch4.png'
];

const finishImages = [
    '../img/Stretch-finish1.png',
    '../img/Stretch-finish2.png',
];

let imgIndex = 0;

// 作業中ループ
function changeImage() {
    imgIndex = (imgIndex + 1) % workImages.length;
    img.src = workImages[imgIndex];
}

function startImageLoop() {
    if (!imgTimer) {
        imgIndex = 0;
        imgTimer = setInterval(changeImage, 1000);
    }
}

function stopImageLoop() {
    clearInterval(imgTimer);
    imgTimer = null;
}

// 終了後のループ
function startFinishImageLoop() {
    clearInterval(imgTimer);
    imgIndex = 0;
    imgTimer = setInterval(() => {
        imgIndex = (imgIndex + 1) % finishImages.length;
        img.src = finishImages[imgIndex];
    }, 1000);
}

// --- ボタンイベント ---
startBtn.addEventListener("click", () => {
    playClickSound();
    startTimer();
});

pauseBtn.addEventListener("click", () => {
    playClickSound();
    pauseTimer();
});

resetBtn.addEventListener("click", () => {
    playClickSound();
    resetTimer();
});

// 初期表示
updateDisplay();
