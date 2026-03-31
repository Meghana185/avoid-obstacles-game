let car = document.getElementById("car");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let gameOverScreen = document.getElementById("gameOverScreen");
let finalScore = document.getElementById("finalScore");

let gameArea = document.getElementById("gameArea");
let homeScreen = document.getElementById("homeScreen");

let carX = 175;
let score = 0;
let gameRunning = false;
let isPaused = false;

// ▶️ START GAME
function startGame() {
  homeScreen.style.display = "none";
  gameArea.style.display = "block";

  document.getElementById("controls").style.display = "flex";

  carX = gameArea.clientWidth / 2 - 25; // center car
  car.style.left = carX + "px";

  score = 0;
  scoreDisplay.innerText = score;

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

// 🚗 KEYBOARD CONTROL
document.addEventListener("keydown", function(e) {
  if (!gameRunning || isPaused) return;

  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

// 📱 MOBILE BUTTON CONTROLS
function moveLeft() {
  if (!gameRunning || isPaused) return;

  if (carX > 0) {
    carX -= 25;
    car.style.left = carX + "px";
  }
}

function moveRight() {
  if (!gameRunning || isPaused) return;

  let maxWidth = gameArea.clientWidth - 50;

  if (carX < maxWidth) {
    carX += 25;
    car.style.left = carX + "px";
  }
}

// 🚧 OBSTACLE MOVEMENT
function moveObstacle() {
  let obstacleY = 0;
  let obstacleX = Math.random() * (gameArea.clientWidth - 50);
  obstacle.style.left = obstacleX + "px";

  let interval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(interval);
      return;
    }

    if (isPaused) return;

    obstacleY += 6;
    obstacle.style.top = obstacleY + "px";

    // COLLISION DETECTION
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

    // RESET OBSTACLE
    if (obstacleY > gameArea.clientHeight) {
      obstacleY = 0;
      obstacleX = Math.random() * (gameArea.clientWidth - 50);
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

// 🔄 RESTART
function restartGame() {
  location.reload();
}
