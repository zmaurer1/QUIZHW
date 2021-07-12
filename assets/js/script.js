var questionIndex = 0;
var time = questions.length*15;
var timerId;

var questionsDiv = document.querySelector("#Questions")
var timerDiv = document.querySelector("#time")
var choicesDiv = document.querySelector("#Choices")
var startBtn = document.querySelector(".start-button")
var submitButton = document.querySelector("#submit")
var initialsDiv = document.querySelector("#initials")
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
        choiceButton.onclick=answerClick
        choicesDiv.appendChild(choiceButton)
    
    })

}
function answerClick(){
if(this.value !==questions[questionIndex].answer){
    time-=15
    if(time<0){
        time=0
    }
    timerDiv.textContent=time
    
}
console.log("clicked")

questionIndex++
if(questionIndex===questions.length){
    quizover()
}else{
    getQuestion()
}

}
function quizover(){
    clearInterval(timerId)
    var endScreenDiv=document.getElementById("endscreen")
    endScreenDiv.removeAttribute("class")
    var finalScore=document.getElementById("final-score")
    finalScore.textContent=time
    questionsDiv.setAttribute("class", "hide")

}
function clocktick(){
    time--;
    timerDiv.textContent = time;
    if(time<=0){
        quizover()
    }
}
function saveHighScore(){
    var initials=initialsDiv.value.trim()
    if(initials!==""){
        var highScores=JSON.parse(window.localStorage.getItem("highScores"))||[]
        var newScore={
            score:time,
            initials:initials
        }
        highScores.push(newScore)
        window.localStorage.setItem("highScores", JSON.stringify(highScores))

    }


}
function getHighScores(){
    var highScores=JSON.parse(window.localStorage.getItem("highScores"))||[]
    highScores.sort(function(a,b){
        return b.score -a.score
    })
    highScores.forEach(function(score){
        var listTag=document.createElement("li")
        listTag.textContent=score.initials+"-"+score.score
        var olContainer=document.getElementById("highScoresList")
        olContainer.appendChild(listTag)
    })
}
resetButton.addEventListener("click", window.location.reload)
startBtn.addEventListener("click", startquiz)
submitButton.onclick=saveHighScore
getHighScores()