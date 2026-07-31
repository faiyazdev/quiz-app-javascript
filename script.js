// @ts-nocheck
import { quizData } from "./db.js";

function quizGame(params) {
  let currentQuizIndex = 0;
  let score = 0;
  const nextQuestionBtn = document.querySelector(".actions button");
  const quizOptions = document.querySelector(".options");

  renderQuiz();

  // listen for option changes and handle select option
  quizOptions.addEventListener("change", (e) => {
    const currentQuiz = quizData[currentQuizIndex];
    if (e.target.value === currentQuiz.answer) {
      score++;
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
      console.log(score, currentQuizIndex);
    } else {
      // showResult()
    }
  });

  function renderQuiz() {
    const quizQuestion = document.querySelector(".question-card h2");
    const currentQuiz = quizData[currentQuizIndex];
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
}

quizGame();
