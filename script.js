// variables made from elements grabbed from the start page
var startPage = document.querySelector("#startPage");
var startBtnDiv = document.querySelector("#startBtnDiv");
var hiScoreBtn = document.querySelector("#highScoreButton")
var timerDisplayID = document.querySelector("#timer");

// variables made from elements grabbed from the quiz pages
var quizPage = document.querySelector("#quiz");
var questionID = document.querySelector("#questionID");
var choicesID = document.querySelector("#choicesID");
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

var secondsLeft = 20

// for tallying how many answers are chosen correctly 
var scoreCount = 0

// index to be used to track cycling through the questionBank array
var indexCount = 0

var userInitials =""



var userDetailsArray = JSON.parse(localStorage.getItem("userDetailsArray")) || [];

// array with question-answers to be cycled through the quiz page
var questionBank = [
    {
        question: "Which of the following is a Javascript data type?",
        possibleAnswers: ["thread","upright","data compiler","string"],
        correctAnswer: "string"
    },
    {
        question: "Which company developed Javascript?",
        possibleAnswers: ["Oracle", "Google","Netscape","JS Inc."],
        correctAnswer: "Netscape"
    },
    {
        question: "Which symbol is used for comments in Javascript?",
        possibleAnswers: ["/", "*","//","^^"],
        correctAnswer: "//"
    },
    {
        question: "Which of the following is not a looping structure in Javascript?",
        possibleAnswers: ["if-then","for","while","do-while"],
        correctAnswer: "if-then"
    }
]

function preStart() {
    displayStartPage()
    var startBtn = document.createElement("button")
    startBtnDiv.className = "btn btn-success";
    startBtn.textContent = "Start Game";
    startBtnDiv.appendChild(startBtn);
    startBtn.addEventListener("click", function() {
        scoreCount = 0;
        displayQuizPage()
        populateQuesAns()
        startTimer()
        
    })
}

// function to push question and answer details to the DOM as they cycle through the questionBank array.
function populateQuesAns() {
    choicesID.innerHTML = "";
    questionID.textContent = questionBank[indexCount].question;
    questionBank[indexCount].possibleAnswers.forEach(function (option) {
        var button = document.createElement("button")
        button.textContent = option
        choicesID.appendChild(button)
    })
    
}

choicesID.addEventListener("click",function (event) {
    choiceResult.innerHTML = "";
    if (event.target.matches("button")) {
        if(indexCount < questionBank.length - 1) {
            if(event.target.textContent === questionBank[indexCount].correctAnswer) {
                var congrats = document.createElement("a");
                congrats.className = "card-body text-success"
                congrats.textContent = "Correct!!! You know your stuff!!!"
                choiceResult.appendChild(congrats);
                indexCount++;
                scoreCount++
                populateQuesAns()
            } 
            else {
                var wrongAnswer = document.createElement("h1");
                wrongAnswer.className = "card-body text-danger"
                wrongAnswer.textContent = "That was a bloody awful answer, wasn't it?!!"
                choiceResult.appendChild(wrongAnswer);
                indexCount++;
                scoreCount--;
                populateQuesAns()
            }  
        } else {
            
            displayResultPage()
            populateResult()
        }
    }
})


function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerDisplayID.textContent = "time: " + secondsLeft;
        if(secondsLeft === -1) {
            clearInterval(timerInterval);
            alert("You ran out of time");
            displayResultPage()
        } else if (indexCount === questionBank.length - 1) {  //having an issue where timer stops after 3 clicks or not at all if I take away the '- 1'
            clearInterval(timerInterval);
            console.log(timerDisplayID.textContent);
        }
    }, 1000);
}
//need to figure out how to stop the timer if all questions have been asked with time left over.


function populateResult() {
    yourResult.textContent = "You got " + scoreCount + " out of 4 questions correct.";
}

submitBtn.addEventListener("click", function() {
    event.preventDefault();
    userDetails = {
        name: initials.value,
        score: scoreCount,
        time: timerDisplayID.textcontent
    } 
    userDetailsArray.push(userDetails);
    initials.value = "";
    localStorage.setItem("userDetailsArray", JSON.stringify(userDetailsArray));
    for (let i = 0; i < 10; i++) {
        var rankItem = userDetailsArray[i];
        var rankItemLI = document.createElement("li");
        rankItemLI.textContent = rankItem.name + " got " + rankItem.score + " correct, with a time of " + rankItem.time + "seconds left on the clock.";
        scoreListDiv.appendChild(rankItemLI); 
    }
    displayHighScoresPage();
     
    
})




// Display Page Functions
function displayStartPage(){
    startPage.style.display = "block";
    quizPage.style.display = "none";
    resultPage.style.display = "none";
    highScorePage.style.display = "none";
    timerDisplayID.style.display = "block";
    hiScoreBtn.style.display = "block";
}

function displayQuizPage(){
    startPage.style.display = "none";
    quizPage.style.display = "block";
    resultPage.style.display = "none";
    highScorePage.style.display = "none";
    timerDisplayID.style.display = "block";
    hiScoreBtn.style.display = "block";
}

function displayResultPage(){
    startPage.style.display = "none";
    quizPage.style.display = "none";
    resultPage.style.display = "block";
    highScorePage.style.display = "none";
    hiScoreBtn.style.display = "none";
    timerDisplayID.style.display = "block";
}

function displayHighScoresPage(){
    startPage.style.display = "none";
    quizPage.style.display = "none";
    resultPage.style.display = "none";
    highScorePage.style.display = "block";
    hiScoreBtn.style.display = "none";
    timerDisplayID.style.display = "none";
}

preStart()
