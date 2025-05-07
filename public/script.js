const testTextElement = document.getElementById('test-text');
const inputArea = document.getElementById('input-area');
const timeLeftElement = document.getElementById('time-left');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const errorsElement = document.getElementById('errors');
const restartBtn = document.getElementById('restart-btn');
const themeSelector = document.getElementById('theme');
const resultElement = document.getElementById('result');

let timer = null;
let timeLeft = 60;
let totalErrors = 0;
let errors = 0;
let charIndex = 0;
let isTyping = false;
let typedChars = 0;

let testText = '';

async function fetchTestText() {
  try {
    const response = await fetch('/api/texts');
    const data = await response.json();
    testText = data.text;
    displayTestText();
  } catch (error) {
    testText = "The quick brown fox jumps over the lazy dog.";
    displayTestText();
  }
}

function displayTestText() {
  testTextElement.innerHTML = '';
  testText.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char;
    testTextElement.appendChild(span);
  });
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftElement.innerText = timeLeft;
  } else {
    finishTest();
  }
}

function finishTest() {
  clearInterval(timer);
  inputArea.disabled = true;
  const timeSpent = 60 - timeLeft;
  const wpm = Math.round(((typedChars / 5) / (timeSpent / 60)) || 0);
  const accuracy = Math.round(((typedChars - totalErrors) / typedChars) * 100) || 0;
  wpmElement.innerText = wpm;
  accuracyElement.innerText = accuracy;
  errorsElement.innerText = totalErrors;
  resultElement.innerText = `Test finished! Your WPM: ${wpm}, Accuracy: ${accuracy}%`;
}

function resetTest() {
  clearInterval(timer);
  timeLeft = 60;
  totalErrors = 0;
  errors = 0;
  charIndex = 0;
  isTyping = false;
  typedChars = 0;
  inputArea.disabled = false;
  inputArea.value = '';
  timeLeftElement.innerText = timeLeft;
  wpmElement.innerText = 0;
  accuracyElement.innerText = 100;
  errorsElement.innerText = 0;
  resultElement.innerText = '';
  displayTestText();
}

inputArea.addEventListener('input', () => {
  if (!isTyping) {
    isTyping = true;
    timer = setInterval(updateTimer, 1000);
  }

  typedChars = inputArea.value.length;

  const textSpans = testTextElement.querySelectorAll('span');
  errors = 0;

  textSpans.forEach((span, index) => {
    const typedChar = inputArea.value[index];
    if (typedChar == null) {
      span.classList.remove('correct', 'incorrect');
    } else if (typedChar === span.innerText) {
      span.classList.add('correct');
      span.classList.remove('incorrect');
    } else {
      span.classList.add('incorrect');
      span.classList.remove('correct');
      errors++;
    }
  });

  totalErrors = errors;
  errorsElement.innerText = totalErrors;

  const correctChars = typedChars - totalErrors;
  const accuracy = Math.round((correctChars / typedChars) * 100) || 0;
  accuracyElement.innerText = accuracy;

  const timeSpent = 60 - timeLeft;
  const wpm = Math.round(((correctChars / 5) / (timeSpent / 60)) || 0);
  wpmElement.innerText = wpm;

  if (inputArea.value.length === testText.length) {
    finishTest();
  }
});

restartBtn.addEventListener('click', resetTest);

themeSelector.addEventListener('change', (e) => {
  document.body.className = '';
  document.body.classList.add(`theme-${e.target.value}`);
});

window.onload = () => {
  fetchTestText();
  resetTest();
  // Set theme selector to current theme
  themeSelector.value = 'male';
};
