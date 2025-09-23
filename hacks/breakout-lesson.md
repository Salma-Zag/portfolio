---
layout: base
title: OOP Breakout Lesson
permalink: /breakout-lesson
---

# OOP Breakout Lesson

Our team decided to take on Google Block Breaker as a challenge because several of us enjoy the game and wanted to experiment with improving it. Through this project, we explored game mechanics, collision detection, and UI customization.

---

## 1: Speeding Up the Ball

Right off the bat, we realized the game itself moved too slowly for our liking. Changing the speed of both the ball and the paddle was prioritized. The ball’s speed is controlled by **two variables**:

```javascript
this.dx = 4; // Horizontal speed
this.dy = -4; // Vertical speed
```
To change this, all that had to be done was change two numbers in the block of code that defines the ball's properties. The terms ‘this.dx’ and ‘this.dy’ are the speeds of the ball on the respective axes (x and y).
In other words, the terms define the speed of the ball while it moves up and down.

<br>
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

A higher this.speed allows the player to react to a faster ball, so editing the value allowed us to make the game more challenging. A lower paddle speed would make the game much harder, but we decided to balance the ball/paddle speed so as not to make the game too difficult.

# Fixing the Ball Clipping Issue

After turning up the speed, it quickly became apparent that the base game didn’t support the ball moving this fast, as the ball would clip through the bricks, breaking multiple at once rather than bouncing off, and additionally clipping through the paddle and touching the backwall, unfairly costing the player a life.

It’s likely you’re having this issue too, especially if you tried to make the game really fast. To fix this, the game's original collision detection had to be adapted.
Fast-moving balls can skip over bricks or the paddle. To prevent this, we predict the ball’s next position:

```js
const nextX = this.ball.x + this.ball.dx;
const nextY = this.ball.y + this.ball.dy;
```

We then check overlap with bricks:

```js
const isColliding =
  ballRight > brickLeft &&
  ballLeft < brickRight &&
  ballBottom > brickTop &&
  ballTop < brickBottom;
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

