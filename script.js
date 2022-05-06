import { WORDS } from './words.js';

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
const rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(rightGuessString);

// Delete last inserted character

function deleteLetter() {
  let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = '';
  box.classList.remove('filled-box');
  currentGuess.pop();
  nextLetter -= 1;
}
// Add new character to next box

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
  let box = row.children[nextLetter];
  box.textContent = pressedKey;
  box.classList.add('filled-box');
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

// Keyboard Event Listeners

document.addEventListener('keyup', (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === 'Backspace' && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === 'Enter') {
    checkGuess();
    return;
  }

  if (pressedKey >= 'a' && pressedKey <= 'z') {
    insertLetter(pressedKey);
  }
});

// Check if the current guess is right or not

function checkGuess() {
  let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
  let guessString = '';
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    alert('Not enough letters!');
    return;
  }

  if (!WORDS.includes(guessString)) {
    alert('Word not in list!');
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = '';
    let box = row.children[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = 'grey';
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = 'green';
      } else {
        // shade box yellow
        letterColor = 'yellow';
      }

      rightGuess[letterPosition] = '#';
    }

    let delay = 250 * i;
    setTimeout(() => {
      //shade box
      box.style.backgroundColor = letterColor;
    }, delay);
  }

  if (guessString === rightGuessString) {
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      alert("You've run out of guesses! Game over!");
      document.getElementById('answer').textContent = 'Answer is ' + rightGuessString;
    }
  }
}
