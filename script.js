// ==========================================
// PAF INTELLIGENCE TEST
// ==========================================


// ==========================================
// QUESTIONS
// ==========================================
//
// Add your questions inside this array.
//
// answer: 0 = first option
// answer: 1 = second option
// answer: 2 = third option
// answer: 3 = fourth option
//
// You can add 100 or more questions.
// ==========================================

const questions = [

    {
        question: "What number comes next? 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: 1
    },


    {
        question: "What number comes next? 5, 10, 15, 20, ?",
        options: ["22", "23", "24", "25"],
        answer: 3
    },


    {
        question: "If CAT is coded as DBU, how is DOG coded?",
        options: ["EPH", "EOH", "FPH", "DPG"],
        answer: 0
    },


    {
        question: "Which one is different?",
        options: [
            "Apple",
            "Mango",
            "Banana",
            "Carrot"
        ],
        answer: 3
    },


    {
        question: "Book is to Reading as Fork is to:",
        options: [
            "Writing",
            "Eating",
            "Running",
            "Sleeping"
        ],
        answer: 1
    },


    {
        question: "What is 15 + 27?",
        options: [
            "40",
            "41",
            "42",
            "43"
        ],
        answer: 2
    },


    {
        question: "What is 9 × 7?",
        options: [
            "56",
            "63",
            "72",
            "81"
        ],
        answer: 1
    },


    {
        question: "Complete the sequence: 1, 4, 9, 16, ?",
        options: [
            "20",
            "24",
            "25",
            "30"
        ],
        answer: 2
    },


    {
        question: "Which word does NOT belong?",
        options: [
            "Dog",
            "Cat",
            "Horse",
            "Rose"
        ],
        answer: 3
    },


    {
        question:
            "If all pilots are trained and Ali is a pilot, then Ali is:",
        options: [
            "Untrained",
            "Trained",
            "A teacher",
            "A doctor"
        ],
        answer: 1
    },


    {
        question: "What number comes next? 10, 20, 30, 40, ?",
        options: [
            "45",
            "50",
            "55",
            "60"
        ],
        answer: 1
    },


    {
        question: "What number comes next? 3, 6, 12, 24, ?",
        options: [
            "36",
            "42",
            "48",
            "50"
        ],
        answer: 2
    },


    {
        question: "Which is the smallest number?",
        options: [
            "12",
            "8",
            "15",
            "20"
        ],
        answer: 1
    },


    {
        question: "Which is the largest number?",
        options: [
            "45",
            "52",
            "39",
            "48"
        ],
        answer: 1
    },


    {
        question: "Complete: A, C, E, G, ?",
        options: [
            "H",
            "I",
            "J",
            "K"
        ],
        answer: 1
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;


// Store student's answers

let userAnswers =
    new Array(questions.length).fill(null);


// 40 minutes

const totalTime = 40 * 60;

let timeLeft = totalTime;

let timerInterval;


// ==========================================
// ELEMENTS
// ==========================================

const startScreen =
    document.getElementById("startScreen");

const testScreen =
    document.getElementById("testScreen");

const resultScreen =
    document.getElementById("resultScreen");


const startBtn =
    document.getElementById("startBtn");


const questionNumber =
    document.getElementById("questionNumber");


const question =
    document.getElementById("question");


const options =
    document.getElementById("options");


const previousBtn =
    document.getElementById("previousBtn");


const nextBtn =
    document.getElementById("nextBtn");


const finishBtn =
    document.getElementById("finishBtn");


const timer =
    document.getElementById("timer");


const progressBar =
    document.getElementById("progressBar");


// ==========================================
// START TEST
// ==========================================

startBtn.addEventListener("click", function () {

    startScreen.classList.add("hidden");

    testScreen.classList.remove("hidden");

    loadQuestion();

    timerInterval =
        setInterval(updateTimer, 1000);

});


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const q =
        questions[currentQuestion];


    // Question number

    questionNumber.innerText =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    // Question

    question.innerText =
        q.question;


    // Remove previous options

    options.innerHTML = "";


    // Create options

    q.options.forEach(function (option, index) {

        const button =
            document.createElement("button");


        button.className = "option";


        button.innerText =
            option;


        // Show selected answer

        if (
            userAnswers[currentQuestion]
            === index
        ) {

            button.classList.add("selected");

        }


        // Select answer

        button.addEventListener(
            "click",
            function () {

                userAnswers[currentQuestion] =
                    index;

                loadQuestion();

            }
        );


        options.appendChild(button);

    });


    // Progress

    const progress =
        ((currentQuestion + 1)
            / questions.length) * 100;


    progressBar.style.width =
        progress + "%";


    // Previous button

    previousBtn.disabled =
        currentQuestion === 0;


    // Last question

    if (
        currentQuestion
        === questions.length - 1
    ) {

        nextBtn.style.display =
            "none";

    }

    else {

        nextBtn.style.display =
            "block";

    }

}


// ==========================================
// NEXT BUTTON
// ==========================================

nextBtn.addEventListener("click", function () {

    if (
        currentQuestion
        < questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

    }

});


// ==========================================
// PREVIOUS BUTTON
// ==========================================

previousBtn.addEventListener(
    "click",
    function () {

        if (currentQuestion > 0) {

            currentQuestion--;

            loadQuestion();

        }

    }
);


// ==========================================
// TIMER
// ==========================================

function updateTimer() {

    timeLeft--;


    let minutes =
        Math.floor(timeLeft / 60);


    let seconds =
        timeLeft % 60;


    minutes =
        String(minutes).padStart(2, "0");


    seconds =
        String(seconds).padStart(2, "0");


    timer.innerText =
        `${minutes}:${seconds}`;


    // Time finished

    if (timeLeft <= 0) {

        clearInterval(timerInterval);

        alert(
            "Time is over. Your test will now be submitted."
        );

        submitTest();

    }

}


// ==========================================
// FINISH TEST
// ==========================================

finishBtn.addEventListener(
    "click",
    function () {

        const unanswered =
            userAnswers.filter(
                answer => answer === null
            ).length;


        let confirmMessage =
            "Are you sure you want to finish the test?";


        if (unanswered > 0) {

            confirmMessage +=
                `\n\nYou have ${unanswered} unanswered question(s).`;

        }


        const confirmed =
            confirm(confirmMessage);


        if (!confirmed) {

            return;

        }


        submitTest();

    }
);


// ==========================================
// SUBMIT TEST
// ==========================================

function submitTest() {

    // Stop timer

    clearInterval(timerInterval);


    // Correct answers

    let correct = 0;


    questions.forEach(
        function (q, index) {

            if (
                userAnswers[index]
                === q.answer
            ) {

                correct++;

            }

        }
    );


    // Unanswered

    const unanswered =
        userAnswers.filter(
            answer => answer === null
        ).length;


    // Wrong answers

    const wrong =
        questions.length
        - correct
        - unanswered;


    // Percentage

    const percentage =
        Math.round(
            (correct / questions.length) * 100
        );


    // Time used

    const timeUsed =
        totalTime - timeLeft;


    let usedMinutes =
        Math.floor(timeUsed / 60);


    let usedSeconds =
        timeUsed % 60;


    usedMinutes =
        String(usedMinutes).padStart(2, "0");


    usedSeconds =
        String(usedSeconds).padStart(2, "0");


    // Hide test

    testScreen.classList.add("hidden");


    // Show results

    resultScreen.classList.remove("hidden");


    // Score

    document.getElementById(
        "score"
    ).innerText =
        `${correct} / ${questions.length}`;


    // Correct

    document.getElementById(
        "correctAnswers"
    ).innerText =
        correct;


    // Wrong

    document.getElementById(
        "wrongAnswers"
    ).innerText =
        wrong;


    // Unanswered

    document.getElementById(
        "unanswered"
    ).innerText =
        unanswered;


    // Percentage

    document.getElementById(
        "percentage"
    ).innerText =
        percentage + "%";


    // Time

    document.getElementById(
        "timeUsed"
    ).innerText =
        `${usedMinutes}:${usedSeconds}`;


    // Message

    let resultMessage;


    if (percentage >= 80) {

        resultMessage =
            "Excellent performance! 🏆";

    }

    else if (percentage >= 60) {

        resultMessage =
            "Good performance! 👍";

    }

    else if (percentage >= 40) {

        resultMessage =
            "Fair performance. Keep practicing.";

    }

    else {

        resultMessage =
            "Keep practicing and try again. 💪";

    }


    document.getElementById(
        "message"
    ).innerText =
        resultMessage;


    // ==========================================
    // ANSWER REVIEW
    // ==========================================

    const reviewList =
        document.getElementById("reviewList");


    // Clear previous review

    reviewList.innerHTML = "";


    // Create review for every question

    questions.forEach(
        function (q, index) {

            const item =
                document.createElement("div");


            const userAnswer =
                userAnswers[index];


            const correctAnswer =
                q.answer;


            // ----------------------------------
            // CORRECT
            // ----------------------------------

            if (
                userAnswer === correctAnswer
            ) {

                item.className =
                    "reviewItem correct";


                item.innerHTML = `

                    <div class="reviewQuestion">

                        Question ${index + 1}:
                        ${q.question}

                    </div>


                    <div class="yourAnswer">

                        Your Answer:

                        <span class="correctText">

                            ${q.options[userAnswer]} ✅

                        </span>

                    </div>


                    <div class="correctAnswer">

                        Correct Answer:

                        <span class="correctText">

                            ${q.options[correctAnswer]}

                        </span>

                    </div>

                `;

            }


            // ----------------------------------
            // WRONG
            // ----------------------------------

            else if (
                userAnswer !== null
            ) {

                item.className =
                    "reviewItem wrong";


                item.innerHTML = `

                    <div class="reviewQuestion">

                        Question ${index + 1}:
                        ${q.question}

                    </div>


                    <div class="yourAnswer">

                        Your Answer:

                        <span class="wrongText">

                            ${q.options[userAnswer]} ❌

                        </span>

                    </div>


                    <div class="correctAnswer">

                        Correct Answer:

                        <span class="correctText">

                            ${q.options[correctAnswer]}

                        </span>

                    </div>

                `;

            }


            // ----------------------------------
            // UNANSWERED
            // ----------------------------------

            else {

                item.className =
                    "reviewItem unanswered";


                item.innerHTML = `

                    <div class="reviewQuestion">

                        Question ${index + 1}:
                        ${q.question}

                    </div>


                    <div class="yourAnswer">

                        Your Answer:

                        <span class="unansweredText">

                            Not Answered

                        </span>

                    </div>


                    <div class="correctAnswer">

                        Correct Answer:

                        <span class="correctText">

                            ${q.options[correctAnswer]}

                        </span>

                    </div>

                `;

            }


            // Add question to review

            reviewList.appendChild(item);

        }
    );

}