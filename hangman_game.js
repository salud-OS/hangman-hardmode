const wordList = [
    "affix", "avenue", "awkward", "beekeeper", "boggle", "cobweb", "cycle", 
    "disavow", "duplex", "equip", "exodus", "funny", "galaxy", "gossip", 
    "icebox", "injury", "ivory", "jackpot", "jelly", "jockey", "joking", "joyful", "jumbo",
    "kayak", "khaki", "kiosk", "lengths", "lucky", "luxury", "lymph", "nightclub",
    "onyx", "ovary", "pajama", "pneumonia", "pshaw", "puppy", "scratch", "staff", "stretch"
];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var assignedWord;
var guessCount = 9;
var guessLetter;
var correctLetters = [];
const word = document.querySelector("#word");
const keyboard = document.querySelector(".keyboard");
const screenText = document.querySelector('#guessesRemaining');
const resetButton = document.querySelector("#gameReset");

// Assign a random word from the wordList array
function wordAssignment() {
    let assignedWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("CHEAT! ASSIGNED WORD IS: " + assignedWord);
    return assignedWord;
}

// Create empty list of letters
function drawBlanks() {
  for(let i = 0; i < assignedWord.length; i++) {
    const hiddenLetter = document.createElement('li');
    hiddenLetter.innerHTML = "_";
    word.appendChild(hiddenLetter);
  }
}

// Create on-screen keyboard -- is able to be modified to include additional characters if necessary for other languages.
function createKeyboard() {
  for(let i = 0; i < letters.length; i++) {
    const keyButton = document.createElement("button")
    keyButton.innerText = letters[i];
    keyboard.appendChild(keyButton);
    keyButton.addEventListener("click", function(event) {wordCheck(event.target, letters[i])});
  }
}

// check if letter is used in word
function wordCheck(keyButton, guessLetter) {
  // letter found
  if(assignedWord.includes(guessLetter)) {
    for(let i = 0; i < assignedWord.length; i++) {
      if(assignedWord[i] === guessLetter) {
        word.querySelectorAll("li")[i].innerHTML = guessLetter;
        correctLetters.push(guessLetter);
      }
    }
  }
  // letter not found
  else {
    guessCount--;
    hangmanUpdate(guessCount);
    screenText.innerText = "Guess Count: " + guessCount;
    if (guessCount <= 0) {
      document.querySelector(".hangman").src = "img/hangman_1.gif";
      screenText.innerText = "Sorry partner, you lost.... Word was: " + assignedWord;
      keyboard.style.display = 'none';
    }
  }
  // disable button after entering
  keyButton.disabled = true;
  if(assignedWord.length === correctLetters.length) {
    document.querySelector(".hangman").src = "img/hangman_won.gif";
    screenText.innerText = "Winner! You live to see another day. Word was: " + assignedWord;
    keyboard.style.display = 'none';
  }
}

// update hangman img
function hangmanUpdate(guessCount) {
  document.querySelector(".hangman").src = "img/hangman_" + guessCount + ".gif";
}

// starts a new game when hit reset button
resetButton.addEventListener("click", function gameReset() {
  guessCount = 9;
  document.querySelector(".hangman").src = "img/hangman_10.gif";
  correctLetters = []
  assignedWord = wordAssignment(); 
  screenText.innerHTML = "Guess Count: " + guessCount; 
  //Re-enable keyboard
  const disabledKeyButtons = keyboard.querySelectorAll("button:disabled");
  disabledKeyButtons.forEach(button => {
    button.disabled = false;
  });
  keyboard.style.display = 'flex';
  // Create new blank letter space
  word.innerHTML = '';
  drawBlanks();
  console.log("Game Reset");
  }
)

// Game run
screenText.innerHTML = "Guess Count: " + guessCount;
assignedWord = wordAssignment();
createKeyboard();
drawBlanks();