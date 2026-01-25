const dialogue = [
    { text: "Good morning!", side: "left" },
    { text: "Hi! How are you?", side: "right" },
    { text: "I'm great!", side: "left" }
  ];

  let sentenceIndex = 0;
  let count = 0;

  const stars = [
    star1, star2, star3, star4, star5
  ];

  const chatContainer = document.getElementById("chatContainer");
  const recordArea = document.getElementById("recordArea");

  recordArea.addEventListener("click", () => {
    if (count < 5) {
      stars[count].classList.add("active");
      count++;
    }

    if (count === 5) {
      setTimeout(() => {
        sentenceIndex++;

        // Reset sao
        stars.forEach(s => s.classList.remove("active"));
        count = 0;

        // Còn câu tiếp
        if (sentenceIndex < dialogue.length) {
          const bubble = document.createElement("div");
          bubble.className = `chat-bubble ${dialogue[sentenceIndex].side}`;
          bubble.textContent = dialogue[sentenceIndex].text;
          chatContainer.appendChild(bubble);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        // Hết hội thoại
        else {
          showGreatJob();
        }
      }, 500);
    }
  });

  function showGreatJob() {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble center";
    bubble.textContent = "Great job! 🎉";
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    launchConfetti();
  }

  /* ===== CONFETTI (demo-friendly) ===== */
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