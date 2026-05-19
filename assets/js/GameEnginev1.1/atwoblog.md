---
layout: post 
title: Timmy's Maze Blog
permalink: /Atwoblog
hide: true
show_reading_time: false
---
by: Sophie Haas

# Formative Assessment 2 – Interaction and Behavior Design (Individual)
### Objective: Implement and document object interactions within the game loop by adding a step counter that tracks and displays Kirby's moves in real time.
#### S4 Sophie & Salma – Interaction Design

#### We added to our original storyboard/brainstorming Google Slide, to add our first idea: A Step Counter

<img width="925" height="899" alt="Image" src="https://github.com/user-attachments/assets/edc36b5f-4563-4a0f-a75e-dd37f59693ac" />

## Interaction Logic
Every time the player presses an arrow key to move Kirby through the invisible maze, a keydown event fires and increments a step counter displayed on screen. The counter starts at 0 and goes up by 1 for every move made, challenging the player to navigate the maze in as few steps as possible.

<img width="307" height="117" alt="Image" src="https://github.com/user-attachments/assets/d78c43a2-064d-48e1-bb45-ebffd5b5fecd" />

<img width="162" height="73" alt="Image" src="https://github.com/user-attachments/assets/97d9e67c-4c14-4aa1-9720-c21d5e3fd8f5" />

### The interaction:
#### Trigger: Player presses any arrow key (left: 37, right: 39, up: 38, down: 40)
#### Reaction: Step counter increments by 1 and the DOM updates instantly to show the new count

## How the Reaction is Triggered
A keydown event listener is attached to the document inside the constructor. Each time an arrow key is detected, the steps variable increments and the on-screen display updates:

`let steps = 0;
document.addEventListener('keydown', function(e) {
    if ([37, 38, 39, 40].includes(e.keyCode)) {
        steps++;
        stepCounterEl.textContent = 'Steps: ' + steps;
    }
});`

## Where the Interaction Occurs in the Game Loop
The keydown listener is initialized inside the `GameLevelTimmyfuncounter` constructor, which runs when the game level loads. The listener runs parallel to the game loop — every arrow key press that moves Kirby in the game loop simultaneously triggers the step counter update in the DOM.

### How Object Properties Update During Execution

- `steps`: a local variable that increments by 1 on each valid keypress
- `stepCounterEl.textContent`: the visible DOM element that reflects the updated step count in real time
- The counter is displayed as a fixed overlay in the top left corner of the screen, so it's always visible while playing

## Files Updated
- `assets/js/GameEnginev1/GameLevelTimmyfuncounter.js`: added step counter DOM element and keydown event listener with Javadoc documentation comments

# Commit Link
(Paste your commit link here after pushing)