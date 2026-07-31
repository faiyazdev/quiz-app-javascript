// @ts-nocheck
import { quizData } from "./db.js";

function quizGame(params) {
  let currentQuizIndex = 0;
  let score = 0;
  const nextQuestionBtn = document.querySelector(".actions button");
  const quizOptions = document.querySelector(".options");
  let intervalId = null;
  renderQuiz();

  // listen for option changes and handle select option
  quizOptions.addEventListener("change", (e) => {
    const currentQuiz = quizData[currentQuizIndex];
    if (e.target.value === currentQuiz.answer) {
      score++;
      clearInterval(intervalId);
    }
    document.querySelectorAll(".option input").forEach((inp) => {
      inp.disabled = true;
      if (inp.value === e.target.value) {
        inp.parentElement.style.background = "#ef17032c";
      }
      if (inp.value === currentQuiz.answer) {
        inp.parentElement.style.background = "#4aef0329";
      }
    });

    // show next question btn when option is selected
    document.querySelector(".actions button").style.display = "block";
  });

  // listen for next question btn and handle
  nextQuestionBtn.addEventListener("click", (e) => {
    if (currentQuizIndex < quizData.length - 1) {
      currentQuizIndex++;
      renderQuiz();
    } else {
      showResult(score);
    }
  });

  function renderQuiz() {
    const quizQuestion = document.querySelector(".question-card h2");
    const currentQuiz = quizData[currentQuizIndex];
    countDown(5, currentQuiz);
    // assign quiz data to these following elements
    quizQuestion.textContent = currentQuiz.question;
    quizOptions.innerHTML = "";
    currentQuiz.options.forEach((option) => {
      const label = document.createElement("label");
      const span = document.createElement("span");
      const input = document.createElement("input");
      label.classList.add("option");
      input.setAttribute("type", "radio");
      input.setAttribute("name", "option");
      input.setAttribute("value", option);
      span.textContent = option;
      label.appendChild(input);
      label.appendChild(span);
      quizOptions.appendChild(label);
    });

    // hide next question btn
    nextQuestionBtn.style.display = "none";
  }

  function countDown(timerLeft, currentQuiz) {
    clearInterval(intervalId);
    const timerElem = document.querySelector(".timer");
    timerElem.innerHTML = timerLeft;
    intervalId = setInterval(() => {
      timerLeft--;
      timerElem.innerHTML = timerLeft;

      if (timerLeft <= 0) {
        clearInterval(intervalId);
        document.querySelectorAll(".option input").forEach((inp) => {
          inp.disabled = true;
          if (inp.value === currentQuiz.answer) {
            inp.parentElement.style.background = "#4aef0329";
          }
        });
        nextQuestionBtn.style.display = "block";
      }
    }, 1000);
  }

  function restartGame() {
    const resultElem = document.querySelector(".result");
    const mainContent = document.querySelector(".main-content");
    mainContent.style.display = "block";
    resultElem.innerHTML = "";
    currentQuizIndex = 0;
    score = 0;
    renderQuiz();
    resultElem.removeEventListener("click", restartGame);
  }

  function showResult(score) {
    nextQuestionBtn.style.display = "none";
    const resultElem = document.querySelector(".result");
    const mainContent = document.querySelector(".main-content");
    mainContent.style.display = "none";
    const oldScore = Number(localStorage.getItem("score")) || 0;
    const isNewHighScore = score > oldScore;

    if (isNewHighScore) {
      localStorage.setItem("score", score);
    }

    const highScore = Math.max(score, oldScore);
    const percentage = Math.round((score / quizData.length) * 100);
    resultElem.innerHTML = `
    <div class="result-card">
      <h1>${isNewHighScore ? "🎉 New High Score!" : " Quiz Finished!"}</h1>

      <p class="score">
        <strong>${score}</strong> / ${quizData.length}
      </p>

      <p class="percentage">
        You scored <strong>${percentage}%</strong>
      </p>

      <p class="high-score">
        High Score: <strong>${highScore}</strong>
      </p>

      <button id="restartBtn">Play Again</button>
    </div>
  `;

    document
      .querySelector("#restartBtn")
      .addEventListener("click", restartGame);
  }
}

quizGame();
