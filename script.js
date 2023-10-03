const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Paris",
            b: "London",
            c: "Berlin",
            d: "Madrid",
        },
        correctAnswer: "a",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: {
            a: "Mars",
            b: "Venus",
            c: "Jupiter",
            d: "Neptune",
        },
        correctAnswer: "a",
    },
    {
        question: "What is the largest mammal in the world?",
        answers: {
            a: "Elephant",
            b: "Blue Whale",
            c: "Giraffe",
            d: "Gorilla",
        },
        correctAnswer: "b",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: {
            a: "Oxygen",
            b: "Carbon Dioxide",
            c: "Nitrogen",
            d: "Hydrogen",
        },
        correctAnswer: "b",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: {
            a: "Charles Dickens",
            b: "William Shakespeare",
            c: "Jane Austen",
            d: "F. Scott Fitzgerald",
        },
        correctAnswer: "b",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Timer variable
const timePerQuestion = 8;

const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function startTimer() {
    let timeLeft = timePerQuestion;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer();
        } else {
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timerElement.textContent = '';
}

function displayQuestion() {
    resetTimer();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    answersContainer.innerHTML = "";
    for (const [option, answerText] of Object.entries(currentQuestion.answers)) {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}) ${answerText}`;
        answersContainer.appendChild(label);
    }

    questionText.classList.add('show');
    answersContainer.classList.add('show');
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) return;

    if (selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // Quiz completed
        questionText.textContent = "Quiz Completed!";
        answersContainer.innerHTML = "";
        nextButton.style.display = "none";
        restartButton.style.display = "block";
        scoreElement.textContent = `Score: ${score}/${questions.length}`;
        resetTimer();
    }

    scoreElement.textContent = `Score: ${score}/${currentQuestionIndex}`;
}

nextButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    restartButton.style.display = "none";
    scoreElement.textContent = "Score: 0";
    resetTimer();
});

displayQuestion();
