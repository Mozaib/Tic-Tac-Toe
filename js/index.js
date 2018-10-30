var myArray;
const player = 'O';
const comp = 'X';
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".statusPopup").style.display = "none";
	myArray = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', takeTurn, false);
	}
}

function takeTurn(square) {
	if (typeof myArray[square.target.id] == 'number') {
		turn(square.target.id, player)
		if (!checkForDraw()) turn(compTurn(), comp);
	}
}

function turn(squareId, player) {
	myArray[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let winner = checkForWinner(myArray, player)
	if (winner) endGame(winner)
}

function checkForWinner(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let winner = null;
	for (let [index, win] of winConditions.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			winner = {index: index, player: player};
			break;
		}
	}
	return winner;
}

function endGame(winner) {
	for (let index of winConditions[winner.index]) {
		document.getElementById(index).style.backgroundColor =
			winner.player == player ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', takeTurn, false);
	}
	showWinner(winner.player == player ? "You win!" : "You lose.");
}

function showWinner(who) {
	document.querySelector(".statusPopup").style.display = "block";
	document.querySelector(".statusPopup .text").innerText = who;
}

function emptySquares() {
	return myArray.filter(s => typeof s == 'number');
}

function compTurn() {
	return emptySquares()[0];
}

function checkForDraw() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', takeTurn, false);
		}
		showWinner("Tie Game!")
		return true;
	}
	return false;
}