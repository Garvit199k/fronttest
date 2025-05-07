function resetTest() {
  clearInterval(timer);
  timeLeft = parseInt(timeOption.value);
  totalErrors = 0;
  errors = 0;
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

restartBtn.addEventListener('click', resetTest);

themeSelector.addEventListener('change', (e) => {
  document.body.className = '';
  document.body.classList.add(`theme-${e.target.value}`);
});
