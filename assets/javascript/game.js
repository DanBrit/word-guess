'use strict';
// create a word list
// name other required variables


//create a function that will reset game and all variables on load and reset or loss

//

var wordBank = 
[
	"russian-blue",
	"persian",
	"siamese",
	"scottish-fold",
	"british-shorthair",
	"maine-coon",
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
var currentWordIndex;
var workingWord = [];
var remainingGuesses = 0;
var wins = 0;


function resetGame() {

	remainingGuesses = maxTries;
	gameStart = false;
	currentWordIndex= Math.floor(Math.random()*(wordBank.length));
	lettersGuessed = [];
	workingWord = [];
document.getElementById("hangman").src="../images/Hangman.png";

for (var i =0;i<wordBank[currentWordIndex].length; i++) {
	workingWord.push("_");
}

document.getElementById("PressKeyTryAgain").style.cssText= "display: none";
document.getElementById("win-image").style.cssText= "display: none";
document.getElementById("loss-image").style.cssText= "display: none";
updateDisplay();

};

//updates to html

function updateDisplay() {
document.getElementById("totalWins").textContent = wins;
document.getElementById("currentWordIndex").textContent = "";
for (var i = 0; i < workingWord.length; i++) {
	document.getElementById("currentWordIndex").textContent += workingWord [i];
}
document.getElementById("remainingGuesses").textContent = remainingGuesses;
document.getElementById("lettersGuessed").textContent = lettersGuessed;
if (remainingGuesses <= 0) {
	// game over image
	document.getElementById("PressKeyTryAgain").style.cssText = "display: block";
	gameFinish = true;
}

};
function hangmanUpdate(){
document.getElementById("hangman").src="../images/hangman"+ (maxTries - remainingGuesses)+".png"

};

document.onkeydown = function(event) {
	if(gameFinish) {
		resetGame();
		gameFinish = false;
	}
	else {
		if(event.keyCode >= 65 && event.keyCode <= 90)
			makeGuess(event.key.toLowerCase());
	}
};

function makeGuess(letter) {
	if (remainingGuesses > 0) {
		if (!gameStart) {
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

	for (var i = 0; i<wordBank[currentWordIndex].length; i++){
		if(wordBank[currentWordIndex][i] === letter) {
			positions.push(i);
		}
	}

	//for statement update hangman

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
		// win message or image document.getElementById;
		document.getElementById("PressKeyTryAgain").style.cssText= "display: block";
		wins ++;
		gameFinish = true;

	}
}











