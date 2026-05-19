---
layout: post 
title: Timmy's Maze Blog
permalink: /Aoneblog
hide: true
show_reading_time: false
---
by: Sophie Haas

# Formative Assessment 1 - Mini Game Configuration (Individual)
### Objective: Configure foundational game objects and document implementation decisions.
#### S4 Sophie H - Mini Game Timmy's Cloud World

<img width="803" height="516" alt="Image" src="https://github.com/user-attachments/assets/51ccd02e-1773-41e2-88e5-a3e9e63ce87d" />

## Game Concept

Timmy's Fun World is a cloud-themed mini game where the player controls Kirby navigating an invisible maze in the sky. A mysterious "Random Guy" NPC greets the player at the start with a cryptic warning: "Welcome to the invisible maze...good luck!" The challenge is finding your way through 10 hidden barriers you can't see — only feel when you bump into them!

The player cannot see the 12 hidden barriers and must discover the path through exploration alone. Every collision with an invisible wall is a lesson in the game's hidden geometry. This level was designed to demonstrate how game objects interact within the GameEngine's loop, using Background, Player, NPC, and Barrier classes working together to create an engaging experience.

### Our challenge was to include:
- One Background = Cloud/Fantasy Kingdom sky
- One Player = Kirby sprite with arrow key controls
- One NPC = Random Guy (Tux penguin) with dialogue
- At least one Barrier = 12 invisible barriers forming a simple maze

## Brainstorming

Before building in GameBuilder, we sketched out the level concept using Google Slides to plan object placement and the maze layout:

### The storyboard helped us decide:

Where to position the NPC (far left, so the player sees him immediately)
Where Kirby should start (x:100, giving room to move right into the maze)
How to structure the invisible barriers into a maze pattern
#### This was our first general brainstorm/storyboard for our first basic game, using basic, general shapes in Google Slides:

<img width="566" height="639" alt="Image" src="https://github.com/user-attachments/assets/20864928-c9e2-4372-aceb-ff7c5763c463" />

#### Then we added our idea of a maze, with the barriers acting as 'invisible walls'

<img width="851" height="492" alt="Image" src="https://github.com/user-attachments/assets/a22548ef-ff1f-4543-bb47-e172dd193a57" />

## Configured Objects and Their Roles

<img width="144" height="143" alt="Image" src="https://github.com/user-attachments/assets/f2e00e1c-37d3-4283-b4c6-3a75b632640f" />

### Background – Cloud Sky
A bright sky scene with clouds that sets the open, airy atmosphere of the level. The visual simplicity contrasts with the hidden complexity of the invisible maze.
### Player – Kirby
<img width="51" height="58" alt="Image" src="https://github.com/user-attachments/assets/fa7d4608-192d-4360-99a1-5bdc8112f97f" />

The user-controlled character. Kirby starts at the left side of the screen (x:100, y:300) and navigates the maze using the arrow keys.  Kirby uses a single-row sprite sheet with 13 columns, cycling through 3 frames per direction for smooth animation. He starts on the left side of the screen with room to explore rightward into the maze. (We could have increased his speed to create a faster paced atmopshere. 

`INIT_POSITION: { x: 100, y: 300 },
SCALE_FACTOR: 8,
keypress: { up: 38, left: 37, down: 40, right: 39 }`

<img width="41" height="58" alt="Image" src="https://github.com/user-attachments/assets/d1dbaec8-b399-4f6e-87ca-757d067e930d" />

Random Guy is positioned at x:0, y:300 — the very left edge of the screen — so he's the first thing the player sees when the level loads. He serves as the level's narrator, delivering the only hint the player gets before entering the maze.

`INIT_POSITION: { x: 0, y: 300 },
SCALE_FACTOR: 9,
dialogues: ['"Welcome to the invisible maze...good luck!'],`

Interaction logic: The NPC uses react and interact callback functions. When Kirby collides with Random Guy, showReactionDialogue() fires. When the player interacts directly, showRandomDialogue() delivers the maze warning.

### Barriers (dbarrier_1 through dbarrier_10) – Invisible Maze Walls

<img width="90" height="46" alt="Image" src="https://github.com/user-attachments/assets/fb590700-a9c8-4451-bfb1-017fda063028" />

12 invisible barriers are placed strategically to form a hidden maze structure. All are set to visible: false so the player navigates by feel rather than sight. Barriers vary between horizontal (wide, short) and vertical (narrow, tall) orientations to create realistic corridor-like paths. The hit-box was difficult to work with, so at times the player will glitch or be unable to move up or down smoothly.

## Key Configuration Decisions
#### Player SCALE_FACTOR increased to 8 from the default to make Kirby more visible and easier to control in the maze

<img width="334" height="173" alt="Image" src="https://github.com/user-attachments/assets/c2ac493c-4904-4053-b6ff-94ecfb057e36" />

#### NPC positioned at x:0, y:300 so Random Guy appears immediately when the level loads, acting as a starting guide

<img width="329" height="164" alt="Image" src="https://github.com/user-attachments/assets/5599c863-d978-4b0f-b9db-3dc8b6b6a099" />

#### All 10 barriers set to invisible (visible: false) to create the invisible maze mechanic — the core challenge of the level
Barriers vary in orientation — some are horizontal (wide, short) and some are vertical (narrow, tall) to create a realistic maze-like structure

<img width="88" height="31" alt="Image" src="https://github.com/user-attachments/assets/87c5acff-2d70-4552-bde3-c339251673ea" />

<img width="24" height="75" alt="Image" src="https://github.com/user-attachments/assets/6b5d8e0b-659b-433a-aa41-c3a3556981c5" />

<img width="211" height="32" alt="Image" src="https://github.com/user-attachments/assets/e115e1c8-409e-415a-8b86-49da7fb77d70" />

#### Arrow keys used for movement (up: 38, left: 37, down: 40, right: 39)

<img width="327" height="93" alt="Image" src="https://github.com/user-attachments/assets/0ccbe100-de97-4626-bc26-3b1ae0a48779" />

#### NPC SCALE_FACTOR set to 9 to make Random Guy large and immediately noticeable at the entry point

<img width="280" height="151" alt="Image" src="https://github.com/user-attachments/assets/039d36ff-a146-4303-b3c2-6c1de7e25715" />

How GameEngine Objects Work Together
In the GameEngine, all objects are registered in `this.classes` and managed by the GameLoop each frame:

`this.classes = [
    { class: GameEnvBackground, data: bgData },  // Rendered first (bottom layer)
    { class: Player, data: playerData },          // Rendered on top, receives input
    { class: Npc, data: npcData1 },               // Checks proximity to player each frame
    { class: Barrier, data: dbarrier_1 },         // Collision detection each frame
    // ... 11 more barriers
];`

Each frame the GameLoop: updates all object positions → checks collisions → triggers interactions → redraws everything. This is how Kirby bumping an invisible barrier stops his movement, and how approaching Random Guy triggers his dialogue.

# Commit Link
https://github.com/Salma-Zag/Tri2team/commit/97f35c6c088eaf1198d42e99ebd6d66d9c24b9f2