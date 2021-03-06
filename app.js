// document.addEventListener("DomContentLoaded", () => {
const squares = document.querySelectorAll(".grid div");
const result = document.querySelector("#result");
const resetBtn = document.querySelector(".reset");
const displayCurrentPlayer = document.querySelector("#current-player");
let currentPlayer = 1;
let isPlaying = true;

const winningArrays = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

squares.forEach((sq, i) => {
  sq.addEventListener("click", () => {
    if (!isPlaying) return;
    if (sq.classList.contains("taken")) return;

    // if the square below your current square is taken, you can go on top of it

    if (squares[i + 7].classList.contains("taken")) {
      dropDisc(sq, i, currentPlayer === 1 ? "one" : "two");
    }

    // if the square below your current square is not taken, you can't go here
    else {
      sq.style.backgroundColor = "red";

      setTimeout(() => {
        sq.style.backgroundColor = null;
      }, 250);
    }

    checkWinning();
  });
});

function dropDisc(sq, i, player) {
  sq.classList.add("taken");
  sq.classList.add(`player-${player}`);
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  displayCurrentPlayer.innerHTML = currentPlayer;
}

function checkWinning() {
  // now take the 4 values in each winningArrays and plug them into the squares
  winningArrays.forEach((sq, i) => {
    const sq1 = squares[winningArrays[i][0]];
    const sq2 = squares[winningArrays[i][1]];
    const sq3 = squares[winningArrays[i][2]];
    const sq4 = squares[winningArrays[i][3]];

    // Now check those arrays to see if they all have the class of player one
    if (
      sq1.classList.contains("player-one") &&
      sq2.classList.contains("player-one") &&
      sq3.classList.contains("player-one") &&
      sq4.classList.contains("player-one")
    ) {
      isPlaying = false;
      sq1.style.backgroundColor = "green";
      sq2.style.backgroundColor = "green";
      sq3.style.backgroundColor = "green";
      sq4.style.backgroundColor = "green";
      result.innerHTML = "Player One wins!";
    } else if (
      sq1.classList.contains("player-two") &&
      sq2.classList.contains("player-two") &&
      sq3.classList.contains("player-two") &&
      sq4.classList.contains("player-two")
    ) {
      isPlaying = false;
      sq1.style.backgroundColor = "red";
      sq2.style.backgroundColor = "red";
      sq3.style.backgroundColor = "red";
      sq4.style.backgroundColor = "red";
      result.innerHTML = "Player two wins!";
    }
  });
}

function init() {
  currentPlayer = 1;
  isPlaying = true;
  displayCurrentPlayer.innerHTML = currentPlayer;

  squares.forEach((sq, i) => {
    sq.style.backgroundColor = null;
    sq.classList.remove("player-one");
    sq.classList.remove("player-two");
    if (i < 42) sq.classList.remove("taken");
  });
}

resetBtn.addEventListener("click", init);
