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
userDetails = {
        name: initials.value,
        score: scoreCount,
        time: timerDisplayID.textcontent
} 

// variables made from elements grabbed from high scores page
var highScorePage = document.querySelector("#highScores");
var scoreListDiv = document.querySelector("#scoresRanked");
var playAgainBtn = document.querySelector("#playAgain");
var deleteScoresBtn = document.querySelector("#deleteScores");
var rankItem = "";

// seconds amount for the timer
var secondsLeft = 20

// score tally of how many answers are chosen correctly 
var scoreCount = 0

// index to be used to track cycling through the questionBank array
var indexCount = 0

// unitials cleared from any previous game plays
var userInitials =""

// user details from previous game plays retrieved from localStorage for use in high scores
var userDetailsArray = JSON.parse(localStorage.getItem("userDetailsArray")) || [];

// array with questions-answers to be cycled through the quiz game section
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

function init() {
    // displayStartPage()
    displayStartPage();
    // button to start quiz
    var startBtn = document.createElement("button")
    startBtnDiv.className = "btn btn-success";
    startBtn.textContent = "Start Game";
    startBtnDiv.appendChild(startBtn);
    // when start button clicked
    startBtn.addEventListener("click", function() {
        scoreCount = 1;
        displayQuizPage();
        populateQuesAns();
        startTimer();
        
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
// click event listener for each button populated for each question.
choicesID.addEventListener("click",function (event) {
    choiceResult.innerHTML = "";
    // If the click event is a button clicked...
    if (event.target.matches("button")) {
        // and if it is not the button on the final question....
        if(indexCount < questionBank.length - 1) {
            // and if the button clicked corresponds to the correct answer for that question...
            if(event.target.textContent === questionBank[indexCount].correctAnswer) {
                // give a congrats message.
                var congrats = document.createElement("a");
                congrats.className = "card-body text-success"
                congrats.textContent = "Correct!!! You know your stuff!!!"
                choiceResult.appendChild(congrats);
                // add to the index count in order to move to the next question
                indexCount++;
                // add one point to the user's score.
                scoreCount++
                // and populate the next question
                populateQuesAns()
            } 
            else {      //if the button clicked corresponds with a wrong answer, and is not the final question....
                var wrongAnswer = document.createElement("h1");
                wrongAnswer.className = "card-body text-danger"
                // give a wrong answer message.
                wrongAnswer.textContent = "You need to study more!"
                choiceResult.appendChild(wrongAnswer);
                // move to the next question
                indexCount++;
                // subtract a point from the user's score.
                scoreCount--;
                //populate next question
                populateQuesAns()
            }  
        } else {    //if the index count indicates that the last question has been attempted...
            displayResultPage()
            populateResult()
        }
    }
})

// timer function to count down from 20 seconds
function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        //populate timer display
        timerDisplayID.textContent = "time: " + secondsLeft;
        // if timer gets to zero, move to user result page.
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            // alert("You ran out of time");
            displayResultPage()
        // if user answers questions within 20 seconds, log time when finished fourth question.
        } else if (indexCount === questionBank.length - 1) {  //having an issue where timer stops after 3 clicks or not at all if I take away the '- 1'
            clearInterval(timerInterval);
            console.log(timerDisplayID.textContent);
        }
    }, 1000);
}
//need to figure out how to stop the timer if all questions have been asked with time left over.
// Issue with timer also not continuing on after third question answered.

// populate users result to result page.
function populateResult() {
    // If user got no answer's correct, say this
    if (scoreCount <= 0) {
        yourResult.textContent = "You chose no correct answers.";
    // If user got at least one answer correct, state number of answers correct.
    } else {
        yourResult.textContent = "You got " + scoreCount + " out of 4 questions correct.";
    }
}
// button to submit initials to high scores page
submitBtn.addEventListener("click", function() {
    event.preventDefault();
    userDetails = {
        name: initials.value,
        score: scoreCount,
        time: timerDisplayID.textcontent
    } //having an issue where name, score, and time are not defined in line 170
    userDetailsArray.push(userDetails);
    initials.value = "";
    localStorage.setItem("userDetailsArray", JSON.stringify(userDetailsArray));
    for (let i = 0; i < 10; i++) {
        rankItem = userDetailsArray[i];
        var rankItemLI = document.createElement("div");
        rankItemLI.className = "bg-primary border";
        rankItemLI.textContent = "Name: " + rankItem.name + "______Score: " + rankItem.score + "______Time Left: " + rankItem.time;
        scoreListDiv.appendChild(rankItemLI); 
    }
    displayHighScoresPage();
})


// If Play Again! button clicked, user taken back to start page and can play again.
playAgainBtn.addEventListener("click", function() {
    displayStartPage();
    secondsLeft = 20;
    indexCount = 0;
    scoreCount = 0;
})

// If Delete Scores button clicked, scores are deleted.
deleteScoresBtn.addEventListener("click", function() {
    localStorage.clear();
    rankItemLI.textContent = ""
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

init()
