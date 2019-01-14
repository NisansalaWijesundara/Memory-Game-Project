const cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
const cards = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const counter = document.querySelector('.moves');
const timer = document.querySelector('.timer');
const resetGame = restart.addEventListener('click', reset);
const starRate = Array.from(document.querySelectorAll('.stars li'));
const congrat_modal = document.querySelector('.congratulation_modal');
const modal_close = document.getElementById('close');
const game_play_again = document.getElementById('game_play');
let moves = 0;
let clickedCards = [];
let matchedCards = 0;
let clock;
let cardpairs = 8;
let minutes = 0;
let seconds = 0;
startGame();

function generateCards(card) {
	return `<li class="card"><i class="${card}"></i></li>`;
}

function startGame() {
	let cardHtml = shuffle(cardList).map(function(card) {
		return generateCards(card);
	});
	cards.innerHTML = cardHtml.join('');
	flipCards();
}

function flipCards() {
	cards.addEventListener('click', event => {
		const clicked = event.target;
		if (event.target.tagName === 'LI' && clickedCards.length < 2 && !clicked.classList.contains('match')) {
			clickCards(clicked);
			openCards(clicked);
			if (clickedCards.length === 2) {
				countMoves();
				rating();
				checkForMatch(event);
			}
		}
	});
}

function checkForMatch(event) {
	if (clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className) {
		clickedCards[0].classList.toggle('match');
		clickedCards[1].classList.toggle('match');
		matchedCards++;
		clickedCards = [];
		win();
	} else {
		setTimeout(() => {
			clickCards(clickedCards[0]);
			clickCards(clickedCards[1]);
			clickedCards = [];
		}, 1000);
	}
}

function win() {
	if (matchedCards === cardpairs) {
		clearInterval(clock);
		gameScore();
	}
}

function clickCards(event) {
	event.classList.toggle('open');
	event.classList.toggle('show');
}

function openCards(event) {
	clickedCards.push(event);
}

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function resetCardDeck() {
	let shuffleCards = Array.from(document.querySelectorAll('.deck li'));
	let shuffledCard = shuffle(shuffleCards);
	for (card of shuffledCard) {
		card.className = 'card';
		cards.appendChild(card);
	}
}

function countMoves() {
	moves++;
	counter.innerHTML = `${moves} Moves`;
	if (moves === 1) {
		setTime();
	}
}

function resetMoves() {
	moves = 0;
	counter.innerHTML = `${moves} Moves`;
}

function rating() {
	if (moves > 8 && moves < 15) {
		for (star of starRate) {
			star.style.visibility = "visible";
		}
	} else if (moves > 16 && moves < 18) {
		for (star of starRate) {
			star.style.visibility = "collapse";
			break;
		}
	} else if (moves > 19) {
		for (star of starRate) {
			starRate[2].style.visibility = "collapse";
		}
	}
}

function resetRating() {
	for (star of starRate) {
		star.style.visibility = "visible";
	}
}

function setTime() {
	clock = setInterval(() => {
		timer.innerHTML = `${minutes} mins ${seconds} secs `;
		seconds++;
		if (seconds === 60) {
			minutes++;
			seconds = 0;
		}
	}, 1000);
}

function resetTime() {
	minutes = 0;
	seconds = 0;
	timer.innerHTML = `${minutes} mins ${seconds} secs `;
	clearInterval(clock);
}

function reset() {
	resetCardDeck();
	resetMoves();
	resetRating();
	resetTime();
}

function gameScore() {
	congrat_modal.style.display = "block";
	const finalTime = document.querySelector('.time');
	const totalMoves = document.querySelector('.final_moves');
	const totalRate = document.querySelector('.final_rate');
	let starRating = document.querySelector(".stars").innerHTML;
	let totalTime = timer.innerHTML;
	totalRate.innerHTML = `You got  ${starRating}  stars and `;
	totalMoves.innerHTML = `You made ${moves} moves`;
	finalTime.innerHTML = `in ${totalTime}`;
	modal_close.addEventListener("click", resetScore);
	game_play_again.addEventListener("click", gamePlayAgain);
}

function resetScore() {
	matchedCards = 0;
	congrat_modal.style.display = "none";
}

function gamePlayAgain() {
	matchedCards = 0;
	reset();
	resetScore();
}
