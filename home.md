---
layout: base
title: Code Constellations Homepage
description: Includes links to the troubleshooting guide and the onboarding space challenges.
permalink: /home
background: images/platformer/backgrounds/galaxy2.jpg
---

<canvas id="world"></canvas> <!-- Creates a canvas element with id "world" to draw the game on. -->

<script>
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');
  const backgroundImg = new Image(); // Create a new Image Gameobject for the background using the image source.
  backgroundImg.src = '{{page.background}}';

  let imagesLoaded = 0;
  backgroundImg.onload = function() {
    imagesLoaded++;
    startGameWorld();

  function startGameWorld() {
    if (imagesLoaded < 1) return; // The GameWorld only starts once background image has loaded.

    
    class Background extends GameObject {
      constructor(image, gameWorld) {
        // Fill entire canvas
        super(image, gameWorld.width, gameWorld.height, 0, 0, 0.1);
      }
      update() {
        this.x = (this.x - this.speed) % this.width; // Scrolls background left and loops it seamlessly.
      }
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }

    class GameWorld {
      static gameSpeed = 5;
      constructor(backgroundImg) {
        this.canvas = document.getElementById("world");
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `0px`;
        this.canvas.style.top = `${(window.innerHeight - this.height) / 2}px`;

        this.gameObjects = [
         new Background(backgroundImg, this),
        ];
      }
      gameLoop() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const obj of this.gameObjects) {
          obj.update();
          obj.draw(this.ctx);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
      }
      start() {
        this.gameLoop();
      }
    }

    const world = new GameWorld(backgroundImg);
    world.start();
  }

<script>

Troubleshooting at Lightspeed

Space Onboarding Challenge