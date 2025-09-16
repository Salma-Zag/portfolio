---
layout: post
tailwind: true
title: Onboarding Adventure
description: >
  A guided sequence of hands-on and learning tasks to help you master the frameworks that power our course.
author: The ___ers
type: hacks
permalink: /hacks
---
## Select A Challenge:

### Games:

<div class="button-row">
  <a href="{{site.baseurl}}/background" class="button small">Animated Background</a>
  <a href="{{site.baseurl}}/snake" class="button small">Snake Game</a>
  <a href="{{site.baseurl}}/calculator" class="button small">Calculator</a>
  <a href="{{site.baseurl}}/breakout" class="button small">OOP Breakout</a>
</div>

### Lessons:

<div class="lesson-button-row">
  <a href="{{site.baseurl}}/background-lesson" class="button large">Background Lesson</a>
  <a href="{{site.baseurl}}/snake-lesson" class="button large">Snake Lesson</a>
  <a href="{{site.baseurl}}/calculator-lesson" class="button large">Calculator Lesson</a>
  <a href="{{site.baseurl}}/breakout-lesson" class="button large">Breakout Lesson</a>
</div>

<style>
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  margin: 40px auto;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  max-width: 1200px;
}

  .button-row .button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 15px 30px;
    color: #fff !important;
    background: linear-gradient(270deg, #390046, #3e0052ff, #070263ff, #390046);
    background-size: 600% 600%;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(.4,2,.6,1), transform 0.2s cubic-bezier(.4,2,.6,1);
    box-shadow: 0 0 16px 2px #2d0a4b, 0 0 32px 8px #00cfff44;
    animation: galaxy-gradient 4s ease-in-out infinite;
    font-family: 'Orbitron', sans-serif;
    line-height: 1.3;
    position: relative;
    overflow: hidden;
  }

  @keyframes galaxy-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .button-row .button:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 0 32px 8px #00046f99, 0 0 24px 4px #49005299;
    filter: brightness(1.15) saturate(1.2);
  }
.lesson-button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  margin: 40px auto;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  max-width: 1200px;
}

  .lesson-button-row .button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 15px 30px;
    color: #fff !important;
    background: linear-gradient(270deg, #390046, #3e0052ff, #070263ff, #390046);
    background-size: 600% 600%;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(.4,2,.6,1), transform 0.2s cubic-bezier(.4,2,.6,1);
    box-shadow: 0 0 16px 2px #2d0a4b, 0 0 32px 8px #00cfff44;
    animation: galaxy-gradient 4s ease-in-out infinite;
    font-family: 'Orbitron', sans-serif;
    line-height: 1.3;
    position: relative;
    overflow: hidden;
  }

  @keyframes galaxy-gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .lesson-button-row .button:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 0 32px 8px #00046f99, 0 0 24px 4px #49005299;
    filter: brightness(1.15) saturate(1.2);
  }
</script>
