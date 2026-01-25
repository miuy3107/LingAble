let count = 0;

  const stars = [
    document.getElementById("star1"),
    document.getElementById("star2"),
    document.getElementById("star3")
  ];

  document.getElementById("recordArea").addEventListener("click", () => {
    if (count < 3) {
      stars[count].classList.add("active");
      count++;
    }
  });