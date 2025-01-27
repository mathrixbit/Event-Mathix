// Stopwatch functionality
let startTime;
let running = false;
let interval;

function startStopwatch() {
  if (!running) {
    running = true;
    startTime =
      Date.now() -
      (interval
        ? parseFloat(document.getElementById("display").textContent) * 1000
        : 0);
    interval = setInterval(updateDisplay, 10);
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const displayHours = String(hours).padStart(2, "0");
  const displayMinutes = String(minutes % 60).padStart(2, "0");
  const displaySeconds = String(seconds % 60).padStart(2, "0");

  document.getElementById(
    "display"
  ).textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

// Start the stopwatch when the page loads
window.addEventListener("load", startStopwatch);
document.getElementById("door").addEventListener("click", function () {
  if (this.classList.contains("open")) return;
  var myModal = new bootstrap.Modal(document.getElementById("keyModal"));
  document.getElementById("keyInput").value = "";
  document.getElementById("keyError").style.display = "none";
  myModal.show();
});

document.getElementById("unlockBtn").addEventListener("click", function () {
  const key = document.getElementById("keyInput").value.trim();
  const correctKey = "Aryabhata";
  if (key === correctKey) {
    var keyModalEl = document.getElementById("keyModal");
    var keyModal = bootstrap.Modal.getInstance(keyModalEl);
    keyModal.hide();
    setTimeout(() => {
      var questionModal = new bootstrap.Modal(
        document.getElementById("questionModal")
      );
      document.getElementById("answerInput").value = "";
      document.getElementById("answerError").style.display = "none";
      questionModal.show();
    }, 300);
  } else {
    document.getElementById("keyError").style.display = "block";
  }
});

document.getElementById("answerBtn").addEventListener("click", function () {
  const answer = document.getElementById("answerInput").value.trim();
  const correctAnswer = "2";
  if (answer === correctAnswer) {
    document.getElementById("door").classList.add("open");
    document.getElementById("message").style.display = "block";
    var questionModalEl = document.getElementById("questionModal");
    var questionModal = bootstrap.Modal.getInstance(questionModalEl);
    questionModal.hide();
  } else {
    document.getElementById("answerError").style.display = "block";
  }
});
