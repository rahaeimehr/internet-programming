# Module 7 — JavaScript & the Browser

> **Focus:** DOM manipulation, user interaction, and browser-based scripting

!!! Note "Learning Outcomes"
    By the end of this module, you will be able to:

    - Explain what the **Document Object Model (DOM)** is and how it represents a webpage.
    - Use JavaScript to **access and modify** HTML elements dynamically.
    - Implement **form validation** and handle user input using event listeners.
    - Use **timers** and **basic browser APIs** to add interactivity to web pages.
    - Build a small, interactive web application (e.g., a To‑Do list or calculator).

---

## 7.1 Working with the DOM

The **Document Object Model (DOM)** is a programming interface that allows JavaScript to access and manipulate the structure and content of a webpage. It represents the HTML document as a **tree of objects**, where each element, attribute, and text node is part of that tree.

You can think of the DOM as a *live map* of your webpage that JavaScript can explore and modify. JavaScript interacts with the DOM through the `document` object. The document object represents the entire web page and provides many useful methods and properties to locate, read, or modify HTML elements.

Here are some of the most useful methods and properties of the document object. All parameters passed to these methods are **string** values:

| Method / Property                     | Description                                            |
| ------------------------------------- | ------------------------------------------------------ |
| `document.getElementById(id)`         | Returns the element with the specified ID.             |
| `document.querySelector(selector)`    | Returns the first element that matches a CSS selector. |
| `document.querySelectorAll(selector)` | Returns all elements that match a CSS selector.        |
| `document.createElement(tagName)`     | Creates a new HTML element.                            |
| `document.body`                       | References the `<body>` element of the document.       |
| `document.title`                      | Gets or sets the page title.                           |
| `document.URL`                        | Returns the full URL of the current document.          |

### 7.1.1 Traversing and Manipulating the DOM

DOM traversal means moving through elements — parents, children, and siblings — in the document. You can use JavaScript to find elements, change styles, or even create new ones dynamically.

| Property / Method            | Description                       |
| ---------------------------- | --------------------------------- |
| `element.children`           | Returns all child elements.       |
| `element.parentElement`      | Returns the parent element.       |
| `element.nextElementSibling` | Returns the next sibling element. |

### 7.1.2 Example — Updating Content

```html
<p id="message">Hello, world!</p>
```

```javascript
const msg = document.getElementById("message");
msg.textContent = "Hello, JavaScript!";
```

This code accesses the `<p>` element and updates its text instantly.

Each element has `textContent` and `innerHTML` properties that allows you to read/set the content of an element:

  - The property `textContent` sets or returns the text inside an HTML element. It only handles plain text and does not render HTML tags.
  - The property `innerHTML` is similar but more powerful—it sets or returns the HTML *markup* inside an element. For example, using `element.innerHTML = '<b>Hello</b>'` will render **Hello** in bold.

### 7.1.3 Example — Changing Styles and Structure

```html
<ul id="fruits">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>

<script>
const list = document.getElementById("fruits"); // Access the element with id="fruits"
const firstItem = list.children[0]; // Get the first <li> (Apple)
firstItem.style.color = "red"; // Change text color to red

const newItem = document.createElement("li"); // Create a new list item
newItem.textContent = "Grapes"; // Add text content
list.appendChild(newItem); // Append new item to the list
</script>
```

In this example, JavaScript finds the first list item and changes its color, then creates and adds a new list item.

!!! Tip
    The DOM updates the webpage *live* — any changes you make with JavaScript are immediately visible to the user.

---

## 7.2 Handling Events

Events are actions that happen in the browser — clicks, mouse movements, keystrokes, and more. JavaScript can listen for these events and respond.

### 7.2.1 Adding Event Listeners
```javascript
const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Button clicked!');
});
```
When the button is clicked, the code inside the arrow function runs.

### 7.2.2 Event Object
When an event occurs, the browser sends an **event object** with information about it.
```javascript
document.addEventListener('click', (e) => {
  console.log('You clicked on:', e.target);
});
```
`e.target` refers to the specific element that triggered the event.

### 7.2.3 Using `closest()` in Event Handling
When you attach an event listener to a parent element (such as a `<ul>` or `<div>`), the `event.target` refers to the exact element that triggered the event — which could be a child element deep inside the structure.

To handle clicks reliably on a specific type of element (like a `<button>`), we use the **`closest()`** method.

```javascript
list.addEventListener('click', (e) => {  // Assume list already points to an <ul> element
  const btn = e.target.closest('button');
  if (btn) {
    console.log('Button clicked:', btn.className);
  }
});
```

**How it works:**

- `e.target` → the element that was actually clicked.
- `.closest('button')` → starts from that element and moves **up the DOM tree** to find the nearest `<button>` ancestor (including itself).
- If no matching ancestor exists, it returns `null`.

!!! Tip
    `closest()` is extremely useful for **event delegation** — you can attach a single listener to a parent container instead of adding separate listeners to every button. This makes your code more efficient and easier to maintain.


---
## 7.3 Handling User Input and Form Validation

You can use JavaScript to **validate user input** before sending data to the server. Even though basic validation (like required fields or input types) can be done using HTML itself, JavaScript allows us to perform more complex and customized validations.

### Example — Username Validation with a Regex

```html
<form id="signupForm">
  <label for="username">Username (3–16 letters, numbers, or _)</label>
  <input type="text" id="username" placeholder="Enter username">
  <p id="uErr" class="error"></p>
  <button type="submit">Create Account</button>
</form>

<script>
// Get form and input elements
const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const uErr = document.getElementById('uErr');

// Regex: 3–16 letters, numbers, or underscore
const userRe = /^[A-Za-z0-9_]{3,16}$/;

// Helper functions to set or clear error messages
function setError(msg) { uErr.textContent = msg; }
function clearError() { uErr.textContent = ''; }

// Validate on submit
form.addEventListener('submit', e => {
  const value = username.value.trim();
  if (!userRe.test(value)) {
    setError('Username must be 3–16 characters: letters, numbers, or _');
    e.preventDefault(); // Stop form submission if invalid
  } else {
    clearError();
    alert('Form submitted successfully!');
  }
});
</script>
```

### Optional: Understanding Regular Expressions (Regex)

Regular Expressions, or **Regex**, are patterns used to match text. They are powerful tools for checking if a string follows a specific format — for example, validating an email, password, or username.

| Symbol  | Meaning              | Example                                         |
| ------- | -------------------- | ----------------------------------------------- |
| `^`     | Start of the string  | `/^A/` matches any string starting with **A**   |
| `$`     | End of the string    | `/end$/` matches any string ending with **end** |
| `[A-Z]` | Any uppercase letter | `/[A-Z]/` matches **A–Z**                       |
| `\d`    | Any digit (0–9)      | `/\d/` matches **1**, **5**, **9**, etc.        |
| `{n,m}` | Length range         | `/[A-Za-z]{3,16}/` means 3–16 letters           |
| `?`     | Optional element     | `/colou?r/` matches *color* and *colour*        |

To check if a string matches a regex, use `.test()`. For example, `userRe.test(input)` returns `true` if the string matches the pattern.

!!! note
    Always validate user input **both on the client (JavaScript)** and **on the server (Node.js)** for security.

---
## 7.4 Browser Interaction: Timers, Alerts, and APIs

JavaScript can interact directly with the browser environment to make web pages more dynamic.

### 7.4.1 Alerts and Prompts

These simple methods display dialogs in the browser. The difference is that `alert` simply shows a message and waits for the user to press OK, while `prompt` displays a message and allows the user to input text that can be stored in a variable.

```javascript
alert("Welcome!");
const name = prompt("What is your name?");
console.log("User name:", name);
```

### 7.4.2 Timers

Use `setTimeout()` to run code once after a delay, or `setInterval()` to repeat code at a regular interval. Both functions take two parameters:

- `function` — runs the function once after *delay* milliseconds.
- `interval` — repeats the function every *interval* milliseconds until stopped with `clearInterval()`.

```javascript
setTimeout(() => console.log('Runs once after 2s'), 2000);
const id = setInterval(() => console.log('Repeats every 1s'), 1000);
setTimeout(() => clearInterval(id), 5000); // Stop after 5s
```

### 7.4.3 Accessing Browser APIs

The web browser provides many built‑in **APIs (Application Programming Interfaces)** that allow JavaScript to communicate with different parts of the browser and device.

Browser APIs can be grouped into several categories:

- **DOM APIs** – work with webpage elements and structure (e.g., `document`, `Element`, and `NodeList`).
- **Web Storage APIs** – store data locally using `localStorage` or `sessionStorage`.
- **Network APIs** – handle web requests, such as retrieving data via `fetch()`.
- **Multimedia APIs** – interact with audio, video, and camera.
- **Device APIs** – access hardware features like geolocation or sensors.

Most of these APIs are **beyond the scope of this course**, but it’s good to know they exist. In addition to the `document` object discussed earlier, two APIs you might find very useful are `localStorage` and `fetch()`, which we’ll explain briefly below.

#### The `localStorage` API

`localStorage` is part of the **Web Storage API** that lets web pages save data in the browser as **key–value pairs**. This data **persists even after closing the browser**.

**Key Characteristics:**

- Data is stored as **strings**.
- Each site gets its own storage space (around **5–10 MB**).
- Accessible only from the same origin (same domain and protocol).

| Method                             | Description                           |
| ---------------------------------- | ------------------------------------- |
| `localStorage.setItem(key, value)` | Stores a key–value pair.              |
| `localStorage.getItem(key)`        | Retrieves the value for a key.        |
| `localStorage.removeItem(key)`     | Deletes a specific key–value pair.    |
| `localStorage.clear()`             | Removes all stored data for the site. |

**Example:**

```javascript
localStorage.setItem('username', 'Reza'); // Save data
const name = localStorage.getItem('username'); // Retrieve data
console.log('Saved name:', name);
localStorage.removeItem('username'); // Delete data
```

!!! Note
    There is another concept called **cookies**, which also store data in the browser. Cookies are smaller (around 4 KB), automatically sent with every HTTP request, and mainly used for authentication or tracking. In contrast, `localStorage` stays client‑side and is better suited for larger, persistent data.

#### The `fetch()` API

The `fetch()` API is used to make **HTTP requests** from the browser. It is a modern, promise‑based replacement for `XMLHttpRequest`.

**Key Characteristics:**

- Handles asynchronous operations using Promises.
- Fetches text, JSON, images, and more from URLs.
- Supports multiple HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.).
<!-- Works seamlessly with `async/await`.-->

**Structure:**

```javascript
fetch(url, options)
  .then(response => response.json()) // Convert response to JSON
  .then(data => console.log(data))   // Handle the result
  .catch(error => console.error('Error:', error));
```

You can chain as many `.then()` calls as needed. Each `.then()` runs sequentially — one after the previous one completes — passing its resolved value to the next. They are **not executed in parallel**, but form a dependent asynchronous chain.

**Example:**

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'Reza', role: 'instructor' })
})
  .then(response => response.json())
  .then(data => console.log('Server response:', data))
  .catch(error => console.error('Fetch error:', error));
```

The `fetch()` API is essential for connecting front‑end pages to back‑end services or external data sources.

!!! Note
    Browser APIs are a vast, advanced topic. They are **not covered in full detail** here, but you’re encouraged to experiment with `localStorage` and `fetch()` in your projects, later.

---

## Summary

In this module, you learned how JavaScript connects to the browser through the DOM and how it responds to user actions.

You can now:

- Find and modify HTML elements dynamically.
- React to user interactions such as clicks and form submissions.
- Validate input with Regex and JavaScript.
- Use timers, alerts, and browser APIs to make web pages interactive.

Next, we’ll explore **server‑side programming** with **Node.js**, where JavaScript runs outside the browser to handle web requests and build complete web applications.

---

## Helper Videos

### Part 1

  <iframe width="100%" height="315"
  src="https://www.youtube.com/embed/f8CvCT-Jq9E?si=vDA_t3OFmKcqa-6R"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>

### Part 2

  <iframe width="100%" height="315"
  src="https://www.youtube.com/embed/da_KREq78GY?si=1DU8jEReKVDXuvNB"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>  

### Part 3

  <iframe width="100%" height="315"
  src="https://www.youtube.com/embed/WFhRTycq0-c?si=mmNkrcLrq93LZUO2"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>    