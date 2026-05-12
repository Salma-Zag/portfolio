---
layout: post 
title: Sprint 4 Assessments 
permalink: /sprintfour
hide: true
show_reading_time: false
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Bungee&display=swap');

    /* Global Page Overrides */
    .post {
        background-color: #0f0f0f;
        color: #f0f0f0; 
        font-family: 'Orbitron', sans-serif;
        padding: 40px 20px;
        min-height: 100vh;
    }

    /* Styling for the intro text */
    .dashboard-intro {
        font-family: 'Orbitron', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        color: #bbb;
        margin-bottom: 30px;
        letter-spacing: 0.5px;
        line-height: 1.8;
        border-bottom: 1px solid #333;
        padding-bottom: 25px;
    }

    .system-label {
        color: #00d4ff;
        font-weight: 700;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
        font-size: 1.2rem;
    }

    /* Level Highlight Tags */
    .level-tag {
        color: #ff0000;
        background: rgba(255, 0, 0, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Bungee', cursive;
        font-size: 0.8rem;
    }

    h2 {
        font-family: 'Bungee', cursive;
        color: #ff0000;
        text-transform: uppercase;
        letter-spacing: 2px;
        border-left: 5px solid #ff0000;
        padding-left: 15px;
        margin-top: 40px;
    }

    /* Container for the button grid */
    .grid-container {
        display: flex; 
        flex-wrap: wrap; 
        gap: 15px;
        margin-bottom: 30px;
    }

    /* The Racing Button Style */
    .race-button {
        display: inline-block;
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .race-button div {
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9rem;
        font-family: 'Bungee', cursive;
        border: 2px solid rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 220px;
        text-align: center;
        color: white;
    }

    /* Hover Effects */
    .race-button:hover {
        transform: translateY(-5px) skew(-5deg);
    }

    /* Color Variants */
    .btn-red { background: linear-gradient(45deg, #c51d1d, #ff3131); box-shadow: 0 4px 15px rgba(197, 29, 29, 0.4); }
    .btn-orange { background: linear-gradient(45deg, #a54c1f, #e67e22); box-shadow: 0 4px 15px rgba(165, 76, 31, 0.4); }
    .btn-gold { background: linear-gradient(45deg, #a58f1f, #f1c40f); box-shadow: 0 4px 15px rgba(165, 143, 31, 0.4); }
    .btn-dark { background: linear-gradient(45deg, #4a0b0b, #220505); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6); border: 1px solid #ff0000 !important;}

</style>

<div class="dashboard-intro">
    <span class="system-label">Team Briefing // Sprint 4</span>
    Welcome to the dashboard. Below is the documentation and live deployment for <strong>Timmy's Fun World</strong>. 
    Our mission for this sprint was to develop a multi-layered experience following the team rubric.
    <br><br>
    <strong>MAP DATA ACQUIRED:</strong><br>
    <span class="level-tag">Level 1</span> GameLevelGarrett.js (Timmy's Fun World)<br>
    <span class="level-tag">Level 2</span> GameLevelTimmyfuncounter.js (The Invisible Maze)<br>
    <span class="level-tag">Level 2.5</span> GameLevelHooray.js (Hooray...right?)<br>
    <span class="level-tag">Level 3</span> GameLevelBattleBus.js (Welcome to the Battle Bus)
</div>

<h2>Game Assessments</h2>
<div class="grid-container">
    <a href="{{site.baseurl}}/gamify/timmyworld" class="race-button">
        <div class="btn-red">Timmy's Adventure (A1)</div>
    </a>
    <a href="{{site.baseurl}}/gamify/timmycounter" class="race-button">
        <div class="btn-orange">Invisible Maze (A2)</div>
    </a>
</div>

<h2>Issue & Development Blogs</h2>
<div class="grid-container">
    <a href="{{site.baseurl}}/Aoneblog" class="race-button">
        <div class="btn-red">Adventure Blog</div>
    </a>
    <a href="{{site.baseurl}}/Atwoblog" class="race-button">
        <div class="btn-orange">Maze Blog</div>
    </a>
    <a href="{{site.baseurl}}/Athreeblog" class="race-button">
        <div class="btn-gold">Checklist</div>
    </a>
</div>

<h2>Game Runners</h2>
<div class="grid-container">
    <a href="{{site.baseurl}}/Aonerunner" class="race-button">
        <div class="btn-red">A1 Runner</div>
    </a>
    <a href="{{site.baseurl}}/Atworunner" class="race-button">
        <div class="btn-orange">A2 Runner</div>
    </a>
    <a href="{{site.baseurl}}/Athreerunner" class="race-button">
        <div class="btn-gold">A3 Crash Landing</div>
    </a>
</div>

<h2>Developer Tools</h2>
<div class="grid-container">
    <a href="{{site.baseurl}}/runners" class="race-button">
        <div class="btn-dark">Game Runner Examples</div>
    </a>
</div>