import questions from './question.js';

let currentQuestionIndex = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  const themeElement = document.getElementById('theme');
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");

  // Limpa feedback e opções anteriores
  feedbackElement.textContent = "";
  optionsElement.innerHTML = "";

  // Carrega a pergunta atual
  const currentQuestion = questions[currentQuestionIndex];
  themeElement.textContent = currentQuestion.theme;
  questionElement.textContent = currentQuestion.question;

  // Cria opções com ordem aleatória
  const options = [...currentQuestion.options];
  shuffleArray(options);

  options.forEach((option, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, currentQuestion);
    li.appendChild(button);
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedOption, currentQuestion) {
  const feedbackElement = document.getElementById("feedback");

  if (selectedOption === currentQuestion.options[currentQuestion.correct]) {
    feedbackElement.textContent = "Você acertou!";
    feedbackElement.style.color = "green";

    // Avança para a próxima pergunta ou finaliza o quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      setTimeout(() => {
        document.getElementById("quiz").innerHTML =
          "<h2>Parabéns! Você completou o quiz.</h2>";
      }, 1000);
    }
  } else {
    feedbackElement.textContent = "Você errou. Tente novamente.";
    feedbackElement.style.color = "red";
  }
}

// Inicializa o quiz
loadQuestion();
