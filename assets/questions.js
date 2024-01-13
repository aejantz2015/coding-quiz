var start = document.querySelector("#start");
var timer = document.querySelector(".timer");
var time = document.querySelector("#time");
var main = document.querySelector("#main-screen")
var questionSection = document.querySelector("#questions")
var questionTitle = document.querySelector("#question")
var index = 0
var option = document.querySelector("#options")
var message = document.querySelector("#message")
var timerId 

var questions = [
    {
        question: "Arrays in JavaScript can be used to store ____",
        options: {  
            a: "Numbers and strings", 
            b: "Booleans", 
            c: "Other arrays", 
            d: "All of the above",
        },
        answer: "All of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content in the debugger is ____",
        options: {
            a: "Javascript", 
            b: "Terminal", 
            c: "for loops", 
            d: "console.log",
        },
        answer: "console.log"
    },
    {
        question: "Commonly used data types do not include",
        options: {
            a: "Strings", 
            b: "Alerts", 
            c: "Booleans", 
            d: "Numbers",
        },
        answer: "Alerts"
    },
    {
        question: "String values must be enclosed inside ____ when being assigned to a variable",
        options: {
            a: "Commas", 
            b: "Curly Brackets", 
            c: "Quotes", 
            d: "Parenthesis",
        },
        answer: "Quotes"
    },
    {
        question: "The condition in an if/else statement is enclosed in ____",
        options: {
            a: "Square Brackets",
            b: "Quotes", 
            c: "Curly Brackets", 
            d: "Parenthesis",
        },
        answer: "Parenthesis"
    },
];
var timeRemaining = questions.length * 15

function startTimer() {
    timerId = setInterval(function () {
    timeRemaining--;
    time.textContent = timeRemaining;
    if (timeRemaining === 0) {
        clearInterval(timer)
    }
    return timerCount;
    }, 1000);
}
function startQuiz () {
    main.classList.add("hide")
    questionSection.classList.remove("hide")
    startTimer()
    displayQuestion()
}
function displayQuestion () {
    option.textContent = ""
    message.textContent = ""
    questionTitle.textContent = questions[index].question
    var ol = document.createElement("ol")
    var li1 = document.createElement("li")
    li1.textContent = questions[index].options.a
    var li2 = document.createElement("li")
    li2.textContent = questions[index].options.b
    var li3 = document.createElement("li")
    li3.textContent = questions[index].options.c
    var li4 = document.createElement("li")
    li4.textContent = questions[index].options.d
    ol.appendChild(li1)
    ol.appendChild(li2)
    ol.appendChild(li3)
    ol.appendChild(li4)
    option.appendChild(ol)
}
function nextQuestion (event) {
    var userChoice = event.target.textContent
    checkAnswer(userChoice)
    index++
    if (index < questions.length){
    setTimeout(displayQuestion, 500)
    }
    else {
        clearInterval(timerId)
    }
} 
function checkAnswer (userChoice) {
    if (questions[index].answer === userChoice) {
        message.textContent = "Correct"
    }
    else {
        message.textContent = "Wrong"
        timeRemaining = timeRemaining - 10
    }
}

option.addEventListener("click", nextQuestion)
start.addEventListener("click", startQuiz)



