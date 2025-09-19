---
layout: base
title: OOP Breakout Lesson
permalink: /breakout-lesson
---

# OOP Breakout Lesson
# Starting off
Our team wanted to take on a challenge along with our other hacks. A few of our members hold Google block breaker close to our hearts, so seeing that it was a tougher hack and something we would genuinely enjoy changing, it was a no-brainer to take it on.

Right off the bat, we realized the game itself moved too slowly for our liking. Changing the speed of both the ball and the paddle was prioritized.

# Changing Game Speed

To change this, all that had to be done was change two numbers in the block of code that defines the ball's properties. The terms ‘this.dx’ and ‘this.dy’ are the speeds of the ball on the respective axes (x and y).
In other words, the speed of the ball while it moves up and down. Try changing the numbers to your liking. Experiment with it.
```js
// Ball class
  class Ball extends GameObject {
    constructor(x, y, radius = 8) {
      super(x, y);
      this.radius = radius;
      this.dx = 4;
      this.dy = -4;
      this.color = "#ad6bebff";
    }
```
For the paddle, something similar was done. This one is very simple, as the speed variable is literally called ‘this.speed’.
```js
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
```
# Fixing the Ball Clipping Issue

After turning up the speed, it quickly became apparent that the base game didn’t support the ball moving this fast, as the ball would clip through the bricks, breaking multiple at once rather than bouncing off, and additionally clipping through the paddle and touching the backwall, unfairly costing the player a life.

It’s likely you’re having this issue too, especially if you tried to make the game really fast. To fix this, the game's original collision detection had to be adapted.

```js
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


```

# Changing the Game's Colors

Obviously, this wouldn’t be a proper hack without changing the game's aesthetics! 

The this.color function is always the easiest and most reliable way to to change any variable’s color on your website.

Ex: The ball. Try looking for these in the code and changing them to your liking!
```js
    this.color = "#ad6bebff";
    }
```

Score Display
While we’re still on the topic of aesthetics, don’t you want to make your score, lives, and level UI more interesting? It’s a more tedious process, but the end result is worth it.

Start with setting up the UI in the style block at the beginning of your code, and deleting the previous one.

```js
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
```
The font and colors may be changed freely.

If you’re having issues with the score and lives not updating, you may need to add this block of code about the ‘gameloop()’ block.

```js
 updateInfoUI() {
      document.getElementById("scoreDisplay").textContent = "Score: " + this.score;
      document.getElementById("livesDisplay").textContent = "Lives: " + this.lives;
      document.getElementById("levelDisplay").textContent = "Level: " + this.level;
    }
```

