# AUREX Full-Stack Engineering Internship — Week 4

**Intern Name:** Aqsa Nawaz

**Domain:** Frontend Development

**Week:** Week 4 — JavaScript Fundamentals, DOM, Events, Forms & localStorage

## Live Deployment Link

 [View Live Project](https://aqsapf005.github.io/aurex-web-internship-aqsa-week-4/)

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* Browser localStorage API

## Features Implemented

* Add task
* Edit task inline by clicking **Edit**
* Delete task
* Mark task as complete / incomplete
* Filter tasks: **All / Active / Complete**
* Input validation:

  * Empty input is blocked
  * Maximum 120 characters
* Tasks persist in `localStorage` and reload correctly after page refresh
* Responsive layout for mobile and desktop
* Dark mode support based on system preference

## Folder Structure

```text
aurex-web-internship-aqsa/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── README.md
```

## Completed JavaScript Exercises

* Variables: `let`, `const`
* Conditionals: `if` / `else` for validation and filtering
* Loops / iteration: `.forEach()`, `.filter()`, `.find()`
* Functions: declarations and arrow-style callbacks
* Parameters and return values
* Arrays: `tasks` array — add, remove, filter and iterate
* Objects: each task is an object containing `id`, `text` and `done`
* DOM manipulation
* Event handling
* Form submission and validation
* Browser `localStorage`

## Challenges Faced & What Was Learned

One of the main concepts learned in Week 4 was browser `localStorage`.

`localStorage` stores data as strings, so arrays and objects cannot be stored directly. I used `JSON.stringify()` to convert the tasks array into a string before saving it and `JSON.parse()` to convert the stored string back into JavaScript data when loading the application.

This made it possible for tasks to remain saved even after refreshing the browser.

## Difficulties / Blockers

No major blockers were encountered. Building the application step by step — starting with JavaScript fundamentals, followed by DOM manipulation, events, form validation and finally `localStorage` — made the concepts easier to understand and implement.

## Week 4 Outcome

By completing this project, I practiced building a functional task management application using **HTML, CSS and Vanilla JavaScript**, with persistent browser storage and interactive DOM-based features.
