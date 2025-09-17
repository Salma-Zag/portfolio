---
layout: base
title: Snake Lesson
permalink: /snake-lesson
---

<p class="back-button"><a href="{{site.baseurl}}/hacks" style="text-decoration:none;color:#007acc;font-weight:20px;">Click here to go back to hacks page</a></p>

---

## **SNAKE LESSON** 🍎

---

## **Setup**

You should be able to access a forked copy of the pages repository under Open Coding Society. This is where you will be able to access the game and make local edits. If you would like to commit your changes, copy the file to a personal repository before continuing.

After having opened VSCode, run:
```js
make
```
...and navigate to the Snake game. You should be able to see a game menu prompting you to begin the game.

<br>

**Terms:**
- **Function:** a reusable block of code that can be called upon at any time to perform a specific task
- **Event Listener:**  runs code in response to certain criteria being met (e.g. mouse click, key press, etc)
- **State Management:** allows the game to be updated in accordance to user input

<br> 

Brainstorm some ideas of changes you can make. Here are some "How might we..." questions to help you get started:
- How might we change the background or apple color to be more visible to the user?
- How might we add a wider range of difficulty levels?
- How might we allow WASD instead of just arrow keys (to prevent the entire page from scrolling when the game is played)?
- How might we make the scoreboard look neater?

---

## **Changes**

For this lesson, here are the changes we will be demoing:
- Adding a box for the scoreboard instead of just text
- Changing the background and/or the apple color
- Adding a new speed to the game (Impossible)
- Make the snake move using WASD instead of just arrow keys

<br>

### **Color/Aesthetic Changes**

```css
#scoreboard {
        display: inline-block;
        padding: 10px 20px;
        border: 2px solid #057e38ff;
        border-radius: 8px; 
        background-color: rgba(0, 0, 0, 0.05);
        color: #057e38ff;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        margin-bottom: 10px;
        box-shadow: 0 0 10px rgba(0,255,204,0.3);
            transition: all 0.3s ease;
            text-align: center;
    }
```
The scoreboard is now a rectangular box instead of a single line of text.

Change the hex values after "border:" and "color:" to edit the color of the scoreboard. 

<br>

```js
let activeDot = function(x, y){
        if (x === food.x && y === food.y) {
            ctx.fillStyle = "#FF0000"; // Red color for apple
        } else {
            ctx.fillStyle = "#FFFFFF"; // White color for snake
        }
}
```

This if-else function makes it so that if the dot is an apple, it is red, but the snake remains white (and the red dot turns white when eaten). 

Challenge: How might we make the dot a different shape or size?

<br>

### **Adding A New Speed**
```html
<p>Speed:
        <input id="speed1" type="radio" name="speed" value="120" checked/>
        <label for="speed1">Slow</label>
        <input id="speed2" type="radio" name="speed" value="75"/>
        <label for="speed2">Normal</label>
        <input id="speed3" type="radio" name="speed" value="35"/>
        <label for="speed3">Fast</label>
        <!--ADDED SPEED 4 (IMPOSSIBLE)-->
        <input id="speed4" type="radio" name="speed" value="20"/>
        <label for="speed4">Impossible</label>
    </p>
```
As shown in the code, adding a new input with a label of "Impossible" and a speed value of "20" adds a faster speed to the game. 

Note: The lower the Speed Value, the faster the game.

<br>

### WASD Keys

In order to make the snake move using WASD *and* arrow keys, we have to edit the function that changes the direction of the snake to include WASD without removing arrow keys.

To do this, we added cases so that when W, A, S, or D are pressed, it moves the snake that direction (as it would if the arrow keys were pressed).

Updated Code:
```js
let changeDir = function(key){
            // test key and switch direction
            // CHANGED CODE TO USE WASD SO AS NOT TO MOVE THE ENTIRE PAGE WHILE PLAYING
            switch(key) {
                case 37:    // left arrow
                    if (snake_dir !== 1)    // not right
                        snake_next_dir = 3; // then switch left
                    break;
                case 65:    // 'A'
                    if (snake_dir !== 1)    // not right
                        snake_next_dir = 3; // then switch left
                    break;
                case 38:    // up arrow
                    if (snake_dir !== 2)    // not down
                        snake_next_dir = 0; // then switch up
                    break;
                case 87:    // 'W'
                    if (snake_dir !== 2)    // not down
                        snake_next_dir = 0; // then switch up
                    break;
                case 39:    // right arrow
                    if (snake_dir !== 3)    // not left
                        snake_next_dir = 1; // then switch right
                    break;
                case 68:    // 'D'
                    if (snake_dir !== 3)    // not left
                        snake_next_dir = 1; // then switch right
                    break;
                case 40:    // down arrow
                    if (snake_dir !== 0)    // not up
                        snake_next_dir = 2; // then switch down
                    break;
                case 83:    // 'S'
                    if (snake_dir !== 0)    // not up
                        snake_next_dir = 2; // then switch down
                    break;
            }
        }
```

---

## Conclusion

Hooray! This lesson has taught you how to use basic coding fundamentals to create a complex game based entirely on simple user input.
