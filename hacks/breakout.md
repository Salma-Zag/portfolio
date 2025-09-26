---
layout: base
title: OOP Breakout
permalink: /breakout
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
      <button id="pauseBtn" disabled style="margin: 5px; padding: 10px 16px; font-size: 16px; font-weight: 600; border: 1px solid #222; background: #fff; cursor: pointer; border-radius: 8px; color: #111;">Pause</button>
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
    draw(ctx) {}
    update() {}
  }

  // Ball class
  class Ball extends GameObject {
    constructor(x, y, radius = 8) {
      super(x, y);
      this.radius = radius;
      this.dx = 4;
      this.dy = -4;
      this.color = "#ad6bebff";
      this.colors = ["#ad6bebff", "#f3a6f3", "#6be8ff", "#ff6b6b", "#ffd36b"];
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update(canvasWidth, canvasHeight) {
      // Predict next position
      const nextX = this.x + this.dx;
      const nextY = this.y + this.dy;

      // Wall collision (left/right)
      if (nextX > canvasWidth - this.radius || nextX < this.radius) {
        this.dx = -this.dx;
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }
      // Top
      if (nextY < this.radius) {
        this.dy = -this.dy;
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }

      // Apply movement
      this.x += this.dx;
      this.y += this.dy;
    }

    reset(canvasWidth, canvasHeight) {
      this.x = canvasWidth / 2;
      this.y = canvasHeight - 60;
      const speed = Math.max(4, Math.hypot(this.dx, this.dy));
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
      // Simple bounding check (point-in-rect style) - ok for most brick collisions here
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

  // Paddle class
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
      // clamp
      if (this.x < 0) this.x = 0;
      if (this.x > this.canvasWidth - this.width) this.x = this.canvasWidth - this.width;
    }

    setPosition(x) {
      // center paddle on x
      if (typeof x !== "number") return;
      this.x = x - this.width / 2;
      if (this.x < 0) this.x = 0;
      if (this.x > this.canvasWidth - this.width) this.x = this.canvasWidth - this.width;
    }

    reset() {
      this.width = this.baseWidth;
      this.x = (this.canvasWidth - this.width) / 2;
    }

    applyPowerUp(type) {
      if (type === "wide") {
        this.width = this.baseWidth + 40;
        if (this.x > this.canvasWidth - this.width) this.x = this.canvasWidth - this.width;
      }
    }

    resetPowerUp() {
      this.width = this.baseWidth;
      if (this.x > this.canvasWidth - this.width) this.x = this.canvasWidth - this.width;
    }
  }

  // Brick class
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
        ctx.shadowBlur = 0;
      }
    }

    destroy() {
      this.status = 0;
    }

    isActive() {
      return this.status === 1;
    }
  }

  // PowerUp class
  class PowerUp extends GameObject {
    constructor(x, y) {
      super(x, y);
      this.size = 20;
      this.fallSpeed = 3;
      this.active = true;
      this.type = "wide"; // could extend later
    }

    draw(ctx) {
      if (this.active) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 5, this.x, this.y, this.size);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "red");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

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
        if (this.y - this.size / 2 > canvasHeight) this.active = false;
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

  // Main Game class
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
      this.ball = new Ball(this.width / 2, this.height - 60);
      this.paddle = new Paddle((this.width - 80) / 2, this.height - 10, this.width, this.height);
      this.bricks = [];
      this.powerUps = [];

      // Power-up state
      this.activePowerUp = null;
      this.powerUpTimer = 0;
      this.powerUpDuration = 5000; // milliseconds

      // Brick configuration
      this.brickRows = 4;
      this.brickCols = 6;
      this.brickPadding = 10;
      this.brickOffsetTop = 30;
      this.brickOffsetLeft = 50;
      this.brickWidth = 75;
      this.brickHeight = 20;

      this.setupEventListeners();
      this.initBricks();
      this.updateInfoUI();
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
        const rect = this.canvas.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        this.paddle.setPosition(relativeX);
      });

      // Touch controls (mobile)
      this.canvas.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches.length) {
          const rect = this.canvas.getBoundingClientRect();
          const touchX = e.touches[0].clientX - rect.left;
          this.paddle.setPosition(touchX);
        }
        e.preventDefault();
      }, { passive: false });

      // Button controls
      document.getElementById("startBtn").addEventListener("click", () => this.start());
      document.getElementById("pauseBtn").addEventListener("click", () => this.togglePause());
      document.getElementById("resetBtn").addEventListener("click", () => this.reset());
      document.getElementById("nextLevelBtn").addEventListener("click", () => this.nextLevel());
    }

    initBricks() {
      this.bricks = [];
      for (let r = 0; r < this.brickRows; r++) {
        for (let c = 0; c < this.brickCols; c++) {
          const x = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const y = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks.push(new Brick(x, y, this.brickWidth, this.brickHeight));
        }
      }
    }

    start() {
      if (this.gameRunning) return;
      this.gameRunning = true;
      this.paused = false;
      document.getElementById("startBtn").disabled = true;
      document.getElementById("pauseBtn").disabled = false;
      document.getElementById("pauseBtn").textContent = "Pause";
      this.ball.reset(this.width, this.height);
      this.gameLoop();
    }

    togglePause() {
      if (!this.gameRunning) return;
      this.paused = !this.paused;
      document.getElementById("pauseBtn").textContent = this.paused ? "Resume" : "Pause";
      if (!this.paused) this.gameLoop();
    }

    reset() {
      this.score = 0;
      this.lives = 3;
      this.level = 1;
      this.brickRows = 4;
      this.paused = false;
      this.gameRunning = false;

      this.ball = new Ball(this.width / 2, this.height - 60);
      this.paddle = new Paddle((this.width - 80) / 2, this.height - 10, this.width, this.height);
      this.powerUps = [];
      this.activePowerUp = null;

      this.initBricks();

      document.getElementById("startBtn").disabled = false;
      document.getElementById("pauseBtn").disabled = true;
      document.getElementById("pauseBtn").textContent = "Pause";
      document.getElementById("nextLevelBtn").style.display = "none";

      this.updateInfoUI();
      this.draw();
    }

    nextLevel() {
      this.level++;
      this.ball.speedUp(1.12);

      if (this.brickRows < 8) this.brickRows++;

      this.initBricks();
      this.ball.reset(this.width, this.height);
      this.paddle.reset();
      this.powerUps = [];
      this.activePowerUp = null;

      this.paused = false;
      document.getElementById("nextLevelBtn").style.display = "none";
      this.updateInfoUI();
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
          // Determine overlap to decide whether to invert dx or dy
          const overlapX = Math.min(ballRight - brickLeft, brickRight - ballLeft);
          const overlapY = Math.min(ballBottom - brickTop, brickBottom - ballTop);

          if (overlapX < overlapY) {
            // side collision
            this.ball.dx = -this.ball.dx;
          } else {
            // top/bottom collision
            this.ball.dy = -this.ball.dy;
          }

          // color change on brick hit
          this.ball.color = this.ball.colors[Math.floor(Math.random() * this.ball.colors.length)];

          brick.destroy();
          this.score++;
          this.updateInfoUI();

          if (brick.hasPowerUp) {
            // spawn power-up at brick center
            this.powerUps.push(new PowerUp(brick.x + brick.width / 2, brick.y + brick.height / 2));
          }

          // Only handle one brick collision this frame
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
      // Called after ball.update() so ball has already moved.
      // Check bottom (miss or paddle)
      if (this.ball.y + this.ball.radius > this.height) {
        // If paddle collision detected (use collidesWithPaddle with future movement)
        if (this.ball.collidesWithPaddle(this.paddle)) {
          // reflect and tweak dx based on where it hit the paddle for more control
          const hitPos = (this.ball.x - (this.paddle.x + this.paddle.width / 2)) / (this.paddle.width / 2);
          const maxBounceAngle = Math.PI / 3; // 60 degrees
          const angle = hitPos * maxBounceAngle;
          const speed = Math.hypot(this.ball.dx, this.ball.dy);
          this.ball.dx = speed * Math.sin(angle);
          this.ball.dy = -Math.abs(speed * Math.cos(angle));
          // small nudge and color change to indicate paddle bounce
          this.ball.color = this.ball.colors[Math.floor(Math.random() * this.ball.colors.length)];
        } else {
          // missed paddle
          this.lives--;
          this.updateInfoUI();
          if (this.lives === 0) {
            this.gameOver();
            return;
          } else {
            this.ball.reset(this.width, this.height);
            this.paddle.reset();
            return;
          }
        }
      }
    }

    gameOver() {
      this.gameRunning = false;
      this.paused = true;
      setTimeout(() => {
        alert(`GAME OVER! Final Score: ${this.score}`);
        this.reset();
      }, 10);
      this.updateInfoUI();
    }

    update() {
      if (this.paused || !this.gameRunning) return;

      // Move ball (it handles left/right/top bounces)
      this.ball.update(this.width, this.height);

      // Update other objects
      this.paddle.update();
      this.updatePowerUps();

      // Check collisions with bricks
      this.collisionDetection();

      // Check bottom/paddle/miss
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

      // Power-up timer bar
      if (this.activePowerUp) {
        const elapsed = Date.now() - this.powerUpTimer;
        const remaining = Math.max(0, this.powerUpDuration - elapsed);
        const barHeight = 100;
        const barWidth = 10;
        const fillHeight = (remaining / this.powerUpDuration) * barHeight;

        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.width - 20, 30, barWidth, barHeight);

        this.ctx.fillStyle = "lime";
        this.ctx.fillRect(
          this.width - 20,
          30 + (barHeight - fillHeight),
          barWidth,
          fillHeight
        );

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.width - 20, 30, barWidth, barHeight);
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

  </div><a class="u-url" href="/popcornhack2" hidden></a>
</article>