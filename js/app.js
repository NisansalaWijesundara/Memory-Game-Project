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
let moves = 0;
let clickedCards = [];

function generateCards(card) {
  return `<li class="card"><i class="${card}"></i></li>`;
}

function startGame() {
  let cardHtml = shuffle(cardList).map(function(card) {
    return generateCards(card);
  });
  cards.innerHTML = cardHtml.join('');
}

startGame();




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
}

function move() {
  moves++;
  counter.innerHTML = moves;
}

function resetMoves(){
  moves = 0 ;
  counter.innerHTML = moves;
}
cards.addEventListener('click', event => {
  const clicked = event.target;
  if (event.target.tagName === 'LI' && clickedCards.length < 2 && !clicked.classList.contains('match')) {
    cardClicked(clicked);
    openCards(clicked);
    if (clickedCards.length === 2) {
checkForMatch(event);
move();
    }
  }
});

function cardClicked(event) {
  event.classList.toggle('open');
  event.classList.toggle('show');
}

function openCards(event) {
  clickedCards.push(event);
}

function checkForMatch(event) {
  if (clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className) {
    clickedCards[0].classList.toggle('match');
    clickedCards[1].classList.toggle('match');
    clickedCards = [];
  } else {
    setTimeout(() => {
      cardClicked(clickedCards[0]);
      cardClicked(clickedCards[1]);
      clickedCards = [];
    }, 1000);
  }
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
