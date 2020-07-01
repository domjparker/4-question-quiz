// variables made from elements grabbed from the start page
var startPage = document.querySelector("#startPage");
var startBtnDiv = document.querySelector("#startBtnDiv");
var hiScoreBtn = document.querySelector("#highScoreButton")
var timerDisplayID = document.querySelector("#timer");
var pageBody = document.querySelector("#pageBody")

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
var secondsLeft = 40

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
    // button created, given text, and appended
    var startBtn = document.createElement("button")
    startBtnDiv.className = "btn btn-success";
    startBtn.textContent = "Start Game";
    startBtnDiv.appendChild(startBtn);
    // when start button clicked
    startBtn.addEventListener("click", function() {
        scoreCount = 0;
        displayQuizPage();
        populateQuesAns();
        startTimer();
        
    })}

// if High Scores button clicked, high scores page is displayed.
hiScoreBtn.addEventListener("click", function() {
    displayHighScoresPage()
})

// function to push question and answer details to the DOM as they cycle through the questionBank array.
function populateQuesAns() {
    // choices cleared from any previous question cycles
    choicesID.innerHTML = "";
    // question for current index count given text and populated to quiz page
    questionID.textContent = questionBank[indexCount].question;
    // for each of the possible answers ...
    questionBank[indexCount].possibleAnswers.forEach(function (option) {
        // ...button element is created
        var button = document.createElement("button")
        // ...possible answer is given to the button
        button.textContent = option
        // ... and the button with text content is appended to the quiz page
        choicesID.appendChild(button)
    })
    
}
// click event listener is given to each button populated for each question.
choicesID.addEventListener("click",function (event) {
    choiceResult.innerHTML = "";
    // If the click event is a button clicked...
    if (event.target.matches("button")) {
        // and if it is not the button on the final question....
        if(indexCount < questionBank.length - 1) {
            // and if the button clicked corresponds to the correct answer for that question...
            if(event.target.textContent === questionBank[indexCount].correctAnswer) {
                // a congrats element is created and ...
                var congrats = document.createElement("h1");
                // ... is given classes,
                congrats.className = "card-body text-success"
                // ... is given text content,
                congrats.textContent = "Correct!!! You know your stuff!!!"
                // and is appended to the page for the duration of the next question
                choiceResult.appendChild(congrats);
                // index count increases by 1 in order to move to the next question
                // indexCount++;
                // one point is added to the user's score.
                scoreCount++
                console.log(scoreCount)
                // and quiz moves on to the next question
                populateQuesAns()
            } 
            else {      //if the button clicked corresponds with a wrong answer, and is not the final question....
                var wrongAnswer = document.createElement("h1");
                wrongAnswer.className = "card-body text-danger"
                // give a wrong answer message.
                wrongAnswer.textContent = "You need to study more!"
                choiceResult.appendChild(wrongAnswer);
                // move to the next question
                // indexCount++;
                // deduct time from timer
                secondsLeft= secondsLeft -10
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
        if(secondsLeft === 0 ) {
            clearInterval(timerInterval);
            // alert("You ran out of time");
            displayResultPage()
        
        // if user answers questions within 0 seconds, log time when finished fourth question.
        } else if (indexCount === questionBank.length -1) {  //having an issue where timer stops after 3 clicks or not at all if I take away the '- 1'
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
    if (initials.value !==""){

    
    userDetails = {
        name: initials.value,
        score: secondsLeft,
        time: secondsLeft
    } //having an issue where name, score, and time are not defined in line 170

// Write the logic to order the list

    if(userDetailsArray.length >10){
        userDetailsArray.shift()
    }
    userDetailsArray.push(userDetails);
    initials.value = "";
    localStorage.setItem("userDetailsArray", JSON.stringify(userDetailsArray));
}
if(userDetailsArray.length >0){
    console.log(userDetailsArray);
    
    for (let i = 0; i < userDetailsArray.length; i++) {
        //rankItem = userDetailsArray[i];
        var rankItemLI = document.createElement("div");
        rankItemLI.className = "bg-primary border";
        rankItemLI.textContent = "Name: " + userDetailsArray[i].name + "______Score: " + userDetailsArray[i].score + "______Time Left: " + userDetailsArray[i].time;
        scoreListDiv.appendChild(rankItemLI); 
    }

    displayHighScoresPage();
}
})


// If Play Again! button clicked, user taken back to start page and can play again.
playAgainBtn.addEventListener("click", function() {
    displayStartPage();
    secondsLeft = 40;
    indexCount = 0;
    scoreCount = 0;
})

// If Delete Scores button clicked, scores are deleted.
deleteScoresBtn.addEventListener("click", function() {
    localStorage.clear();
    scoreListDiv.innerHTML=""
})

// Display Page Functions
function displayStartPage(){
    startPage.style.display = "block";
    quizPage.style.display = "none";
    resultPage.style.display = "none";
    highScorePage.style.display = "none";
    timerDisplayID.style.display = "block";
    hiScoreBtn.style.display = "block";
    pageBody.style.background = "darkorange";
}

function displayQuizPage(){
    startPage.style.display = "none";
    quizPage.style.display = "block";
    resultPage.style.display = "none";
    highScorePage.style.display = "none";
    timerDisplayID.style.display = "block";
    hiScoreBtn.style.display = "block";
    pageBody.style.background = "cyan";
}

function displayResultPage(){
    startPage.style.display = "none";
    quizPage.style.display = "none";
    resultPage.style.display = "block";
    highScorePage.style.display = "none";
    hiScoreBtn.style.display = "none";
    timerDisplayID.style.display = "block";
    pageBody.style.background = "hotpink";
}

function displayHighScoresPage(){
    startPage.style.display = "none";
    quizPage.style.display = "none";
    resultPage.style.display = "none";
    highScorePage.style.display = "block";
    hiScoreBtn.style.display = "none";
    timerDisplayID.style.display = "none";
    pageBody.style.background = "blueviolet";
}

init()
