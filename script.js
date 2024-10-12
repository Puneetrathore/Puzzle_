const cardsArray = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍍', '🥭', '🍑'];
let cards = [...cardsArray, ...cardsArray]; // Duplicate to have pairs
let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 60; // Game timer set to 60 seconds

const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

// Shuffle the cards
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// Initialize the game
function initializeGame() {
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    cards = shuffle(cards);
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-emoji', emoji);
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    startTimer();
}

// Flip card logic
function flipCard() {
    if (flippedCards.length === 2) return; // Prevent flipping more than two cards

    const card = this;
    const emoji = card.getAttribute('data-emoji');

    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.textContent = emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('You won! All pairs matched!'), 500);
            clearInterval(timer);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

// Timer function
function startTimer() {
    clearInterval(timer); // Reset timer

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Time\'s up! Game Over!');
            disableCards();
        }
    }, 1000);
}

// Disable all cards when the time is up
function disableCards() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

// Restart game
restartButton.addEventListener('click', initializeGame);

// Start the game for the first time
initializeGame();
