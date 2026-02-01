/* ===============================
   DATA
================================ */
const lessons = [
  { vi: "Chào buổi sáng", en: "Good morning" },
  { vi: "Bạn khỏe không", en: "How are you" },
  { vi: "Tôi rất ổn", en: "I'm great" }
];

/* ===============================
   STATE
================================ */
let phase = 1; // 1: nói tiếng Việt | 2: luyện nói tiếng Anh
let index = 0;
let starCount = 0;

/* ===============================
   ELEMENTS
================================ */
const chatContainer = document.getElementById("chatContainer");
const recordArea = document.getElementById("recordArea");

const stars = [
  document.getElementById("star1"),
  document.getElementById("star2"),
  document.getElementById("star3")
];

/* ===============================
   SPEECH RECOGNITION
================================ */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Trình duyệt của bạn không hỗ trợ Speech Recognition 😢");
}

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

/* ===============================
   EVENTS
================================ */
recordArea.addEventListener("click", () => {
  if (phase === 1) {
    startVietnameseInput();
  } else {
    startEnglishPractice();
  }
});

/* ===============================
   PHASE 1 – VI INPUT
================================ */
function startVietnameseInput() {
  recognition.lang = "vi-VN";
  recognition.start();

  recognition.onresult = (e) => {
    const spokenVI = e.results[0][0].transcript;

    // Bubble tiếng Việt
    addBubble(spokenVI, "left");

    // Bubble tiếng Anh tương ứng
    setTimeout(() => {
      addBubble(lessons[index].en, "right");
      index++;

      // Hết 3 câu → chuyển phase
      if (index === lessons.length) {
        setTimeout(startPhase2, 800);
      }
    }, 400);
  };
}

/* ===============================
   PHASE 2 – RESET & SHOW EN
================================ */
function startPhase2() {
  phase = 2;
  index = 0;
  starCount = 0;
  chatContainer.innerHTML = "";
  resetStars();

  lessons.forEach(l => {
    addBubble(l.en, "center");
  });
}

/* ===============================
   PHASE 2 – PRACTICE EN
================================ */
function startEnglishPractice() {
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (e) => {
    const spoken = e.results[0][0].transcript.toLowerCase();
    const target = lessons[index].en.toLowerCase();

    // Match đơn giản (cho học sinh dễ thở 😄)
    if (spoken.includes(target)) {
      activateStar();
    }
  };
}

/* ===============================
   STARS LOGIC
================================ */
function activateStar() {
  if (starCount < 3) {
    stars[starCount].classList.add("active");
    starCount++;
  }

  if (starCount === 3) {
    starCount = 0;
    resetStars();
    index++;

    if (index === lessons.length) {
      showGreatJob();
    }
  }
}

function resetStars() {
  stars.forEach(s => s.classList.remove("active"));
}

/* ===============================
   UI HELPERS
================================ */
function addBubble(text, side) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${side}`;
  bubble.textContent = text;
  chatContainer.appendChild(bubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* ===============================
   FINISH
================================ */
function showGreatJob() {
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble center";
  bubble.textContent = "Great job! 🎉";
  chatContainer.appendChild(bubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  launchConfetti();
}

/* ===============================
   CONFETTI (GIỮ NGUYÊN)
================================ */
function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.background =
      ["#ffd43b", "#ffffff", "#ff6b6b"][Math.floor(Math.random() * 3)];
    confetti.style.opacity = 0.9;
    confetti.style.zIndex = 999;
    confetti.style.borderRadius = "50%";
    document.body.appendChild(confetti);

    const fall = confetti.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(110vh)" }
      ],
      {
        duration: 2000 + Math.random() * 1000,
        easing: "ease-out"
      }
    );

    fall.onfinish = () => confetti.remove();
  }
}
