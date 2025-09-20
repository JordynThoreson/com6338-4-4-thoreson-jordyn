var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

let wins = 0;
let losses = 0;
let remainingGuesses = 10;
let incorrectGuesses = [];
let guessedLetters = [];
let selectedWord = '';
let displayWord = '';

function startNewGame() {
  remainingGuesses = 10;
  incorrectGuesses = [];
  guessedLetters = [];
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord = '_'.repeat(selectedWord.length);

  document.getElementById('word-to-guess').textContent = displayWord;
  document.getElementById('incorrect-letters').textContent = '';
  document.getElementById('remaining-guesses').textContent = remainingGuesses;
  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
}

function updateDisplayWord() {
  let newWord = '';
  for (let i = 0; i < selectedWord.length; i++) {
    newWord += guessedLetters.includes(selectedWord[i]) ? selectedWord[i] : '_';
  }
  displayWord = newWord;
  document.getElementById('word-to-guess').textContent = displayWord;
}

document.onkeyup = function (e) {
  let userGuess = e.key.toLowerCase();

  if (userGuess.match(/^[a-z]$/) && !guessedLetters.includes(userGuess)) {
    guessedLetters.push(userGuess);

    if (selectedWord.includes(userGuess)) {
      updateDisplayWord();
    } else {
      remainingGuesses--;
      incorrectGuesses.push(userGuess);
      document.getElementById('incorrect-letters').textContent = incorrectGuesses.join(', ');
      document.getElementById('remaining-guesses').textContent = remainingGuesses;
    }

    if (displayWord === selectedWord) {
      wins++;
      document.getElementById('wins').textContent = wins;
      document.getElementById('previous-word').textContent = selectedWord;
      setTimeout(startNewGame);
    }
    else if (remainingGuesses === 0) {
      losses++;
      document.getElementById('losses').textContent = losses;
      document.getElementById('previous-word').textContent = selectedWord;
      setTimeout(startNewGame);
    }
  }
};

startNewGame();