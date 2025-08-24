// --- オーディオ ---
const closeSound = document.getElementById("close-btn-sound"); // 閉じるボタンの効果音
const appSound   = document.getElementById("app-hover-sound"); // アプリクリックの効果音
const HomeBgm    = document.getElementById("home-bgm");        // ホームBGM
const iconLinks  = document.querySelectorAll(".icon a")

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

    // 自動再生を試みる
  HomeBgm.play().catch(() => {
    // 自動再生できなかった場合はクリックで再生
    window.addEventListener("click", () => {
      HomeBgm.play();
    }, { once: true });
  });
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


// sound
// 閉じるボタンにマウスオーバーで音
closeBtn.addEventListener('mouseenter', () => {
  closeSound.currentTime = 0;
  closeSound.play();
});

// アプリアイコンにマウスオーバーで音
iconLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    appSound.currentTime = 0;
    appSound.play();
  });
});
