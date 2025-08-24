// --- オーディオ ---
const closeSound = document.getElementById("close-btn-sound"); // 閉じるボタンの効果音
const appSound   = document.getElementById("app-hover-sound"); // アプリクリックの効果音
const HomeBgm    = document.getElementById("home-bgm");        // ホームBGM

// --- ボタン ---
const muteBtn    = document.getElementById("mute-btn");        // ミュートボタン
const iconSound  = document.getElementById("icon-sound");      // ミュートOFFアイコン
const iconMute   = document.getElementById("icon-mute");       // ミュートONアイコン
const closeBtn   = document.querySelector('.close-btn');      // ホーム画面の閉じるボタン（効果音用）

// play sound
window.addEventListener("load", () => {
  HomeBgm.volume = 0.2; //音量０～１
  HomeBgm.play();
  HomeBgm.loop = true;
});


// mute btn
muteBtn.addEventListener("click", () => {
  HomeBgm.muted = !HomeBgm.muted;

  if (HomeBgm.muted) {
    iconSound.style.display = "none";
    iconMute.style.display = "inline";
  } else {
    iconSound.style.display = "inline";
    iconMute.style.display = "none";
  }
});