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
    resultElem.innerHTML = "";
    currentQuizIndex = 0;
    score = 0;
    renderQuiz();
    resultElem.removeEventListener("click", restartGame);
  }

  function showResult(score) {
    nextQuestionBtn.style.display = "none";
    const resultElem = document.querySelector(".result");
    const oldScore = localStorage.getItem("score") | 0;
    const isNewScoreHigh = score > oldScore;
    if (isNewScoreHigh) {
      localStorage.setItem("score", score);
      resultElem.innerHTML = `
        <h1>Hurrah, your brand new score is ${score} out of ${quizData.length} </h1>
      `;
    } else {
      resultElem.innerHTML = `
        <h1>your score is ${score} out of ${quizData.length} </h1>
      `;
    }
    resultElem.innerHTML += `<button id="restartBtn">Restart the game</button>
`;
    document
      .querySelector("#restartBtn")
      .addEventListener("click", restartGame);
  }
}

quizGame();
