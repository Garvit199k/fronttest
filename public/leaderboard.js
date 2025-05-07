const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');

function saveScore(username, wpm, accuracy, timeSpent) {
  if (!username) return;
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({ username, wpm, accuracy, timeSpent });
  leaderboard.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboardTableBody.innerHTML = '';
  leaderboard.forEach((entry, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.wpm}</td>
      <td>${entry.accuracy}%</td>
      <td>${entry.timeSpent}s</td>
    `;
    leaderboardTableBody.appendChild(tr);
  });
}

document.addEventListener('saveScore', (e) => {
  const { username, wpm, accuracy, timeSpent } = e.detail;
  saveScore(username, wpm, accuracy, timeSpent);
});
