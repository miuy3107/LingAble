const progress = document.getElementById("progress");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");

let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseIcon.src = "assets/pausebutton.png";
    playPauseIcon.alt = "Pause";
  } else {
    playPauseIcon.src = "assets/playbutton.png";
    playPauseIcon.alt = "Play";
  }
});

/* Fake progress like YouTube */
setInterval(() => {
  if (isPlaying && progress.value < 100) {
    progress.value = Number(progress.value) + 1;
  }
}, 300);
