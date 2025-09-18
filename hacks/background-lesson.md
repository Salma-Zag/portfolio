---
layout: base
title: Animated Background Lesson
permalink: /background-lesson
---

<p class="back-button"><a href="{{site.baseurl}}/hacks" style="text-decoration:none;color:#007acc;font-weight:20px;">Click here to go back to hacks page</a></p>

---

## **BACKGROUND LESSON** 🛸

---

## **Setup**

You should be able to access a forked copy of the pages repository under Open Coding Society. This is where you will be able to access the game and make local edits. If you would like to commit your changes, copy the file to a personal repository before continuing.

After having opened VSCode, run:
```js
make
```
...and navigate to the Background game. You should be able to see an oscillating UFO on a alien planet background.

<br>

**Terms:**
- **GameObject:** a fundamental building block (such as an image) representing any entity within JavaScript
- **GameWorld:**  the simulated environment where the game takes place and the game logic is implemented
- **GameLoop:** allows the game to continue indefinitely (or until certain criteria is met)

<br> 

Brainstorm some ideas of changes you can make. Here are some "How might we..." questions to help you get started:
- How might we change the background or UFO to a different image?
- How might we change the size, speed, etc of the GameObject?
- How might we include user interaction to make the game "playable"?

---

## **Changes**

For this lesson, here are the changes we will be demoing:
- Changing the background and/or the sprite image
- Changing the size and speed of the sprite
- Make the sprite move using arrow keys

<br>

### **Code Header (Changing the background/sprite):**

```yaml
---
layout: base
title: Background with Object
description: Use JavaScript to have an in motion background.
sprite: images/platformer/sprites/flying-ufo.png
background: images/platformer/backgrounds/alien_planet1.jpg
permalink: /background
---
```
To change the UFO to a different image location, we changed the file path after **sprite**.

Change the file path after **background** to change the background to a different image.
*(In our background game, we changed the background image to alien_planet2)*

When troubleshooting, we had to make sure the images existed in their specified locations.

<br>

### **GameObject (Changing size/speed):**

```js
class Player extends GameObject {
      constructor(image, gameWorld) {
        /// to change GameObject size
        const width = image.naturalWidth / 2;
        const height = image.naturalHeight / 2;
        const x = (gameWorld.width - width) / 2; // Center the UFO horizontally.
        const y = (gameWorld.height - height) / 2; // Center the UFO vertically.
        super(image, width, height, x, y);
        this.baseY = y;
        this.frame = 0;
      }
}
```
The first two lines of code (after the first comment) change the size of the GameObject. 

The next two lines of code center the UFO in the middle of the screen.

<br>

```js
update() { 
        this.y = this.baseY + Math.sin(this.frame * 0.3) * 30; // Up+down movement of the UFO.
        this.frame++;
      }
```
To make the UFO move faster, change the number after the multiplication sign. This will move the UFO up and down at a faster rate.

Challenge: How might we make the UFO oscillate left/right?

<br>

### **Movement:**

```js
  update() {
       console.log("Player.update is running without sine wave");


       // Move with arrow keys
       if (keys["ArrowUp"]) this.y -= this.speed;
       if (keys["ArrowDown"]) this.y += this.speed;
       if (keys["ArrowLeft"]) this.x -= this.speed;
       if (keys["ArrowRight"]) this.x += this.speed;


       // Keep UFO inside canvas
       if (this.x < 0) this.x = 0;
       if (this.y < 0) this.y = 0;
       if (this.x + this.width > window.innerWidth) this.x = window.innerWidth - this.width;
       if (this.y + this.height > window.innerHeight) this.y = window.innerHeight - this.height;

     }
```

Move With Arrow Keys: If the arrow keys are pressed, the UFO will move in that direction according to user input.

Keep UFO Inside Canvas: Prevents the UFO from being moved outside the game world.

---

## Conclusion

Hooray! This lesson has given you fundamental knowledge that you can use when developing other games.