---
layout: base
title: Code Constellations Homepage
description: Includes links to the troubleshooting guide and the onboarding space challenges.
permalink: /home
background: images/platformer/backgrounds/galaxy2.jpg
---

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap" rel="stylesheet">

<canvas id="world"></canvas> <!-- Creates a canvas element with id "world" to draw the game on. -->

<!-- Rocketship image -->
<img src="{{site.baseurl}}/images/platformer/sprites/rocketship.png" id="rocket">

<!-- Top typewriter text -->
<div id="countdown"></div>

<script>
  const canvas = document.getElementById("world");
  const ctx = canvas.getContext('2d');
  const backgroundImg = new Image(); // Create a new Image object for the background
  backgroundImg.src = '{{page.background}}';

  backgroundImg.onload = function() {
    startGameWorld();
  };

  function startGameWorld() {
    class GameObject {
      constructor(image, width, height, x = 0, y = 0, speedRatio = 0) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedRatio = speedRatio;
        this.speed = GameWorld.gameSpeed * this.speedRatio;
      }
      update() {}
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }

    class Background extends GameObject {
      constructor(image, gameWorld) {
        // Fill entire canvas
        super(image, gameWorld.width, gameWorld.height, 0, 0, 0.1);
      }
      update() {
        this.x = (this.x - this.speed) % this.width; // Scrolls background left and loops it seamlessly
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

        // Only background, no UFO
        this.gameObjects = [
          new Background(backgroundImg, this)
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
</script>

<div id="overlay">
  <a href="{{site.baseurl}}/tools/trouble" class="button large">
    Troubleshooting at Lightspeed
  </a>
  <a href="{{site.baseurl}}/hacks" class="button large">
    Space Onboarding Challenge
  </a>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

/* Countdown typewriter text */
  #countdown {
    position: absolute;
    top: 10vh;;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-family: 'Orbitron', sans-serif;
    font-size: 48px;
    text-align: center;
    z-index: 30; /* above everything */
    white-space: nowrap;
  }

  #overlay {
    position: absolute;
    top: 50%;           /* move slightly down from the center */
    left: 50%;
    transform: translate(-50%, -50%); /* center horizontally */
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 40px;          /* space between buttons */
    font-family: 'Orbitron', sans-serif;
    text-align: center;
  }

  #overlay .button {
    display: inline-block;
    font-size: 28px;
    padding: 15px 30px;
    color: white;
    background-color: #390046ff;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 0 8px rgba(0,0,0,0.6);
  }

  #overlay .button:hover {
    background-color: #860098ff;
    color: black;
    box-shadow: 0 0 15px #b742dbff;
  }

   /* Rocketship */
  #rocket {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 120px;
    height: auto;
    z-index: 20;           /* above everything else */
    animation: launch 3s ease-out forwards;
    animation-delay: 5s;    /* wait 5 seconds before launch */
  }

  @keyframes launch {
    0%   { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-120vh); opacity: 0; }
  }
</style>

<script>
  const countdownText = "💫Takeoff in 5...4...3...2...1...💫";
  const countdownEl = document.getElementById("countdown");
  let i = 0;

  function typeWriter() {
    if (i < countdownText.length) {
      countdownEl.innerHTML += countdownText.charAt(i);
      i++;
      setTimeout(typeWriter, 130); // adjust speed (ms per character)
    }
  }

  // Start typewriter effect immediately
  typeWriter();
</script>

