document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const startBtn = document.querySelector("#start-btn");
  const resetBtn = document.querySelector("#reset-btn");
  const newGameBtn = document.querySelector("#new-game-btn");
  const startModal = document.querySelector("#start-modal");
  const winnerModal = document.querySelector("#winner-modal");
  const winnerMsg = document.querySelector("#winner-msg");
  const closeBtn = document.querySelector(".close-btn");

  let isPlayerXTurn = true;
  let gameStarted = false;

  const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  let xWins = 0;
  let oWins = 0;

  const startGame = () => {
      gameStarted = true;
      startModal.classList.add("hide");
      resetGame(); // Initialize the game state
  };

  const resetGame = () => {
      isPlayerXTurn = true;
      enableBoxes();
      winnerModal.classList.add("hide"); // Hide winner modal
  };

  const enableBoxes = () => {
      boxes.forEach(box => {
          box.disabled = !gameStarted; // Enable boxes if the game has started
          box.innerText = ""; // Clear box text
      });
  };

  const disableBoxes = () => {
      boxes.forEach(box => {
          box.disabled = true; // Disable all boxes
      });
  };

  const showWinner = (winner) => {
      winnerMsg.innerText = `Congratulations! The winner is ${winner}`;
      winnerModal.classList.remove("hide"); // Show the modal
      disableBoxes(); // Disable all boxes

      // Update win counts
      if (winner === "X") {
          xWins++;
      } else if (winner === "O") {
          oWins++;
      }
      updateWinCounts();
  };

  const showDraw = () => {
      winnerMsg.innerText = "It's a draw!";
      winnerModal.classList.remove("hide"); // Show the modal
      disableBoxes(); // Disable all boxes
  };

  const checkWinner = () => {
      for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if (pos1Val && pos1Val === pos2Val && pos1Val === pos3Val) {
              showWinner(pos1Val); // Show winner if a match is found
              return;
          }
      }

      // Check for draw if no winner is found
      const isDraw = Array.from(boxes).every(box => box.innerText !== "");
      if (isDraw) {
          showDraw(); // Show draw if all boxes are filled
      }
  };

  boxes.forEach((box) => {
      box.addEventListener("click", () => {
          if (!box.disabled && gameStarted) { // Ensure box is clickable and the game has started
              box.innerText = isPlayerXTurn ? "X" : "O"; // Set the box value
              isPlayerXTurn = !isPlayerXTurn; // Switch turn
              box.disabled = true; // Disable the clicked box
              checkWinner(); // Check for winner or draw
          }
      });
  });

  startBtn.addEventListener("click", startGame); // Start the game
  resetBtn.addEventListener("click", resetGame); // Reset the game
  newGameBtn.addEventListener("click", startGame); // Start a new game

  closeBtn.addEventListener("click", () => {
      winnerModal.classList.add("hide");
  });
});
