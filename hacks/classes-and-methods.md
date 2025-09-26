---
layout: base
title: Classes and Methods Lesson
permalink: /classesandmethods
---

# Examples of Classes and Methods
# GameObject class
Simplified, it essentially states the existence of all objects in a scene. In other words, the objects that appear on your screen.

In the code below, the class serves as an anchor for every other class and it's sprite.
```js
// Base GameObject class - provides common functionality
  class GameObject {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    draw(ctx) {}
    update() {}
  }
```

#Ball Class
Classifies the ball into its own group. Defines its existence, as per the function of classes.

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
    # Methods Underneath Ball
# Draw method
Similar to the GameObject class, the purpose of this method is to allow the sprite of the ball to have color.

```js
draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
```

# Update Method
This method scans for walls and bricks etc. with a collision method, making it so that when the ball travels towards and collides with one, it bounces off.

```js
update(canvasWidth, canvasHeight) {
      // Wall collision (left/right)
      if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
        this.dx = -this.dx;
      }
      // Top
      if (this.y + this.dy < this.radius) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
    }
```

# Reset method
This method is self explanatory. When the ball hits the backwall, it resets the game.
```js
reset(canvasWidth, canvasHeight) {
      this.x = canvasWidth / 2;
      this.y = canvasHeight - 60;
      // keep same speed magnitude but randomize direction a bit
      const speed = Math.max(4, Math.hypot(this.dx, this.dy));
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 3);
      const sign = Math.random() < 0.5 ? -1 : 1;
      this.dx = sign * speed * Math.cos(angle);
      this.dy = -Math.abs(speed * Math.sin(angle));
    }
```
# Speed, Setting Collision to The Ball, and Paddle Collision

```js
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
```

# Additional Classes

# Paddle
Methods not included

```js
a// Paddle class
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

# Brick
```js
# Brick Class
Methods not included
```js
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
```

Obviously, there are many more examples of both method and classes throughout the games code.

# Popcorn Hack 4: Giving Bricks Extra Health

For your fourth popcorn hack, you're going to try and add another feature to the game! Not all bricks are the same, right? You will attempt to make it so that the ball must collide with some bricks twice for it to break completely.

This should be easy to figure out through studying the current code and helps students gain both a better understanding of these fundamentals, while also learning to apply it to a real feature in game.

Makes bricks break on two hits rather than one.

```js
hit() {
  this.health--;
  if (this.health <= 0) this.destroy();
  else this.color = "orange"; // weaker
}
```
