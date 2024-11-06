// Question Data
const questions = [
    { id: 1, text: "Apa kepanjangan HTML?", type: "text", answer: "Hypertext Markup Language", points: 5 },
    { id: 2, text: "Tag HTML untuk menambahkan gambar adalah?", type: "multiple", options: ["<img>", "<image>", "<picture>", "<src>"], answer: "<img>", points: 5 },
    { id: 3, text: "Apa kepanjangan CSS?", type: "text", answer: "Cascading Style Sheets", points: 5 },
    { id: 4, text: "Properti CSS untuk mengubah warna teks adalah?", type: "multiple", options: ["font-color", "color", "background-color", "text-color"], answer: "color", points: 5 },
    { id: 5, text: "Tag HTML untuk membuat paragraf adalah?", type: "multiple", options: ["<p>", "<h1>", "<paragraph>", "<text>"], answer: "<p>", points: 5 }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

// player form
function showPlayerForm() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("playerForm").classList.remove("hidden");
}

function startQuiz() {
    const name = document.getElementById("name").value;
    const nim = document.getElementById("nim").value;
    if (name && nim) {
        document.getElementById("playerForm").classList.add("hidden");
        document.getElementById("quiz").classList.remove("hidden");
        
        document.getElementById("totalQuestions").textContent = questions.length;

        loadQuestion();
    } else {
        alert("Please enter both name and NIM.");
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").textContent = question.text;

    const optionsContainer = document.getElementById("answerOptions");
    optionsContainer.innerHTML = "";

    // Update current question number
    document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1;

    if (question.type === "multiple") {
        question.options.forEach(option => {
            const btn = document.createElement("div");
            btn.className = "answer-option";
            btn.textContent = option;
            btn.onclick = () => selectAnswer(option);
            optionsContainer.appendChild(btn);
        });
    } else if (question.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "textAnswer";
        optionsContainer.appendChild(input);
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.onclick = () => selectAnswer(input.value);
        optionsContainer.appendChild(submitBtn);
    }

    // Update progress bar
    updateProgress();
    startTimer();
}

function updateProgress() {
    const progressElement = document.getElementById("progress");

    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = progressPercent + "%";
}

// Start Timer
function startTimer() {
    let timeLeft = 30;
    document.getElementById("timer").textContent = `Waktu tersisa: ${timeLeft} detik`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Waktu tersisa: ${timeLeft} detik`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); 
        }
    }, 1000);
}

function updateLiveScore() {
    document.getElementById("scoreDisplay").textContent = score;
}

function selectAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
        score += question.points;
        updateLiveScore();
    }
    nextQuestion();
}

// Next Question
function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("resultName").textContent = document.getElementById("name").value;
    document.getElementById("resultNim").textContent = document.getElementById("nim").value;
    document.getElementById("totalScore").textContent = score;
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}
