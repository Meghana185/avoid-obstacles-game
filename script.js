let car = document.getElementById("car");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let gameOverScreen = document.getElementById("gameOverScreen");
let finalScore = document.getElementById("finalScore");

let gameArea = document.getElementById("gameArea");
let homeScreen = document.getElementById("homeScreen");

let carX = 175;
let score = 0;
let gameRunning = false; // 🔥 start only after Play
let isPaused = false;

// ▶️ START GAME
function startGame() {
  homeScreen.style.display = "none";
  gameArea.style.display = "block";

  gameRunning = true;
  moveObstacle();
}

// ⏸️ PAUSE / RESUME
function togglePause() {
  isPaused = !isPaused;

  let btn = document.getElementById("pauseBtn");

  if (isPaused) {
    btn.innerText = "Resume";
  } else {
    btn.innerText = "Pause";
  }
}

// 🚗 Move car
document.addEventListener("keydown", function(e) {
  if (!gameRunning || isPaused) return;

  if (e.key === "ArrowLeft" && carX > 0) {
    carX -= 25;
  }
  if (e.key === "ArrowRight" && carX < 350) {
    carX += 25;
  }

  car.style.left = carX + "px";
});

// 🚧 Obstacle movement
function moveObstacle() {
  let obstacleY = 0;
  let obstacleX = Math.random() * 350;
  obstacle.style.left = obstacleX + "px";

  let interval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(interval);
      return;
    }

    if (isPaused) return; // 🔥 pause logic

    obstacleY += 6;
    obstacle.style.top = obstacleY + "px";

    // Collision detection
    let carRect = car.getBoundingClientRect();
    let obsRect = obstacle.getBoundingClientRect();

    if (
      carRect.left < obsRect.right &&
      carRect.right > obsRect.left &&
      carRect.top < obsRect.bottom &&
      carRect.bottom > obsRect.top
    ) {
      gameOver();
    }

    // Reset obstacle
    if (obstacleY > 500) {
      obstacleY = 0;
      obstacleX = Math.random() * 350;
      obstacle.style.left = obstacleX + "px";

      score++;
      scoreDisplay.innerText = score;
    }

  }, 30);
}

// ❌ GAME OVER
function gameOver() {
  gameRunning = false;
  finalScore.innerText = score;
  gameOverScreen.style.display = "flex";
}

// 🔄 Restart
function restartGame() {
  location.reload();
}