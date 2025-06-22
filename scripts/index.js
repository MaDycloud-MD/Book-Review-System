const quotes = [
  "“A room without books is like a body without a soul.” — Cicero",
  "“Books are a uniquely portable magic.” — Stephen King",
  "“Reading is essential for those who seek to rise above the ordinary.” — Jim Rohn",
  "“So many books, so little time.” — Frank Zappa"
];

let i = 0, j = 0, currentQuote = [], isDeleting = false, isEnd = false;
const typedText = document.getElementById("typed-text");

function loop() {
  isEnd = false;
  typedText.innerHTML = currentQuote.join("");

  if (i < quotes.length) {
    if (!isDeleting && j <= quotes[i].length) {
      currentQuote.push(quotes[i][j]);
      j++;
      typedText.innerHTML = currentQuote.join("");
    }

    if (isDeleting && j <= quotes[i].length) {
      currentQuote.pop();
      j--;
      typedText.innerHTML = currentQuote.join("");
    }

    if (j === quotes[i].length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(loop, 2000); // Pause on full quote
      return;
    }

    if (isDeleting && j === 0) {
      currentQuote = [];
      isDeleting = false;
      i = (i + 1) % quotes.length;
    }
  }

  const speed = isEnd ? 200 : isDeleting ? 40 : 60;
  setTimeout(loop, speed);
}

loop();

const toggle = document.getElementById("theme-toggle");

// Load theme from localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light");
  toggle.checked = true;
}

// Toggle Handler
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

