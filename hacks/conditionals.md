---
layout: base
title: OOP Breakout Fundamentals - Conditionals
permalink: /conditionals
---

---
## **CONDITIONALS**
---

### **What Are Conditionals?**
- allows the execution of different blocks of code based on whether a specified condition evaluates to true or false
- this enables programs to make decisions and respond dynamically to various situations
- types: if, if-else, else if, (+switch)

<br>

### **Types of Conditionals**

#### 1. if
executes code if a given condition is true

```js
if (condition) {
    // Code to execute if condition is true
}
```

#### 2. if ... else

basically a true/false --> executes one thing if the condition is true, and a different thing if the condition is false

else statement:
- Executes a block of code only if the preceding if (or else if) condition evaluates to false.
- It must always follow an if or else if statement.
- no condition

```js
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
```

#### 3. else ... if

- java's equivalent of elif
- Executes a block of code if the preceding if condition (or any preceding else if conditions) evaluates to false, AND its own specified condition evaluates to true.
- only the first true condition's block is executed
- must always follow an if or another else if statement

```js
if (condition1) {
        // Code to execute if condition1 is true
    } else if (condition2) {
        // Code to execute if condition2 is true
    } else {
        // Code to execute if none of the above conditions are true
    }
```

#### 4. switch

compares multiple possible outcomes
more complex than just true/false

```js
switch (expression) {
        case value1:
            // Code to execute if expression matches value1
            break;
        case value2:
            // Code to execute if expression matches value2
            break;
        default:
            // Code to execute if no match is found
    }
```

<br>

### **Summary**

“if” checks a condition
“else if" checks another condition if the previous ones were false
“else” runs if none of the above conditions were true.

---

### **POPCORN HACK 1**

Open a new block of code (in a Jupyter notebook in your student repo is fine). 

We're going to try creating a simple conditional and then expanding on it using "else if" statements.

First, define any variable using a let statement.
Then, create an if, else conditional that echoes a certain string of code in the console. 

**Examples of conditionals you could use:**

1) Define your mood today and give yourself ice cream if you're happy
- challenge 1: add "else if" conditionals that echo different strings based on different moods
- challenge 2: add user input to define a "mood" variable

2) Define the weather today and echo "It's sunny outside!" if it's sunny
- challenge 1: add "else if" conditionals that define other weather
- challenge 2: let the user input today’s weather and respond automatically

3) Define your age as a variable and check whether you are an adult or a child.
- challenge 1: expand to add other categories using "else if" conditionals
- challenge 2: create a random age generator and test the conditional multiple times to see different results

Here's the basic code to get you started (from example 1):
```js
let mood = "happy";

if (mood === "happy") {
  console.log("You get ice cream!");
} else {
  console.log("No ice cream today.");
}
```

Here's the final code we came up with (from example 3):

```js
// Challenge 2: Random age generator
let age = Math.floor(Math.random() * 90) + 1; 
// random number between 1 and 90

console.log("Generated age:", age);

// Challenge 1: Expanded categories
if (age < 13) {
  console.log("You're a kid, enjoy cartoons!");
} else if (age < 18) {
  console.log("You're a teenager, have fun!");
} else if (age < 30) {
  console.log("You're a young adult, chase your dreams!");
} else if (age < 65) {
  console.log("You're an adult, responsibilities await.");
} else {
  console.log("You're a senior citizen, enjoy retirement!");
}
```

---

## **EXAMPLES OF CONDITIONALS IN OOP BREAKOUT**

To Recap: A **conditional** in code is any statement where the program checks a condition (using `if, else, or else if ` statements) to decide what to do next. Throughout the OOP BREAKOUT game, there are many examples of conditionals and conditional expressions that help the game run smoothly. 

