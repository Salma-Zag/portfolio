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

---

### **Debugging**

There are many problems you may run into when attempting to edit or run your calculator game. Here is a comprehensive troubleshooting guide that may help you:

**1) Calculator Shows Nothing**

<br>Problem: The calculator box doesnt appear!

<br>How to fix it:
- Make sure this has been copied to your HTML:
```js
blah
```
<br>Check that the file is saved as .html and opened in a browser (like Chrome).

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
- In the function operation(choice), change this line:
```js
blah
```
- To:
```js
blah
```

<br>

**4) Decimal Points Not Working**

<br>Problem: You can’t type more than one decimal point ( . ) or it crashes.

<br>How to fix it:
- The code already blocks multiple dots, but if it’s failing, check inside number(value) for this part:
```js
blah
```
Make sure it’s still there, this prevents a second decimal point.

<br>

**5) Division by Zero**

<br> Problem: Calculator shows Infinity or breaks.

<br>How to fix it:
- Add this check inside the calculator function:

<br>

**6) Clear Button Doesn’t Reset (A/C)**

<br>Problem: Pressing A/C doesnt clear everything

<br>How to fix it:
- Make sure this code is at the bottom:
```js
blah
```
<br>

**7) Keyboard Doesn’t Work**

<br> Problem: Keys on keyboard don’t type numbers

<br> How to fix it:
- Ensure the keyboard listener part is included:
```js
blah
```

<br>

**8) Missing Features**

<br> Problem: The calculator doesn’t do square root or other functions

<br> How to fix it:
- Add this to calculate:

Add a new button in the HTML with the text.