// @ts-nocheck
const quizData = [
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },

  {
    question: "Which CSS property changes the text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color",
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<picture>", "<img>", "<image>", "<src>"],
    answer: "<img>",
  },
  {
    question: "Which JavaScript keyword is used to declare a constant?",
    options: ["let", "var", "const", "static"],
    answer: "const",
  },
  {
    question: "Which CSS layout system is one-dimensional?",
    options: ["Grid", "Flexbox", "Float", "Table"],
    answer: "Flexbox",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["shift()", "push()", "pop()", "unshift()"],
    answer: "push()",
  },
  {
    question: "Which event occurs when a button is clicked?",
    options: ["mouseover", "keydown", "click", "submit"],
    answer: "click",
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<head>", "<h1>"],
    answer: "<h1>",
  },
  {
    question: "Which JavaScript method converts JSON into an object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: "JSON.parse()",
  },
  {
    question: "Which CSS property makes an element a flex container?",
    options: ["display: grid", "display: flex", "position: flex", "flex: 1"],
    answer: "display: flex",
  },
];

const question = document.querySelector(".question-card");
const nextBtn = document.querySelector(".actions");
const progress = document.querySelector(".progress");
const ansOptions = document.querySelector(".options");
const progressFillBar = document.querySelector(".progress-fill");
let currentIndex = 0;
let score = 0;

ansOptions.addEventListener("change", (e) => {
  if (e.target.type !== "radio") return;
  const radios = ansOptions.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.disabled = true;
  });

  const checkedRadio = ansOptions.querySelector('input[name="answer"]:checked');

  [...radios].map((radio) => {
    if (checkedRadio.value === radio.value) {
      radio.parentElement.style.background = "rgba(205, 46, 32, 0.53)";
    }
    if (quizData[currentIndex].answer === radio.value) {
      radio.parentElement.style.background = "rgba(68, 255, 0, 0.15)";
    }
    if (
      checkedRadio.value === radio.value &&
      quizData[currentIndex].answer === radio.value
    ) {
      score = score + 1;
      return radio;
    }
    return radio;
  });
});

function loopQuiz(index) {
  progressFillBar.style.width = `${((index + 1) / quizData.length) * 100}%`;

  progress.querySelector("span").innerHTML =
    `Question ${index + 1} of ${quizData.length}`;
  question.querySelector("h2").innerText = quizData[index].question;
  ansOptions.innerHTML = "";
  quizData[index].options.map((option) => {
    const escaped = option.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return (ansOptions.innerHTML += `<label class="option">
          <input type="radio" value=${escaped}  name="answer" />
          <span>${escaped}</span>
        </label>`);
  });
}
loopQuiz(currentIndex);

nextBtn.addEventListener("click", () => {
  const checkedRadio = document.querySelector('input[name="answer"]:checked');
  console.log(checkedRadio);
  if (!checkedRadio?.value) {
    question.querySelector("span").innerText =
      "Error : please select an option";
    console.log("please select an option");
    return;
  }

  if (currentIndex === quizData.length - 1) {
    console.log("quiz is done, you got", score, "out of", quizData.length);
  } else {
    currentIndex = currentIndex + 1;
  }

  console.log(score);
  question.querySelector("span").innerText = "";

  loopQuiz(currentIndex);
});
