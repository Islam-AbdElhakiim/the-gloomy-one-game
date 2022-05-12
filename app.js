/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let user1Score,
	user2Score,
	current,
	dice = document.querySelector(".dice"),
	current1 = document.querySelector("#current-0"),
	current2 = document.querySelector("#current-1"),
	score1 = document.querySelector("#score-0"),
	score2 = document.querySelector("#score-1"),
	player1Panel = document.querySelector(".player-0-panel"),
	player2Panel = document.querySelector(".player-1-panel"),
	holdBtn = document.querySelector(".btn-hold"),
	rollBtn = document.querySelector(".btn-roll"),
	newBtn = document.querySelector(".btn-new");

let player1 = {
	score: user1Score,
	current: current1,
	scoreSpan: score1,
	playerPane: player1Panel,
};
let player2 = {
	score: user2Score,
	current: current2,
	scoreSpan: score2,
	playerPane: player2Panel,
};

function init() {
	//init globals
	current = 0;
	currentPlayer = player2;
	changePlayer();
	//init player1
	player1.score = 0;
	player1.current.innerText = 0;
	player1.scoreSpan.innerText = 0;

	//init player2
	player2.score = 0;
	player2.current.innerText = 0;
	player2.scoreSpan.innerText = 0;

	//init btns
	holdBtn.classList.remove("disabled");
	holdBtn.disabled = false;
	rollBtn.classList.remove("disabled");
	rollBtn.disabled = false;
}

function rollDice(player) {
	let rolled = Math.floor(Math.random() * 6 + 1);
	dice.src = `assets/dice-${rolled}.png`;
	if (rolled != 1) {
		current += rolled;
	} else {
		current = 0;
		changePlayer();
	}
	player.current.innerText = current;

	if (player.score + current >= 10) {
		player.scoreSpan.innerHTML = `<h3 style="color: green">Winner!</h3>`;
		holdBtn.classList.add("disabled");
		holdBtn.disabled = true;
		rollBtn.classList.add("disabled");
		rollBtn.disabled = true;
	}
}

function hold() {
	currentPlayer.score += current;
	currentPlayer.scoreSpan.innerText = currentPlayer.score;
	current = 0;
	currentPlayer.current.innerHTML = 0;
	changePlayer();
}

function changePlayer() {
	currentPlayer = currentPlayer == player1 ? player2 : player1;

	player1.playerPane.classList.remove("active");
	player2.playerPane.classList.remove("active");
	currentPlayer.playerPane.classList.add("active");
}

rollBtn.addEventListener("click", () => {
	rollDice(currentPlayer);
});

holdBtn.addEventListener("click", () => {
	hold();
});

newBtn.addEventListener("click", () => init());

init();
