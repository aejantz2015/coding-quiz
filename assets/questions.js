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
var end = document.querySelector("#end-screen")
var enterInitials = document.querySelector("#initials")
var scores = document.querySelector("#score")
var endScore = 0
var submit = document.querySelector("#submit")
var save = document.querySelector("#save")

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
    if (timeRemaining === 0 || index === questions.length) {
        clearInterval(timer)
        endQuiz()
    }
    return time;
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
        endQuiz()
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

function saveHighScore() {
    var initials = enterInitials.value
    var newScore = {
        score: timeRemaining,
        initials: initials,
    }
    var savedScores = JSON.parse(localStorage.getItem("scores")) || []
    savedScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));
    getHighScores()

}
function endQuiz () {
    questionSection.classList.add("hide")
    end.classList.remove("hide")
    scores.textContent = timeRemaining
    endScore = timeRemaining
    if (timeRemaining <= 0) {
        scores = timerId
        endScore.textContent = timeRemaining
    }

}

function getHighScores() {
    document.getElementById("high-scores").classList.remove("hide")
    var highScores = JSON.parse(localStorage.getItem("scores"))
    var highestScore = 0
    for (var score of highScores) {
        if (score.score > highestScore) {
            highestScore = score.score
        }; 
    }
    document.getElementById("highest-score").textContent = highestScore;
    var highestScoreIndex = highScores.indexOf(highScores.find(
        function (score){
            return score.score === highestScore
        }))
        highScores.splice(highestScoreIndex, 1)
    var ul = document.createElement("ul")
    highScores.forEach(function(highScore) {
        var li = document.createElement("li")
        li.innerHTML = `<span>Initials: ${highScore.initials} Score: ${highScore.score}`
        ul.appendChild(li)
    })
    document.getElementById("high-scores").appendChild(ul)
}
document.getElementById("play-again").addEventListener("click", function(){
    window.location.reload()
})
option.addEventListener("click", nextQuestion)
start.addEventListener("click", startQuiz)
save.addEventListener("click", saveHighScore)




