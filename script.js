const score1Ele = document.getElementById("player1-score");
const score2Ele = document.getElementById("player2-score");
const current1Ele = document.getElementById("player1-current");
const current2Ele = document.getElementById("player2-current");
const rollBtn = document.getElementById("roll");
const holdBtn = document.getElementById("hold");
const newGameBtn = document.getElementById("new-game");
const dice = document.getElementById("dice");
const player1NameEle = document.getElementById("player1-name");
const player2NameEle = document.getElementById("player2-name");
const nums = [1, 2, 3, 4, 5, 6, 7];
const losingNums = [1];
const winningScore = 100;
let currentDice = 0,
  player1Score = 0,
  player2Score = 0,
  player1Current = 0,
  player2Current = 0,
  activePlayer = false;

addEventListener("load", () => {
  resetAll();
  // getPlayersNames();
});
document.addEventListener("DOMContentLoaded", resetAll);
newGameBtn.addEventListener("click", resetAll);
rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdDice);

function notifyListeners() {
  score1Ele.textContent = player1Score;
  score2Ele.textContent = player2Score;
  current1Ele.textContent = player1Current;
  current2Ele.textContent = player2Current;
  if (!activePlayer) {
    // Player 1 is active
    score1Ele.parentElement.classList.add("active-player");
    score2Ele.parentElement.classList.remove("active-player");
  } else {
    // Player 2 is active
    score1Ele.parentElement.classList.remove("active-player");
    score2Ele.parentElement.classList.add("active-player");
  }
}

function resetAll() {
  player1Score = 0;
  player2Score = 0;
  player1Current = 0;
  player2Current = 0;
  activePlayer = false;
  notifyListeners();
  dice.style.opacity = 0;
  rollBtn.removeAttribute("disabled");
  holdBtn.removeAttribute("disabled");
  score1Ele.parentElement.classList.remove("winner-player");
  score2Ele.parentElement.classList.remove("winner-player");
};

function rollDice() {
  let diceNum = Math.floor(Math.random() * (Math.max(...nums) - (Math.min(...nums) + 1))) + Math.min(...nums);

  if (diceNum == currentDice) {
    rollDice();
    return;
  } else {
    currentDice = diceNum;
  }

  if (diceNum == 6) {
    console.log(`diceNum == 6`);
  }
  if (diceNum == 7) {
    console.log(`diceNum == 7`);
  }

  console.log(diceNum, typeof diceNum);

  dice.style.opacity = "1";
  dice.classList.value = `dice dice-${diceNum}`;

  handlePlayersCurrent(diceNum);
}

function holdDice() {
  if (!activePlayer) {
    player1Score += player1Current;
    player1Current = 0;
  } else {
    player2Score += player2Current;
    player2Current = 0;
  }
  activePlayer = !activePlayer;
  notifyListeners();
  checkWinner();
}

function handlePlayersCurrent(diceNum) {
  if (losingNums.includes(diceNum)) {
    if (!activePlayer) {
      player1Current = 0;
    } else {
      player2Current = 0;
    }
    activePlayer = !activePlayer;
  } else {
    if (!activePlayer) {
      player1Current += diceNum;
    } else {
      player2Current += diceNum;
    }
  }
  notifyListeners();
}

function checkWinner() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    if (player1Score >= winningScore) {
      // Player 1 wins
      score1Ele.parentElement.classList.add("active-player", "winner-player");
      score2Ele.parentElement.classList.remove("active-player");
    } else if (player2Score >= winningScore) {
      // Player 2 wins
      score2Ele.parentElement.classList.add("active-player", "winner-player");
      score1Ele.parentElement.classList.remove("active-player");
    }
    rollBtn.setAttribute("disabled", "");
    holdBtn.setAttribute("disabled", "");
    dice.style.opacity = 0;
  }
}

function getPlayersNames() {
  player1NameEle.innerHTML = window.prompt("First Player's Name: ", "player 1 name");
  player2NameEle.innerHTML = window.prompt("Second Player's Name: ", "player 2 name");
}
