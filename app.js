let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let modal = document.querySelector("#winner-modal");
let winnerMsg = document.querySelector("#winner-msg");
let closeBtn = document.querySelector(".close-btn");
let xWinsElem = document.querySelector("#x-wins");
let oWinsElem = document.querySelector("#o-wins");

let turn0 = true; // player1, player2

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let xWins = 0;
let oWins = 0;

// Reset Game Boxes

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  modal.classList.add("hide");
};

// Enable and disable boxes

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Show Winner in Modal

const showWinner = (winner) => {
  winnerMsg.innerText = `Congratulations! The winner is ${winner}`;
  modal.classList.remove("hide");
  disabledBoxes();

  // Update win counts
  
  if (winner === "X") {
    xWins++;
    xWinsElem.innerText = xWins;
  } else if (winner === "O") {
    oWins++;
    oWinsElem.innerText = oWins;
  }
};

// Show Draw in Modal

const showDraw = () => {
  winnerMsg.innerText = "It's a draw!";
  modal.classList.remove("hide");
  disabledBoxes();
};

// Check for Winner or Draw

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return; // Exit loop early once a winner is found
      }
    }
  }
  
  // Check for draw if no winner is found
  const isDraw = Array.from(boxes).every(box => box.innerText !== "");
  if (isDraw) {
    showDraw();
  }
};

// Event Listeners for Game Actions
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// Close Modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hide");
});
