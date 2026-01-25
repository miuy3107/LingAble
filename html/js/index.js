const screen = document.querySelector(".screen");

// bắt đầu fade out sau 3s
setTimeout(() => {
  screen.classList.add("fade-out");
}, 3000);

// chuyển page sau khi fade out xong
setTimeout(() => {
  window.location.href = "khaobai.html";
}, 3800);
