// variables made from elements grabbed from the start page
var startPage = document.querySelector("#start");
var startBtn = document.querySelector("#startBtn");
var hiScorBtn = document.querySelector("#highScoreButton")
var timer = document.querySelector("#timer");

// variables made from elements grabbed from the quiz pages
var quizPage = document.querySelector("#quiz");
var question = document.querySelector("#question");
var answerChoices = document.querySelector("#choices");
var choiceResult = document.querySelector("#choiceResult");

// variables made from elements grabbed from the result page
var resultPage = document.querySelector("#resultPage");
var yourResult = document.querySelector("#yourResult");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitBtn")

// variables made from elements grabbed from high scores page
var highScorePage = document.querySelector("#highScores");
var scoreListDiv = document.querySelector("#scoresRanked");
var playAgainBtn = document.querySelector("#playAgain");
var deleteScoresBtn = document.querySelector("#deleteScores");

// startPage.style.display = "block";
// quizPage.style.display = "none";
// resultPage.style.display = "none";




// startBtn.addEventListener("click",function() {
//     startPage.style.display = "none";
//     quizPage.style.display = "block";
//     resultPage.style.display = "none";
// })



startPage.style.display = "none";
quizPage.style.display = "none";
resultPage.style.display = "none";
highScorePage.style.display = "block";
hiScorBtn.style.display = "none";
timer.style.display = "none";