---
layout: base
title: Calculator Lesson
permalink: /calculator-lesson
---

<p class="back-button"><a href="{{site.baseurl}}/hacks" style="text-decoration:none;color:#007acc;font-weight:20px;">Click here to go back to hacks page</a></p>

---

## **CALCULATOR LESSON** 🔢

---

## **Setup**

You should be able to access a forked copy of the pages repository under Open Coding Society. This is where you will be able to access the game and make local edits. If you would like to commit your changes, copy the file to a personal repository before continuing.

After having opened VSCode, run:
```js
make
```
...and navigate to the Calculator game. You should be able to see a box with a calculator.

<br>

Brainstorm some ideas of changes you can make. Here are some "How might we..." questions to help you get started:
- How might we change the background color and make the background move in a seamless loop?
- How might we allow typed numbers instead of having to press buttons on the screen?
- How might we add features to the calculator?

---

## **Changes**

For this lesson, here are the changes we will be demoing:
- Changing the background color
- Making the background move in an animated loop
- Allow typed numbers
- Allow typed operations

<br>

### **Rainbow Background

To elevate the calculator and make it look unique, we decided we wanted to animate a rainbow background that looped seamlessly.

```css
/* calculator container with rainbow gradient */
 .calculator-container {
   display: grid;
   grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
   grid-gap: 10px; /* space between buttons */
   padding: 20px;
   background: linear-gradient(135deg, #FF6961, #ffb861ff, #ffe779ff, #80d976ff, #8ad3fbff, #c486faff, #f68dedff, #FF6961, #ffb861ff, #ffe779ff, #80d976ff, #8ad3fbff); /* rainbow!! */
   background-size: 300% 300%;
   animation: rainbow-move 4s linear infinite;
   border-radius: 15px;
   width: 320px; /* set a fixed width */
   margin: auto;
   box-shadow: 0 0 20px rgba(0,0,0,0.5);
 }
 ```
This code would set the background to a linear gradient containing the colors of the rainbow, and the line labeled "animation:" would set a variable called rainbow-move that would move the rainbow infinitely.

Later, we defined the rainbow-move variable using keyframes:

```css
@keyframes rainbow-move {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}
```

### **Typed Operations**

While trying to make the calculator easier to use, we found a bug: unlike a traditional online calculator, this one didn't allow the user to type numbers on the keyboard. Instead, they had to press the button using their trackpad.

We wanted to fix this, so we added cases for each key press:

```js
// Keyboard support
document.addEventListener("keydown", function(event) {
  const key = event.key;
  if ((key >= '0' && key <= '9') || key === '.') { // Number keys
    number(key);
    event.preventDefault();
  } else if (["+", "-", "*", "/"].includes(key)) { // Operations
    operation(key);
    event.preventDefault();
  } else if (key === "Enter" || key === "=") { // Enter key for answer
    equal();
    event.preventDefault();
  } else if (key === "Escape" || key.toLowerCase() === "c") { // Escape to clear calculator
    clearCalc();
    event.preventDefault();
  }
});
```
This code made it so that when keys 0-9 were pressed, it would input these numbers. Also, the keyboard support code also allows operations to be typed instead of having to press the button manually.

---

## **Debugging**

There are many problems you may run into when attempting to edit or run your calculator game. Here is a comprehensive troubleshooting guide that may help you:

**1) Calculator Shows Nothing**

<br>Problem: The calculator box doesnt appear!

<br>How to fix it:
- Make sure this has been copied to your HTML:

```js
<style>
 /* calculator container with rainbow gradient */
 .calculator-container {
   display: grid;
   grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
   grid-gap: 10px; /* space between buttons */
   padding: 20px;
   background: #ffffff;
   background-size: 300% 300%;
   animation: rainbow-move 4s linear infinite;
   border-radius: 15px;
   width: 320px; /* set a fixed width */
   margin: auto;
   box-shadow: 0 0 20px rgba(0,0,0,0.5);
 }
```
<br>Check that the file is saved so that when "make" is run, you can navigate to the calculator game and see the calculator.

<br>

**2) Buttons Don’t Work**

<br>Problem: Clicking numbers or buttons does nothing

<br>How to fix it:
- Check that the script section within JavaScript is included at the bottom of the HTML file.
- Make sure button classes (.calculator-number, .calculator-operation, etc.) match exactly in the HTML and CSS.

<br>

**3) Numbers Don’t Add Up Correctly**

<br>Problem: Doing basic addition or subtraction gives a strange result or no answer.

<br>How to fix it:
- In the function operation(choice), make sure there are cases defined for each operation:

```js
function calculate (first, second) {
   let result = 0;
   switch (operator) {
       case "+":
           result = first + second;
           break;
       case "-":
           result = first - second;
           break;
       case "*":
           result = first * second;
           break;
       case "/":
           result = first / second;
           break;
       default:
           break;
   }
   return result;
}
```

<br>

**4) Decimal Points Not Working**

<br>Problem: You can’t type more than one decimal point ( . ) or it crashes.

<br>How to fix it:
- The code already blocks multiple dots, but if it’s failing, check inside number(value) for this part:

```js
if (output.innerHTML.indexOf(".") == -1) {
           output.innerHTML = output.innerHTML + value;
           nextReady = false;
       }
```
<br>Make sure it’s still there, this prevents a second decimal point.

<br>

**5) Division by Zero**

<br> Problem: Calculator shows Infinity or breaks.

<br>How to fix it:
- Add this check inside the calculator function that defines division:

```js
case "/":
    if (second === 0) {
        alert("Error: Cannot divide by 0");
        result = first;
    } else {
        result = first / second;
    }
    break;
```

<br>

**6) Clear Button Doesn’t Reset (A/C)**

<br>Problem: Pressing A/C doesnt clear everything

<br>How to fix it:
- Make sure this code is at the bottom:

```js
function clearCalc () {
   firstNumber = null;
   output.innerHTML = "0";
   nextReady = true;
}
```
<br>