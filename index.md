---
layout: base
title: Code Constellations
hide: true
background: images/platformer/backgrounds/galaxy1.jpg
---
<style>
  /* load Google Font via @import (works even if <link> is stripped) */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  /* Fullscreen galaxy background */
  body {
    margin: 0;
    height: 100vh;
    background: url('{{ site.baseurl }}/images/platformer/backgrounds/galaxy1.jpg') no-repeat center center fixed;
    background-size: cover;
    color: #ffffffff;
    font-family: 'Orbitron', 'Share Tech Mono', monospace !important;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.8),   /* dark drop shadow */
    0 0 8px #000000ff,                 /* neon glow */
    0 0 15px #000067ff;                /* outer glow */
  }

  /* Typing text container */
  #typed {
    font-size: 2rem;
    display: inline-block;
  }

  /* Blinking cursor */
  #cursor {
    display: inline-block;
    width: 3px;
    background-color: #ffffffff;
    margin-left: 5px;
    animation: blink 0.7s steps(1) infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
</style>

<div>
  <span id="typed"></span><span id="cursor"></span>
</div>

<script>
  const text = "🚀 Welcome Rookie Coder...";
  const speed = 70; // ms per character
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typed").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  window.onload = typeWriter;
</script>

<div class="middle-text">Coding Constellations</div>

<style>
  /* Load a cursive Google Font */
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

  .middle-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* center perfectly */
    font-family: 'Great Vibes', cursive; /* cursive font */
    font-size: 6rem; /* big size */
    color: #ffffffff; /*text color*/
    text-shadow:
      2px 2px 8px rgba(0, 0, 0, 0.8), /* subtle dark shadow */
      0 0 15px #000000ff,                /* glow */
      0 0 30px #000000ff;                /* outer glow */
    text-align: center;
    opacity: 0;
    animation: fadeInMiddle 1s ease-in forwards;
    animation-delay: 2s; /* appears after 8 seconds, adjust as needed */
  }

  @keyframes fadeInMiddle {
    from { opacity: 0; transform: translate(-50%, -60%); }
    to   { opacity: 1; transform: translate(-50%, -50%); }
  }
</style>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<a href="{{site.baseurl}}/home" class="button large" style="background-color: #000000ff">
    <span style="color: #ffffffff">Proceed to Homepage</span>