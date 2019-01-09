/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
const cards = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const counter = document.querySelector('.moves');
const timer = document.querySelector('.timer');

let moves = 0;
let clickedCards = [];
let matched = 0;
let clock;

startGame();

function generateCards(card) {
  return `<li class="card"><i class="${card}"></i></li>`;
}

function startGame() {
  let cardHtml = shuffle(cardList).map(function(card) {
    return generateCards(card);
  });
  cards.innerHTML = cardHtml.join('');
}

cards.addEventListener('click', event => {
  const clicked = event.target;
  if (event.target.tagName === 'LI' && clickedCards.length < 2 && !clicked.classList.contains('match')) {
    cardClicked(clicked);
    openCards(clicked);
    if (clickedCards.length === 2) {
      checkForMatch(event);
      move();
      rating();
    }
  }
});

function checkForMatch(event) {
  if (clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className) {
    clickedCards[0].classList.toggle('match');
    clickedCards[1].classList.toggle('match');
    clickedCards = [];
    matched++;
    if (matched === 8) {
      clearInterval(clock);
      gameScore();
    }
  } else {
    setTimeout(() => {
      cardClicked(clickedCards[0]);
      cardClicked(clickedCards[1]);
      clickedCards = [];
    }, 1000);
  }
}

function cardClicked(event) {
  event.classList.toggle('open');
  event.classList.toggle('show');
}

function openCards(event) {
  clickedCards.push(event);
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

restart.addEventListener('click', reset);

function resetCardDeck() {
  let shuffleCards = Array.from(document.querySelectorAll('.deck li'));
  let shuffledCard = shuffle(shuffleCards);
  for (card of shuffledCard) {
    card.className = 'card';
    cards.appendChild(card);
  }
}

function reset() {
  resetCardDeck();
  resetMoves();
  resetRating();
  resetTime();
}

function move() {
  moves++;
  counter.innerHTML = moves;
  if (moves === 1) {
    setTime();
  }
}

function resetMoves() {
  moves = 0;
  counter.innerHTML = moves;
}

const starRate = Array.from(document.querySelectorAll('.stars li'));

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

let minutes = 0;
let seconds = 0;

function setTime() {
  clock = setInterval(() => {
    timer.innerHTML = `mins ${minutes} secs ${seconds}`;
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

function resetTime() {
  timer.innerHTML = "mins 0 secs 0";
  clearInterval(clock);
}

const congrat_modal = document.querySelector('.congratulation_modal');
const modal_close = document.getElementById('close');
const game_play_again = document.getElementById('game_play');

function gameScore() {
  congrat_modal.style.display = "block";
  const finalTime = document.querySelector('.time');
  const totalMoves = document.querySelector('.final_moves');
  const totalRate = document.querySelector('.final_rate');
  const star_rate = getFinalRate();

  totalRate.innerHTML = `You got ${star_rate} stars and`
  totalMoves.innerHTML = `You made ${moves} moves`;
  finalTime.innerHTML = ` in ${minutes} minutes and ${seconds} seconds.`;


  close();
  playAgain();
}

let star_count = 0;

function getFinalRate() {
  for (star of starRate) {
    if (star.style.display !== "none") {
      star_count++;
    }
    return star_count;
  }
}

function close() {
  modal_close.addEventListener("click", event => {
    congrat_modal.style.display = "none";
  });
}

function playAgain() {
  game_play_again.addEventListener("click", event => {
    congrat_modal.style.display = "none";
    reset();
  });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
