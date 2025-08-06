const quotes = [
  "Practice makes perfect. Keep typing and you will improve.",
  "Typing fast and accurately is a valuable skill for developers.",
  "Errors are part of the learning process. Keep going.",
  "Consistency beats intensity. Type every day to get better.",
  "Measure your progress, not perfection. You're doing great!"
];

const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const timeLeftText = document.getElementById("time-left");
const mistakesText = document.getElementById("mistakes");
const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

let timer;
let timeLeft = 60;
let mistakes = 0;
let charIndex = 0;
let isTyping = false;

function loadQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = "";

  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });

  inputField.value = "";
  timeLeft = 60;
  mistakes = 0;
  charIndex = 0;
  isTyping = false;

  timeLeftText.innerText = timeLeft;
  mistakesText.innerText = mistakes;
  wpmText.innerText = 0;
  accuracyText.innerText = "100";

  clearInterval(timer);
}

function startTimer() {
  if (!isTyping) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timeLeftText.innerText = timeLeft;
      } else {
        clearInterval(timer);
        inputField.disabled = true;
      }
    }, 1000);
    isTyping = true;
  }
}

function processInput() {
  const characters = quoteDisplay.querySelectorAll("span");
  const typed = inputField.value.split("");

  startTimer();

  characters.forEach((char, index) => {
    const typedChar = typed[index];

    if (typedChar == null) {
      char.classList.remove("correct", "incorrect");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
    }
  });

  mistakes = [...characters].filter((char, i) =>
    typed[i] && typed[i] !== char.innerText
  ).length;

  mistakesText.innerText = mistakes;

  const totalTyped = typed.length;
  const correctChars = totalTyped - mistakes;
  const wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60)) || 0;
  const accuracy = Math.round((correctChars / totalTyped) * 100) || 100;

  wpmText.innerText = wpm;
  accuracyText.innerText = accuracy;
}

inputField.addEventListener("input", processInput);

restartBtn.addEventListener("click", () => {
  loadQuote();
  inputField.disabled = false;
  inputField.focus();
});

loadQuote();
