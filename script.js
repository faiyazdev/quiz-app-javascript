// @ts-nocheck
import { quizData } from "./db.js";

function quizGame(params) {
  let currentQuizIndex = 1;

  function updateQuiz(currentQuizIndex) {
    // get access to current quiz
    const currentQuiz = quizData[currentQuizIndex];

    // get access to elements of individual quiz in html
    const quizQuestion = document.querySelector(".question-card h2");
    const quizOptions = document.querySelector(".options");

    // assign quiz data to these following elements
    quizQuestion.innerHTML = currentQuiz.question;
    currentQuiz.options.forEach((option) => {
      const li = document.createElement("li");
      li.innerHTML = option;
      li.classList.add("option");
      quizOptions.appendChild(li);
    });
  }

  updateQuiz(currentQuizIndex);
}

quizGame();
