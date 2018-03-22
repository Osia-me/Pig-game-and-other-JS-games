/*YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls tin a row.wo 6  After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
//Done with condition: if(!(dice === 6 &&& dice1 === 6))

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score
 of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google 
 to figure this out :)
//input with number type is included in HTML, Js - eventListener to input

3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, diceDisplay;
diceDisplay = document.querySelectorAll(".dice");
winningScore = 100;
init();

var dice1;

// Hit the roll btn
document.querySelector(".btn-roll").addEventListener("click", function(){
	if (gamePlaying){
		// 1. Random number
		dice= Math.floor(Math.random() * 6) + 1;
		dice1 = Math.floor(Math.random() * 6) + 1;
		//in order to have random number from 1 to 6 for dice
		
		//if((dice + dice1) !== 12) {
		if(!(dice=== 6 && dice1 === 6)){

			// 2. Display the result of current score
			

			for(var i = 0; i < diceDisplay.length; i++){
				diceDisplay[i].style.display = "block";
			}

			diceDisplay[0].src = "dice-" + dice + ".png";
			diceDisplay[1].src = "dice-" + dice1 + ".png";

			document.querySelector("#current-" + activePlayer).textContent = dice + dice1;
			//to display score for the selected player (0 or 1);

			// 3. Update the round score IF the rolled number is NOT a 1
			if (!(dice === 1 || dice1 === 1)) {
				// add score
				roundScore +=dice +dice1;
				document.querySelector("#current-" + activePlayer).textContent = roundScore;
			} else {
				// Next player
				nextPlayer();
			}
		} else {
			scores[activePlayer] = 0;
			document.querySelector("#score-" + activePlayer).textContent = 0;
			nextPlayer();
		}
		//Second var in order to check if both of them is 6 or not
		console.log(dice, dice1);
		console.log(activePlayer);
	}
	
});

document.querySelector(".btn-hold").addEventListener("click", function(){
	if(gamePlaying){
		// Add current score to global score
		scores[activePlayer] += roundScore;	
		//Update User Interface
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
		//Check if player won the game
		if(scores[activePlayer] >= winningScore){
			document.querySelector("#name-" + activePlayer).textContent = "Winner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

			//set game to Over
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
	

});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer (){

		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		// if(activePlayer ===0){
		// 	activePlayer = 1;
		// } else {
		// 	activePlayer = 0;
		// }
		roundScore = 0;

		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";

		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");

		for(var i = 0; i < diceDisplay.length; i++){
			diceDisplay[i].style.display = "none";
		}
}

document.querySelector("input").addEventListener("change", function(){
	document.getElementById("winningScore").textContent = this.value;
	winningScore = this.value;
	init();
});

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	for(var i = 0; i < diceDisplay.length; i++){
			diceDisplay[i].style.display = "none";
		}

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.querySelector("#name-0").textContent = "Player 1";
	document.querySelector("#name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.add("active");
	document.querySelector(".player-1-panel").classList.remove("active");
}

