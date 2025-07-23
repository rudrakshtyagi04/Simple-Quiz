const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin","Amsterdam"],
    correctAnswer: 0,
  },

//--------------------------------------------------------------------
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter","Earth"],
    correctAnswer: 1,
  },

//--------------------------------------------------------------------
  {
    question: "What company manufactures the Mustang?",
    answers: ["Chevrolet", "Ford", "Dodge", "Toyota"],
    correctAnswer: 1,
  },

//--------------------------------------------------------------------
  {
    question: "What does “ABS” stand for in cars?",
    answers: ["Automatic Braking System","Anti-Brake Support","Anti-lock Braking System","Auto Balance Suspension",
    ],
    correctAnswer: 2,
  },

//--------------------------------------------------------------------
  {
    question: "In what year did the first iPhone release?",
    answers: ["2005", "2007", "2008", "2009"],
    correctAnswer: 1,
  },

  //--------------------------------------------------------------------
  {
    question: "Which car broke the 300 mph barrier for the first time in 2019?",
    answers: ["Bugatti Chiron Super Sport 300+","Koenigsegg Jesko","Hennessey Venom F5","McLaren Speedtail",],
    correctAnswer: 0,
  },

//--------------------------------------------------------------------
  {
    question: "What is the firing order of a standard small-block Chevy V8 engine?",
    answers: ["1-8-4-3-6-5-7-2","1-3-5-7-2-4-6-8","1-6-5-4-3-2-7-8","1-2-3-4-5-6-7-8",],
    correctAnswer: 0,
  },

//--------------------------------------------------------------------
  {
    question: "In physics, what is the term for the point where all mass of a body is considered to be concentrated?",
    answers: ["Moment Arm","Inertial Node","Center of Gravity","Torque Point"],
    correctAnswer: 2,
  },

//--------------------------------------------------------------------
  {
    question: "Which Formula 1 driver has won races with 4 different teams?",
    answers: ["Fernando Alonso","Sebastian Vettel","Stirling Moss","Nico Rosberg",],
    correctAnswer: 2,
  },

//--------------------------------------------------------------------
  {
    question: "What is the hexadecimal representation of the binary number 110110111101?",
    answers: ["D7D","6FD","DBE","C9A"],
    correctAnswer: 0,
  },
//--------------------------------------------------------------------
  {
    question: "Which rare earth metal is critical for the production of catalytic converters in modern cars?",
    answers: ["Neodymium","Lanthanum","Rhodium","Zirconium",],
    correctAnswer: 2,
  },

//--------------------------------------------------------------------
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    if (index === currentQuestion.correctAnswer) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.style.backgroundColor = "#4CAF50";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "#f44336";
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.style.border = "2px solid green";
    }
  });

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
