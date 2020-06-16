// making variables from elements grabbed from the start page
var startPage = document.querySelector("#start");
var startBtn = document.querySelector("#startBtn");
var hiScorBtn = document.querySelector("#highScoreButton")
var timer = document.querySelector("#timer");

// making variables from elements grabbed from the start page
var quizPage = document.querySelector("#quiz");



// making variables from elements grabbed from the start page
// var donePage

startPage.style.display = "block";
quizPage.style.display = "none";




startBtn.addEventListener("click",function() {
    startPage.style.display = "none";
    quizPage.style.display = "block";
})
