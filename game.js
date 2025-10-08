const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const paddleWidth = 15;
const paddleHeight = 80;
const ballRadius = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Player Paddle (Left)
let playerY = (canvasHeight - paddleHeight) / 2;

// AI Paddle (Right)
let aiY = (canvasHeight - paddleHeight) / 2;
const aiSpeed = 4;

// Ball
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawNet() {
  ctx.strokeStyle = "#555";
  for (let i = 0; i < canvasHeight; i += 30) {
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, i);
    ctx.lineTo(canvasWidth / 2, i + 20);
    ctx.stroke();
  }
}

function resetBall() {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
  ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function updateAI() {
  // Move AI paddle toward ball
  let target = ballY - paddleHeight / 2;
  if (aiY < target) {
    aiY += aiSpeed;
    if (aiY > target) aiY = target;
  } else if (aiY > target) {
    aiY -= aiSpeed;
    if (aiY < target) aiY = target;
  }
  // Boundaries
  aiY = Math.max(0, Math.min(canvasHeight - paddleHeight, aiY));
}

function draw() {
  // Clear canvas
  drawRect(0, 0, canvasWidth, canvasHeight, "#111");

  // Draw net
  drawNet();

  // Draw paddles
  drawRect(0, playerY, paddleWidth, paddleHeight, "#fff");
  drawRect(canvasWidth - paddleWidth, aiY, paddleWidth, paddleHeight, "#fff");

  // Draw ball
  drawCircle(ballX, ballY, ballRadius, "#f5d442");
}

function update() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvasHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Left paddle collision
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    // Add some "spin" based on hit position
    let collidePoint = ballY - (playerY + paddleHeight / 2);
    ballSpeedY += collidePoint * 0.15;
    ballX = paddleWidth + ballRadius; // Prevent sticking
  }

  // Right paddle collision
  if (
    ballX + ballRadius > canvasWidth - paddleWidth &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    let collidePoint = ballY - (aiY + paddleHeight / 2);
    ballSpeedY += collidePoint * 0.15;
    ballX = canvasWidth - paddleWidth - ballRadius; // Prevent sticking
  }

  // Score or reset if ball goes past paddles
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvasWidth) {
    resetBall();
  }

  updateAI();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Mouse movement for player paddle
canvas.addEventListener('mousemove', function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  playerY = mouseY - paddleHeight / 2;
  // Boundaries
  playerY = Math.max(0, Math.min(canvasHeight - paddleHeight, playerY));
});

gameLoop();