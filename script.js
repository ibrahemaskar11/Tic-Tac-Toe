"use strict";
const cells = document.querySelectorAll(".cell");
let circleTurn;
const board = document.querySelector(".container");
const winningMessage = document.querySelector(".message-text");
const winningMessageDiv = document.querySelector(".message");
const restart = document.querySelector(".restart");
let xClass = "x";
let circleClass = "o";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target.id;
  const targeted = document.getElementById(cell);
  const currentTurn = circleTurn ? circleClass : xClass;
  targeted.classList.add(currentTurn);
  if (checkwin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function swapTurn() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}
function checkwin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
    winningMessageDiv.classList.toggle("hidden");
  } else {
    winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    winningMessageDiv.classList.toggle("hidden");
  }
}
function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

function startGame() {
  cells.forEach((el) => {
    el.addEventListener("click", handleClick, { once: true });
  });
}

restart.addEventListener("click", function () {
  circleTurn = false;
  setBoardHoverClass();
  winningMessageDiv.classList.add("hidden");
  cells.forEach((el) => {
    el.classList.remove(xClass);
    el.classList.remove(circleClass);
  });
  startGame();
});

startGame();
