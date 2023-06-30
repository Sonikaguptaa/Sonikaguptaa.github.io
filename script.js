let gameInfo = {
    time: 0,
    winner: "",
    turn: 0,
    playerTurn: "",
    sign: "X",
    player: "Player1",
  },
  gameInProgress,
  numberOfGames = 1,
  currentPlayer,
  firstPlayer,
  currentSign,
  seconds,
  minutes,
  tableCheck = [];

document.getElementById("new-game").addEventListener("click", startGame);

function startGame() {
  gameInProgress = true;
  clearTable();
  document.getElementById("play-area").addEventListener("click", moveFlow);
  moveHistory = [];

  totalTime = "";
  seconds = 0;
  minutes = 0;
  gameInfo.turn = 0;
  gameInfo.winner = "";
  document.getElementById("turn").innerHTML = setTurn();
  gameInfo.time = new Date();
  currentSign = "X";
  player1Name = document.getElementById("player1").innerHTML;
  player2Name = document.getElementById("player2").innerHTML;

  if (numberOfGames === 1) {
    firstPlayer = player1Name;
  } else {
    modifyPlayersAndColors();
  }

  currentPlayer = firstPlayer;
  showCurrentPlayer(currentPlayer);

  for (let i = 0; i < 9; i++) {
    tableCheck[i] = i;
  }

  if (document.getElementById("stamp") !== null) {
    removeElement("stamp");
  }

  addStamp("Start!");
  setTimeout(stampFade, 1000);
  timeFlow = setInterval(startTime, 1000);
}

function moveFlow(event) {
  let cell = parseInt(event.target.id.match(/\d+/));

  if (!checkIfValidMove(cell)) {
    return;
  }

  drawMove(cell);
  ++gameInfo.turn;
  document.getElementById("turn").innerHTML = setTurn();
  currentSign = currentSign === "X" ? "O" : "X";

  if (checkWinner()) {
    addStamp(currentPlayer);
    gameInfo.winner = currentPlayer;
    gameLog.winner = currentPlayer;

    endGame();

    return true;
  }

  if (gameInfo.turn === 9) {
    addStamp("Draw!");
    gameInfo.winner = "Draw";
    gameLog.winner = "Draw";
    endGame();
    return true;
  }

  currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
  showCurrentPlayer(currentPlayer);
}

function endGame() {
  saveGameLog("Game Log");
  gameInProgress = false;
  ++numberOfGames;
  clearInterval(timeFlow);
  document.getElementById("play-area").removeEventListener("click", moveFlow);
  setTimeout(stampFade, 1000);
  setTimeout(removeElement.bind(null, "stamp"), 3000);
}

function clearTable() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell${i}`).classList.remove("signX");
    document.getElementById(`cell${i}`).classList.remove("signO");
  }
}

function startTime() {
  ++seconds;

  if (seconds >= 60) {
    seconds = 0;
    ++minutes;
  }

  let displayMinutes = minutes.toString().padStart(2, "0");
  let displaySeconds = seconds.toString().padStart(2, "0");
  totalTime = displayMinutes + ":" + displaySeconds;
  document.getElementById(
    "time"
  ).innerHTML = `Time: ${displayMinutes}:${displaySeconds}`;
}

function checkIfValidMove(cell) {
  if (
    !moveHistory.reduce(function (acc, item, index) {
      if (cell === item.cell) {
        acc = true;
      }
      return acc;
    }, false)
  ) {
    return true;
  } else {
    return false;
  }
}

function drawMove(cell) {
  moveHistory[gameInfo.turn] = {
    cell: cell,
    sign: currentSign,
    turn: gameInfo.turn + 1,
    playerName: currentPlayer,
  };
  tableCheck[cell] = currentSign;
  document.getElementById(`cell${cell}`).classList.add(`sign${currentSign}`);
}

function checkWinner() {
  if (tableCheck[0] === tableCheck[1] && tableCheck[0] === tableCheck[2])
    return true;
  else if (tableCheck[3] === tableCheck[4] && tableCheck[3] === tableCheck[5])
    return true;
  else if (tableCheck[6] === tableCheck[7] && tableCheck[6] === tableCheck[8])
    return true;
  else if (tableCheck[0] === tableCheck[3] && tableCheck[0] === tableCheck[6])
    return true;
  else if (tableCheck[1] === tableCheck[4] && tableCheck[1] === tableCheck[7])
    return true;
  else if (tableCheck[2] === tableCheck[5] && tableCheck[2] === tableCheck[8])
    return true;
  else if (tableCheck[0] === tableCheck[4] && tableCheck[0] === tableCheck[8])
    return true;
  else if (tableCheck[2] === tableCheck[4] && tableCheck[2] === tableCheck[6])
    return true;
}

function addStamp(name) {
  let text = "<p>Winner is</p>";

  if (name === "Start!" || name === "Draw!" || name === "Not finished") {
    text = "";
  }

  document.getElementById(
    "play-area"
  ).innerHTML += `<div id='stamp'>${text}<p>${name}</p></div>`;
  document.getElementById("stamp").classList.add("stamp");
}

function removeElement(id) {
  if (document.getElementById(id) === null) {
    return;
  }

  document.getElementById(id).remove();
}

function stampFade() {
  document.getElementById("stamp").classList.remove("stamp");
  document.getElementById("stamp").classList.add("fade");
  setTimeout(removeElement.bind(null, "stamp"), 2000);
}

function showCurrentPlayer(player) {
  if (player === player1Name) {
    document.getElementById("player1").classList.add("move-indicator");
    document.getElementById("player2").classList.remove("move-indicator");
  } else {
    document.getElementById("player2").classList.add("move-indicator");
    document.getElementById("player1").classList.remove("move-indicator");
  }
}
function setTurn() {
  return "Turn: " + gameInfo.turn;
}

// let cell0 = document.querySelector("#cell0");

// (cell0.style.borderWidth = " 0 "), "10px", "4px", "0";

// let cell1 = document.querySelector("#cell1");

// (cell1.style.borderWidth = "0"), "0", "4px", "4px", "4px";
