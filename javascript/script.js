const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const accuracyTag = document.querySelector(".accuracy span");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0;

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randomIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar === null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    const totalChars = characters.length;
    const correctChars = totalChars - mistakes;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    wpmTag.innerText = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    accuracyTag.innerText = accuracy;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;

    const characters = typingText.querySelectorAll("span");
    const totalChars = characters.length;
    const correctChars = totalChars - mistakes;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    wpmTag.innerText = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    accuracyTag.innerText = accuracy;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
  accuracyTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
