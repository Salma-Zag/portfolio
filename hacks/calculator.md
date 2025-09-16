---
title: JS Calculator
comments: true
hide: true
layout: base
description: A common way to become familiar with a language is to build a calculator.  This calculator shows off button with actions.
permalink: /calculator
---


<!--
Hack 0: Right justify result
Hack 1: Test conditions on small, big, and decimal numbers, report on findings. Fix issues.
Hack 2: Add the common math operation that is missing from calculator
Hack 3: Implement 1 number operation (ie SQRT)
-->


<!--
HTML implementation of the calculator.
-->


<style>
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


 /* output screen */
 .calculator-output {
   grid-column: span 4; /* make output stretch across all 4 columns */
   background-color: black;
   color: white;
   font-size: 2em;
   text-align: right;
   padding: 10px;
   border-radius: 10px;
   border: 2px solid #333;
 }


 /* number buttons */
 .calculator-number {
   background-color: #333;
   color: white;
   font-size: 1.5em;
   border-radius: 10px;
   padding: 20px;
   text-align: center;
   cursor: pointer;
   transition: background 0.2s;
 }
 .calculator-number:hover {
   background-color: #555;
 }


 /* operation buttons */
 .calculator-operation {
   background-color: #f39c12;
   color: white;
   font-size: 1.5em;
   border-radius: 10px;
   padding: 20px;
   text-align: center;
   cursor: pointer;
   transition: background 0.2s;
 }
 .calculator-operation:hover {
   background-color: #d35400;
 }


 /* clear button */
 .calculator-clear {
   background-color: #e74c3c;
   color: white;
   font-size: 1.2em;
   border-radius: 10px;
   padding: 20px;
   text-align: center;
   cursor: pointer;
   transition: background 0.2s;
 }
 .calculator-clear:hover {
   background-color: #c0392b;
 }


 /* equals button */
 .calculator-equals {
   background-color: #27ae60;
   color: white;
   font-size: 1.5em;
   border-radius: 10px;
   padding: 20px;
   text-align: center;
   cursor: pointer;
   transition: background 0.2s;
 }
 .calculator-equals:hover {
   background-color: #1e8449;
 }


 /* vanta animation fix */
 canvas {
   filter: none;
 }


@keyframes rainbow-move {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}
</style>


<!-- Add a container for the animation -->
<div id="animation">
 <div class="calculator-container">
     <!--result-->
     <div class="calculator-output" id="output">0</div>
     <!--row 1-->
     <div class="calculator-number">1</div>
     <div class="calculator-number">2</div>
     <div class="calculator-number">3</div>
     <!--row 2-->
     <div class="calculator-operation">+</div>
     <div class="calculator-number">4</div>
     <div class="calculator-number">5</div>
     <div class="calculator-number">6</div>
     <div class="calculator-operation">-</div>
     <!--row 3-->
     <div class="calculator-number">7</div>
     <div class="calculator-number">8</div>
     <div class="calculator-number">9</div>
     <div class="calculator-operation">*</div>
     <!--row 4-->
     <div class="calculator-clear">A/C</div>
     <div class="calculator-number">0</div>
     <div class="calculator-number">.</div>
     <div class="calculator-equals">=</div>
 </div>
</div>


<!-- JavaScript (JS) implementation of the calculator. -->
<script>

// initialize important variables to manage calculations
var firstNumber = null;
var operator = null;
var nextReady = true;
// build objects containing key elements
const output = document.getElementById("output");
const numbers = document.querySelectorAll(".calculator-number");
const operations = document.querySelectorAll(".calculator-operation");
const clear = document.querySelectorAll(".calculator-clear");
const equals = document.querySelectorAll(".calculator-equals");

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


// Number buttons listener
numbers.forEach(button => {
 button.addEventListener("click", function() {
   number(button.textContent);
 });
});


// Number action
function number (value) {
   if (value != ".") {
       if (nextReady == true) {
           output.innerHTML = value;
           if (value != "0") {
               nextReady = false;
           }
       } else {
           output.innerHTML = output.innerHTML + value;
       }
   } else {
       if (output.innerHTML.indexOf(".") == -1) {
           output.innerHTML = output.innerHTML + value;
           nextReady = false;
       }
   }
}


// Operation buttons listener
operations.forEach(button => {
 button.addEventListener("click", function() {
   operation(button.textContent);
 });
});


// Operator action
function operation (choice) {
   if (firstNumber == null) {
       firstNumber = parseInt(output.innerHTML);
       nextReady = true;
       operator = choice;
       return;
   }
   firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
   operator = choice;
   output.innerHTML = firstNumber.toString();
   nextReady = true;
}


// Calculator
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


// Equals button listener
equals.forEach(button => {
 button.addEventListener("click", function() {
   equal();
 });
});


// Equal action
function equal () {
   firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
   output.innerHTML = firstNumber.toString();
   nextReady = true;
}


// Clear button listener
clear.forEach(button => {
 button.addEventListener("click", function() {
   clearCalc();
 });
});


// A/C action
function clearCalc () {
   firstNumber = null;
   output.innerHTML = "0";
   nextReady = true;
}
</script>


<!-- Vanta animations -->
<script src="{{site.baseurl}}/assets/js/three.r119.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.halo.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.birds.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.net.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.rings.min.js"></script>


<script>
var vantaInstances = {
 halo: VANTA.HALO,
 birds: VANTA.BIRDS,
 net: VANTA.NET,
 rings: VANTA.RINGS
};
var vantaInstance = vantaInstances[Object.keys(vantaInstances)[Math.floor(Math.random() * Object.keys(vantaInstances).length)]];
vantaInstance({
 el: "#animation",
 mouseControls: true,
 touchControls: true,
 gyroControls: false
});
</script>