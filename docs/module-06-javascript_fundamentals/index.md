# Module 6 — JavaScript Fundamentals

> **Focus:** JavaScript basics — syntax, variables, operators, functions, conditionals, loops, ES6 features, DOM, and events

!!! note "Learning Outcomes" 
    By the end of this module, you will be able to:

    - Write simple JavaScript code and run it in the browser.
    - Use variables and data types correctly.
    - Apply different operators in JavaScript.
    - Write and call functions to reuse code.
    - Use conditionals and loops to control program flow.
    - Recognize key ES6 features.
    - Access and change the DOM with JavaScript.
    - Add simple interactivity using event listeners.

---

## 6.0 Before You Begin: VS Code Setup

Before we start writing JavaScript, make sure Visual Studio Code is ready.\
Install these helpful extensions:

- **ESLint**: checks for errors and enforces good coding style.
- **Prettier**: automatically formats code to look clean and consistent.
- **JavaScript (ES6) code snippets**: gives shortcuts for common JavaScript code.

These extensions will make the development process smoother when coding browser‑based JavaScript and will also be helpful later in the course.

---

## 6.1 Getting Started with JavaScript

JavaScript makes web pages interactive. HTML gives the structure, CSS gives the style, and JavaScript makes things **move**, **change**, and **respond**.

There are two common ways to add JavaScript to a page:

### Inline script (quick demos)

To include a small script directly in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Example</title>
</head>
<body>
  <h1>Hello JavaScript</h1>
  <script>
    console.log("Hello from JavaScript!");
  </script>
</body>
</html>
```

The `<script>` tag runs JavaScript code inside the browser.

### External file (recommended)
Keep your JavaScript in a separate `.js` file for better organization.

**`app.js`:**

```javascript
console.log("Hello from app.js");
```

Place the script tag at the end of `<body>`:

```html
<body>
  <h1>Hello JavaScript</h1>
  <script src="app.js"></script>
</body>
```

You can also load it in `<head>` if you add `defer` so the script runs after the HTML is parsed:

```html
<head>
  <meta charset="UTF-8">
  <title>JS Example</title>
  <script src="app.js" defer></script>
</head>
```

!!! note
    - `src="app.js"` is a **relative path**; adjust it if your file is in a folder (e.g., `js/app.js`).
    - We will cover module scripts (`type="module"`) later in the course.

---

## 6.2 Variables and Data Types

Variables store data. In JavaScript we usually use `let` or `const`.

```javascript
let name = "Alice";   // string
let age = 20;         // number
const pi = 3.14;      // constant number
let isStudent = true; // boolean
```

!!! tip 
    Use `let` when the value can change, and `const` when it should stay the same.

Common data types include:

- **String**: text values like "Hello"
- **Number**: integers and decimals
- **Boolean**: `true` or `false`
- **Null** and **Undefined**
- **Objects** and **Arrays** (covered later)

---

## 6.3 Operators

Operators perform actions on values. We group them as follows:

### Arithmetic Operators

| Operator | Meaning             | Example  | Result |
| -------- | ------------------- | -------- | ------ |
| `+`      | Addition            | `5 + 3`  | 8      |
| `-`      | Subtraction         | `5 - 3`  | 2      |
| `*`      | Multiplication      | `5 * 3`  | 15     |
| `/`      | Division            | `6 / 3`  | 2      |
| `%`      | Modulus (remainder) | `7 % 2`  | 1      |
| `**`     | Exponentiation      | `2 ** 3` | 8      |

### Comparison Operators

| Operator | Meaning            | Example     | Result |
| -------- | ------------------ | ----------- | ------ |
| `==`     | Equal (loose)      | `5 == "5"`  | true   |
| `===`    | Equal (strict)     | `5 === "5"` | false  |
| `!=`     | Not equal (loose)  | `5 != "5"`  | false  |
| `!==`    | Not equal (strict) | `5 !== "5"` | true   |
| `>`      | Greater than       | `6 > 3`     | true   |
| `<`      | Less than          | `2 < 5`     | true   |
| `>=`     | Greater or equal   | `5 >= 5`    | true   |
| `<=`     | Less or equal      | `4 <= 3`    | false  |

### Logical Operators

| Operator | Meaning | Example                | Result |
| -------- | ------- | ---------------------- | ------ |
| `&&`     | AND     | `(5 > 3) && (2 < 4)`   | true   |
| `||`     | OR      | `(5 > 3) || (2 > 10)`  | true   |
| `!`      | NOT     | `!(5 > 3)`             | false  |

### Assignment Operators

| Operator | Meaning             | Example  | Result      |
| -------- | ------------------- | -------- | ----------- |
| `=`      | Assign              | `x = 10` | 10          |
| `+=`     | Add and assign      | `x += 5` | `x = x + 5` |
| `-=`     | Subtract and assign | `x -= 2` | `x = x - 2` |
| `*=`     | Multiply and assign | `x *= 3` | `x = x * 3` |
| `/=`     | Divide and assign   | `x /= 2` | `x = x / 2` |

---

## 6.4 Functions

Functions group code so we can reuse it.

```javascript
function greet(user) {
  return "Hello, " + user + "!";
}

console.log(greet("Alice")); // Hello, Alice!
```

You can also write shorter functions with **arrow syntax (ES6):**

```javascript
const greet = (user) => "Hello, " + user + "!";
```

Functions can take parameters, return values, or both. Default parameter values are also allowed:

```javascript
function sayHello(name = "Guest") {
  console.log("Hello, " + name);
}

sayHello();       // Hello, Guest
sayHello("Reza"); // Hello, Reza
```

---

## 6.5 Conditionals

Conditionals let the program make decisions.

```javascript
let score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C or lower");
}
```

### Ternary Operator

A shorthand for `if…else`:

```javascript
let age = 18;
let message = (age >= 18) ? "Adult" : "Minor";
console.log(message);
```

### Switch Statement

```javascript
let day = 2;
switch(day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Other day");
}
```

---

## 6.6 Loops

Loops repeat code.

### `for` loop

```javascript
for (let i = 1; i <= 5; i++) {
  console.log("Number " + i);
}
```

### `while` loop

```javascript
let i = 1;
while (i <= 5) {
  console.log("Number " + i);
  i++;
}
```

### `do...while` loop

Always runs the block first, then checks the condition.

```javascript
let i = 1;
do {
  console.log("Number " + i);
  i++;
} while (i <= 5);
```

---

## 6.7 Arrays, Objects, and Dictionaries

Arrays, objects, and dictionaries are essential JavaScript data structures that let us organize and manage information.

### Arrays
An **array** holds an ordered list of values, such as a shopping list or grades of students.

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // apple
fruits.push("orange"); // adds a new item
console.log(fruits.length); // 4
```

Each value in an array is accessed using an **index** (starting from 0). Arrays can contain any data type — even other arrays or objects.

```javascript
let mixed = [1, "hello", true, { name: "Reza" }];
console.log(mixed[3].name); // Reza
```

### Objects
An **object** stores data in **key–value pairs**, making it ideal for representing entities with multiple properties.

```javascript
let student = {
  name: "Alice",
  age: 21,
  major: "Computer Science"
};

console.log(student.name);  // Alice
student.age = 22;           // modify a property
console.log(student["major"]); // another way to access a property
```

Objects in JavaScript naturally act like **dictionaries** because each key points to a value. You can think of them as collections of related data.

### Dictionaries (Using Objects and Maps)
In other programming languages (like Python), a **dictionary** is a structure that stores key–value pairs. In JavaScript, **objects** serve the same purpose.

However, ES6 introduced the **`Map`** object for more flexibility:

```javascript
let capitals = new Map();
capitals.set("France", "Paris");
capitals.set("Japan", "Tokyo");

console.log(capitals.get("France")); // Paris
console.log(capitals.size); // 2
```

Unlike plain objects, Maps:
- Keep keys in insertion order.
- Allow any data type (object, number, string) as a key.
- Have built-in methods like `.set()`, `.get()`, and `.has()`.

Use **objects** for structured data (like describing a person) and **Maps** for dynamic key–value data collections.

---


## 6.8 ES6 Features

ES6 (ECMAScript 2015) introduced many improvements to JavaScript. Some important ones are:

- `` and `` instead of `var`
- **Arrow functions**: `const add = (a, b) => a + b;`
- **Template literals**: `` `Hello ${name}` ``
- **Default parameters** in functions
- **Block scope** (variables declared inside `{}` are not visible outside)

---

## 6.9 DOM Manipulation Basics

The **DOM (Document Object Model)** is how JavaScript “sees” the HTML page.\
We can change text, style, or add/remove elements. In this module we only introduce the basic idea. In the next module we will explain the DOM in more detail and show how to work with it step by step.

```html
<h2 id="title">Welcome</h2>
<button onclick="changeText()">Click Me</button>

<script>
  function changeText() {
    document.getElementById("title").textContent = "Hello, JavaScript!";
  }
</script>
```

---

## 6.10 Events

Events are things the user does — like clicking, typing, or loading a page.
We can “listen” to events and react.

```html
<button id="btn">Click Me</button>

<script>
  document.getElementById("btn").addEventListener("click", function() {
    alert("Button was clicked!");
  });
</script>

```
