---
layout: post
tailwind: True
title: Onboarding Adventure
description: >
  A guided sequence of hands-on and learning tasks to help you master the frameworks that power our course.
author: John Mortensen
courses: {'csse': {'week': 1}, 'csp': {'week': 1}, 'csa': {'week': 1}}
type: hacks
permalink: /hacks
lxdData:
  Title: "Learning Experience Designer Home"
  Description: "Explore LxD topics and interactive games to obtain mastery in key oboarding topics... collaboration, design thinking, coding skills, etc."
  Prequisites:
    - title: "Tools Setup"
      link: "/tools"
    - title: "Agile Collaboration"
      link: "/agile"
  Topics:
    - Title: "Animated Background"
      Genre: "Coding"
      Level: "1"
      Description: "Start a very simple background with floating object.  Then think about possibilities."
      Categories: ["JavaScript", "Game Coding", "OOP", "Aliens"]
      Game: "/background"
      Lessons: "/background/lesson"
      Image: "/images/platformer/backgrounds/alien_planet1.jpg"
      Alt: "Snake eating Apples"
    - Title: "Snake Game"
      Genre: "Coding"
      Level: "1"
      Description: "Agile development and changing elements of the Snake game."
      Categories: ["JavaScript", "Game Coding", "Procedural", "Reptile Life"]
      Game: "/snake"
      Lessons: "/agile/pair_trio"
      Image: "/images/snake.png"
      Alt: "Snake eating Apples"
    - Title: "Calculator"
      Genre: "Coding"
      Level: "1"
      Description: "A coding challenge to style buttons and add functions to a Calculator."
      Categories: ["JavaScript", "Styling", "Buttons", "Math"]
      Game: "/calculator"
      Lessons: "/calculator/lesson"
      Image: "/images/calculator.png"
      Alt: "Calculator functions"
    - Title: "OOP Breakout"
      Genre: "Coding"
      Level: "3"
      Description: "Learn about manipulating Object Oriented JavaScript by playing breakout."
      Categories: ["JavaScript", "OOP", "Game Coding", "Innovation"]
      Game: "/oopbreakoutgame"
      Lessons: "/oopbreakoutlesson"
      Image: "/images/breakout.jpg"
      Alt: "Breakout Game"
      Alt: "API Image"
---
{%- include tailwind/lxd.html -%}
