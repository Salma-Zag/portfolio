---
layout: base
title: OOP Breakout
permalink: /oopbreakoutgame
---


<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">

  <header class="post-header">

  <div class="post-content e-content" itemprop="articleBody"><style>
  canvas {
    background: #000;
    display: block;
    margin: 0 auto;
    border: 1px solid #333;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background: #f0f0f0;
  }

  .title {
    margin-top: 5px !important;
  }

  .back-button {
    margin-bottom: 5px !important;
  }

  #gameInfoUI {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  color: #d17cf9ff;
  text-shadow: 2px 2px 0 #000;
}

.ui-box {
  background-color: #222;
  border: 2px solid #d17cf9ff;
  padding: 10px 16px;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0 0 10px #d17cf9ff;
  transition: all 0.3s ease;
}
</style>

<div id="gameInfoUI" style="text-align:center; margin: 20px 0;">
  <div id="scoreDisplay" class="ui-box">Score: 0</div>
  <div id="livesDisplay" class="ui-box">Lives: 3</div>
  <div id="levelDisplay" class="ui-box">Level: 1</div>
</div>

<canvas id="gameCanvas" width="600" height="400"></canvas>

<div class="controls" style="text-align: center; margin: 20px 0;">
    <button id="startBtn" style="margin: 5px; padding: 10px 16px; font-size: 16px; font-weight: 600; border: 1px solid #222; background: #fff; cursor: pointer; border-radius: 8px; color: #111;">Start Game</button>
    <button id="pauseBtn" disabled="" style="margin: 5px; padding: 10px 16px; font-size: 16px; font-weight: 600; border: 1px solid #222; background: #fff; cursor: pointer; border-radius: 8px; color: #111;">Pause</button>
    <button id="resetBtn" style="margin: 5px; padding: 10px 16px; font-size: 16px; font-weight: 600; border: 1px solid #222; background: #a52c2cff; cursor: pointer; border-radius: 8px; color: #111;">Reset</button>
    <button id="nextLevelBtn" style="display:none;margin:10px auto 0;padding:10px 16px;font-family:system-ui,Arial;font-size:16px;font-weight:600;border:1px solid #222;background:#fff;cursor:pointer;border-radius:8px;color:#111 !important;">Next Level ▶</button>
</div>



<script>
  // Base GameObject class - provides common functionality
  class GameObject {
      constructor(x, y) {
          this.x = x;
          this.y = y;
      }
      
      draw(ctx) {
          // Base draw method - to be overridden
      }
      
      update() {
          // Base update method - to be overridden
      }
  }

  // Ball class - handles ball physics and movement
  class Ball extends GameObject {
      constructor(x, y, radius = 8) {
          super(x, y);
          this.radius = radius;
          this.dx = 4;
          this.dy = -4;
          this.color = "#ad6bebff";
      }
      
      draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
      }
      
      update(canvasWidth, canvasHeight) {
          // Wall collision
          if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
              this.dx = -this.dx;
          }
          if (this.y + this.dy < this.radius) {
              this.dy = -this.dy;
          }
          
          this.x += this.dx;
          this.y += this.dy;
      }
      
      reset(canvasWidth, canvasHeight) {
          this.x = canvasWidth / 2;
          this.y = canvasHeight - 30;
          const speed = Math.hypot(this.dx, this.dy);
          const angle = (Math.PI / 6) + Math.random() * (Math.PI / 3);
          const sign = Math.random() < 0.5 ? -1 : 1;
          this.dx = sign * speed * Math.cos(angle);
          this.dy = -Math.abs(speed * Math.sin(angle));
      }
      
      speedUp(multiplier = 1.12) {
          const currentSpeed = Math.hypot(this.dx, this.dy) * multiplier;
          const theta = Math.atan2(this.dy, this.dx);
          this.dx = currentSpeed * Math.cos(theta);
          this.dy = currentSpeed * Math.sin(theta);
      }
      
      collidesWith(obj) {
          return (
              this.x > obj.x &&
              this.x < obj.x + obj.width &&
              this.y > obj.y &&
              this.y < obj.y + obj.height
          );
      }
      
      collidesWithPaddle(paddle) {
        const nextX = this.x + this.dx;
        const nextY = this.y + this.dy;

        const ballLeft = nextX - this.radius;
        const ballRight = nextX + this.radius;
        const ballBottom = nextY + this.radius;
        const ballTop = nextY - this.radius;

        const paddleTop = paddle.canvasHeight - paddle.height;
        const paddleLeft = paddle.x;
        const paddleRight = paddle.x + paddle.width;

        return (
            ballBottom >= paddleTop &&
            ballTop <= paddleTop + paddle.height &&
            ballRight >= paddleLeft &&
            ballLeft <= paddleRight
        );

      }
  }

  // Paddle class - handles paddle movement and controls
  class Paddle extends GameObject {
      constructor(x, y, canvasWidth, canvasHeight) {
          super(x, y);
          this.canvasWidth = canvasWidth;
          this.canvasHeight = canvasHeight;
          this.baseWidth = 80;
          this.width = this.baseWidth;
          this.height = 10;
          this.color = "#bf48eeff";
          this.speed = 10;
          this.leftPressed = false;
          this.rightPressed = false;
      }
      
      draw(ctx) {
          ctx.beginPath();
          ctx.rect(this.x, this.canvasHeight - this.height, this.width, this.height);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
      }
      
      update() {
          if (this.rightPressed && this.x < this.canvasWidth - this.width) {
              this.x += this.speed;
          } else if (this.leftPressed && this.x > 0) {
              this.x -= this.speed;
          }
      }
      
      setPosition(x) {
          if (x > 0 && x < this.canvasWidth) {
              this.x = x - this.width / 2;
          }
      }
      
      reset() {
          this.x = (this.canvasWidth - this.width) / 2;
          this.width = this.baseWidth;
      }
      
      applyPowerUp(type) {
          if (type === "wide") {
              this.width = this.baseWidth + 40;
          }
      }
      
      resetPowerUp() {
          this.width = this.baseWidth;
      }
  }

  // Brick class - individual brick with power-up capability
  class Brick extends GameObject {
      constructor(x, y, width = 75, height = 20) {
          super(x, y);
          this.width = width;
          this.height = height;
          this.status = 1; // 1 = active, 0 = destroyed
          this.hasPowerUp = Math.random() < 0.3; // 30% chance
          this.color = this.hasPowerUp ? "gold" : "#bf72f3ff";
      }
      
      draw(ctx) {
          if (this.status === 1) {
              ctx.beginPath();
              ctx.rect(this.x, this.y, this.width, this.height);
              
              if (this.hasPowerUp) {
                  ctx.fillStyle = this.color;
                  ctx.shadowColor = "orange";
                  ctx.shadowBlur = 10;
              } else {
                  ctx.fillStyle = this.color;
                  ctx.shadowBlur = 0;
              }
              
              ctx.fill();
              ctx.closePath();
          }
      }
      
      destroy() {
          this.status = 0;
      }
      
      isActive() {
          return this.status === 1;
      }
  }

  // PowerUp class - falling power-ups with effects
  class PowerUp extends GameObject {
      constructor(x, y) {
          super(x, y);
          this.size = 20;
          this.fallSpeed = 3;
          this.active = true;
          this.type = "wide"; // could be expanded for different types
      }
      
      draw(ctx) {
          if (this.active) {
              // Create gradient effect
              const gradient = ctx.createRadialGradient(
                  this.x, this.y, 5, this.x, this.y, this.size
              );
              gradient.addColorStop(0, "yellow");
              gradient.addColorStop(1, "red");
              
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
              ctx.fillStyle = gradient;
              ctx.fill();
              ctx.closePath();
              
              // Draw "P" text
              ctx.fillStyle = "black";
              ctx.font = "bold 14px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText("P", this.x, this.y);
          }
      }
      
      update(canvasHeight) {
          if (this.active) {
              this.y += this.fallSpeed;
              if (this.y > canvasHeight) {
                  this.active = false;
              }
          }
      }
      
      collidesWithPaddle(paddle) {
          return (
              this.active &&
              this.y + this.size / 2 >= paddle.canvasHeight - paddle.height &&
              this.x > paddle.x &&
              this.x < paddle.x + paddle.width
          );
      }
      
      collect() {
          this.active = false;
      }
  }

  // Main Game class - controls game state and orchestrates everything
  class Game {
      constructor(canvasId) {
          this.canvas = document.getElementById(canvasId);
          this.ctx = this.canvas.getContext("2d");
          this.width = this.canvas.width;
          this.height = this.canvas.height;
          
          // Game state
          this.score = 0;
          this.lives = 3;
          this.level = 1;
          this.paused = false;
          this.gameRunning = false;
          
          // Game objects
          this.ball = new Ball(this.width / 2, this.height - 30);
          this.paddle = new Paddle((this.width - 75) / 2, this.height - 10, this.width, this.height);
          this.bricks = [];
          this.powerUps = [];
          
          // Power-up state
          this.activePowerUp = null;
          this.powerUpTimer = 0;
          this.powerUpDuration = 5000; // 5 seconds
          
          // Brick configuration
          this.brickRows = 4;
          this.brickCols = 6;
          this.brickPadding = 10;
          this.brickOffsetTop = 30;
          this.brickOffsetLeft = 50;
          
          this.setupEventListeners();
          this.initBricks();
      }
      
      setupEventListeners() {
          // Keyboard controls
          document.addEventListener("keydown", (e) => {
              if (e.key === "Right" || e.key === "ArrowRight") {
                  this.paddle.rightPressed = true;
              } else if (e.key === "Left" || e.key === "ArrowLeft") {
                  this.paddle.leftPressed = true;
              }
          });
          
          document.addEventListener("keyup", (e) => {
              if (e.key === "Right" || e.key === "ArrowRight") {
                  this.paddle.rightPressed = false;
              } else if (e.key === "Left" || e.key === "ArrowLeft") {
                  this.paddle.leftPressed = false;
              }
          });
          
          // Mouse controls
          this.canvas.addEventListener("mousemove", (e) => {
              const relativeX = e.clientX - this.canvas.offsetLeft;
              this.paddle.setPosition(relativeX);
          });
          
          // Button controls
          document.getElementById("startBtn").addEventListener("click", () => this.start());
          document.getElementById("pauseBtn").addEventListener("click", () => this.togglePause());
          document.getElementById("resetBtn").addEventListener("click", () => this.reset());
          document.getElementById("nextLevelBtn").addEventListener("click", () => this.nextLevel());
      }
      
      initBricks() {
          this.bricks = [];
          for (let c = 0; c < this.brickCols; c++) {
              for (let r = 0; r < this.brickRows; r++) {
                  const x = c * (75 + this.brickPadding) + this.brickOffsetLeft;
                  const y = r * (20 + this.brickPadding) + this.brickOffsetTop;
                  this.bricks.push(new Brick(x, y));
              }
          }
      }
      
      start() {
          this.gameRunning = true;
          this.paused = false;
          document.getElementById("startBtn").disabled = true;
          document.getElementById("pauseBtn").disabled = false;
          this.gameLoop();
      }
      
      togglePause() {
          this.paused = !this.paused;
          document.getElementById("pauseBtn").textContent = this.paused ? "Resume" : "Pause";
          if (!this.paused) {
              this.gameLoop();
          }
      }
      
      reset() {
          this.score = 0;
          this.lives = 3;
          this.level = 1;
          this.brickRows = 4;
          this.paused = false;
          this.gameRunning = false;
          
          this.ball.reset(this.width, this.height);
          this.paddle.reset();
          this.powerUps = [];
          this.activePowerUp = null;
          
          this.initBricks();
          
          document.getElementById("startBtn").disabled = false;
          document.getElementById("pauseBtn").disabled = true;
          document.getElementById("pauseBtn").textContent = "Pause";
          document.getElementById("nextLevelBtn").style.display = "none";
          
          this.draw();
      }
      
      nextLevel() {
          this.level++;
          this.ball.speedUp(1.12);
          
          if (this.brickRows < 8) {
              this.brickRows++;
          }
          
          this.initBricks();
          this.ball.reset(this.width, this.height);
          this.paddle.reset();
          this.powerUps = [];
          this.activePowerUp = null;
          
          this.paused = false;
          document.getElementById("nextLevelBtn").style.display = "none";
          this.gameLoop();
      }
      
 collisionDetection() {
    for (let brick of this.bricks) {
        if (!brick.isActive()) continue;

        const nextX = this.ball.x + this.ball.dx;
        const nextY = this.ball.y + this.ball.dy;

        const ballLeft = nextX - this.ball.radius;
        const ballRight = nextX + this.ball.radius;
        const ballTop = nextY - this.ball.radius;
        const ballBottom = nextY + this.ball.radius;

        const brickLeft = brick.x;
        const brickRight = brick.x + brick.width;
        const brickTop = brick.y;
        const brickBottom = brick.y + brick.height;

        const isColliding =
            ballRight > brickLeft &&
            ballLeft < brickRight &&
            ballBottom > brickTop &&
            ballTop < brickBottom;

        if (isColliding) {
            // Determine the side of collision
            const overlapX = Math.min(ballRight - brickLeft, brickRight - ballLeft);
            const overlapY = Math.min(ballBottom - brickTop, brickBottom - ballTop);

            if (overlapX < overlapY) {
                this.ball.dx = -this.ball.dx; // Side hit
            } else {
                this.ball.dy = -this.ball.dy; // Top/bottom hit
            }

            brick.destroy();
            this.score++;
            this.updateInfoUI();

            if (brick.hasPowerUp) {
                this.powerUps.push(new PowerUp(brick.x + brick.width / 2, brick.y));
            }

            // Only one brick collision per frame to prevent bouncing weirdly
            break;
        }
    }
}
      
      updatePowerUps() {
          for (let powerUp of this.powerUps) {
              powerUp.update(this.height);
              
              if (powerUp.collidesWithPaddle(this.paddle)) {
                  powerUp.collect();
                  this.paddle.applyPowerUp(powerUp.type);
                  this.activePowerUp = powerUp.type;
                  this.powerUpTimer = Date.now();
              }
          }
          
          // Check power-up timer
          if (this.activePowerUp) {
              const elapsed = Date.now() - this.powerUpTimer;
              if (elapsed > this.powerUpDuration) {
                  this.activePowerUp = null;
                  this.paddle.resetPowerUp();
              }
          }
          
          // Remove inactive power-ups
          this.powerUps = this.powerUps.filter(p => p.active);
      }
      
      checkWinCondition() {
          const activeBricks = this.bricks.filter(brick => brick.isActive()).length;
          if (activeBricks === 0) {
              this.paused = true;
              document.getElementById("nextLevelBtn").style.display = "block";
              return true;
          }
          return false;
      }
      
      checkBallCollision() {
          // Ball hits bottom
          if (this.ball.y + this.ball.dy > this.height - this.ball.radius) {
              if (this.ball.collidesWithPaddle(this.paddle)) {
                  this.ball.dy = -this.ball.dy;
              } else {
                  this.lives--;
                  this.updateInfoUI();
                  if (this.lives === 0) {
                      this.gameOver();
                  } else {
                      this.ball.reset(this.width, this.height);
                      this.paddle.reset();
                  }
              }
          }
      }
      
      gameOver() {
          this.gameRunning = false;
          this.paused = true;
          alert(`GAME OVER! Final Score: ${this.score}`);
          this.reset();
          this.updateInfoUI();
      }
      
     
      }
      
      update() {
          if (this.paused || !this.gameRunning) return;
          
          this.ball.update(this.width, this.height);
          this.paddle.update();
          this.updatePowerUps();
          this.collisionDetection();
          this.checkBallCollision();
          
          if (this.checkWinCondition()) return;
      }
      
      draw() {
          // Clear canvas
          this.ctx.clearRect(0, 0, this.width, this.height);
          
          // Draw all game objects
          for (let brick of this.bricks) {
              brick.draw(this.ctx);
          }
          
          this.ball.draw(this.ctx);
          this.paddle.draw(this.ctx);
          
          for (let powerUp of this.powerUps) {
              powerUp.draw(this.ctx);
          }
          
      }
       updateInfoUI() {
            document.getElementById("scoreDisplay").textContent = "Score: " + this.score;
            document.getElementById("livesDisplay").textContent = "Lives: " + this.lives;
            document.getElementById("levelDisplay").textContent = "Level: " + this.level;
}
      
      gameLoop() {
          if (this.paused || !this.gameRunning) return;
          
          this.update();
          this.draw();
          
          requestAnimationFrame(() => this.gameLoop());
      }
  }

  // Initialize the game
  const game = new Game("gameCanvas");
  
  // Initial draw
  game.draw();
</script>


  </div><a class="u-url" href="/oopbreakoutgame" hidden></a>
</article>