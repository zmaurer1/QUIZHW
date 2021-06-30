var questionIndex = 0;
var time = questions.length*15;
var timerId;

var questionsDiv = document.querySelector("#Questions")
var timerDiv = document.querySelector("#time")
var choicesDiv = document.querySelector("#Choices")
var startBtn = document.querySelector(".start-button")
var submitButton = document.querySelector("#submit")
var initials = document.querySelector("#initials")
var resetButton = document.querySelector(".reset-button")

function startquiz(){
    var startContainer = document.querySelector("#start-container")
    startContainer.setAttribute("class", "hide");
    questionsDiv.removeAttribute("class", "hide");
    timerId = setInterval(clocktick, 1000)
    timerDiv.textContent = time 
    getQuestion();

}
function getQuestion(){
    var currentQuestion = questions[questionIndex]
    var titleDiv = document.querySelector("#Question-title")
    titleDiv.textContent = currentQuestion.title
    choicesDiv.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i){
        var choiceButton = document.createElement ("button")
        choiceButton.setAttribute("class", "choice")
        choiceButton.setAttribute("value", choice)
        choiceButton.textContent = i+choice
        choicesDiv.appendChild(choiceButton)

    
    })

}
function quizover(){

}
function clocktick(){
    time--;
    timerDiv.textContent = time;
    if(time<=0){
        quizover()
    }
}
resetButton.addEventListener("click", window.location.reload)
startBtn.addEventListener("click", startquiz)