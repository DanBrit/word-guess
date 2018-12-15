'use strict';


var wordBank = 
[
	"russian blue",
	"persian",
	"siamese",
	"scottish fold",
	"british shorthair",
	"maine coon",
	"munchkin",
	"ragdoll",
	"abyssinian",
	"sphynx",
	"bengal",
	"birman",
	"burmese",
	"bombay",
	"savannah",
	"balinese",
	"napolean",
];


var maxTries = 10;
var gameStart = false;
var gameFinish = false;
var lettersGuessed = [];
var currentWord;
var workingWord = [];
var remainingGuesses = 0;
var wins = 0;
var losses = 0;
//does not work 
var audio = new Audio('../audio/Cat-meow-3.mp3');


//need to create a function to return game back to its start state and resets all variables

function resetGame() {

	remainingGuesses = maxTries;
	gameStart = false;
	currentWord= Math.floor(Math.random()*(wordBank.length));
	lettersGuessed = [];
	workingWord = [];
	document.getElementById("hangman").src="assets/images/Hangman.png";

//pushes dashes into current word

for (var i =0;i<wordBank[currentWord].length; i++) {
	workingWord.push("_");
}

document.getElementById("tryAgain").style.cssText= "display: none";
document.getElementById("win-image").style.cssText= "display: none";
document.getElementById("loss-image").style.cssText= "display: none";
updateDisplay();

};

//updates elements on the HTML page

function updateDisplay() {
document.getElementById("totalWins").textContent = wins;
document.getElementById("totalLosses").textContent = losses;
document.getElementById("currentWord").textContent = "";
for (var i = 0; i < workingWord.length; i++) {
	document.getElementById("currentWord").textContent += workingWord [i];
}
document.getElementById("remainingGuesses").textContent = remainingGuesses;
document.getElementById("lettersGuessed").textContent = lettersGuessed;
if (remainingGuesses <= 0) {
	document.getElementById("loss-image").style.cssText = "display: block"
	document.getElementById("tryAgain").style.cssText = "display: block";
	losses ++;
	gameFinish = true;
}

};

//do not have enough time to fix but the below function does not always work as intended

function hangmanUpdate(){
document.getElementById("hangman").src="assets/images/hangman"+ (maxTries - remainingGuesses)+".png"

};



document.onkeydown = function(event) {
	if(gameFinish) {
		resetGame();
		gameFinish = false;
	}
	else {
		//controls A-Z preses
		if(event.keyCode >= 65 && event.keyCode <= 90 && event.keyCode)
			makeGuess(event.key.toLowerCase());
		//spacebar
		if(event.keyCode ==32)
			makeGuess(event.key.toLowerCase());
	}
};

function makeGuess(letter) {
	if (remainingGuesses > 0) {
		if (gameStart) {
			gameStart=true;
		}
	}

	if(lettersGuessed.indexOf(letter) === -1) {
		lettersGuessed.push(letter);
		evaluateGuess (letter);

	}
	updateDisplay();
	checkWin();
};

function evaluateGuess (letter) {
	var positions = [];

	for (var i = 0; i<wordBank[currentWord].length; i++){
		if(wordBank[currentWord][i] === letter) {
			positions.push(i);
		}
	}

	
	if (positions.length <=0) {
		remainingGuesses--;
		hangmanUpdate();
	} else {
		for(var i =0; i <positions.length; i++) {
			workingWord[positions[i]] = letter;
		}
	}
};



function checkWin() {
	if(workingWord.indexOf("_")=== -1) {
		document.getElementById("win-image").style.cssText="display: block";
		document.getElementById("tryAgain").style.cssText= "display: block";
		//audio does not play
		audio.play();
		wins ++;
		gameFinish = true;

	}
}











