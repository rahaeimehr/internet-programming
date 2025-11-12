# Module 10 — Templating and Forms with Express

> **Focus:** Building Dynamic Web Pages and Handling Form Submissions with Express.js and EJS

!!! note "Learning Outcomes"
    By the end of this module, you will be able to:

    - Understand how templating engines generate dynamic HTML.
    - Configure and use **EJS** with Express.
    - Pass variables from Express to EJS templates.
    - Handle HTML form submissions using `GET` and `POST`.
    - Display user input dynamically on a webpage.

---

## 10.1 Overview

In the previous module, you learned how to create a web server using **Express.js** and serve static files. Now we will make those pages **dynamic** using a templating engine called **EJS (Embedded JavaScript)**.

With EJS, you can combine HTML with JavaScript code to display data, loop through lists, and include conditional logic — all rendered by the server before sending the page to the browser.

---

## 10.2 What Is a Templating Engine?

A **templating engine** is a tool that helps developers create dynamic HTML pages. Instead of sending static HTML files to users, the server can fill placeholders in templates with real data at runtime. This allows you to reuse one HTML layout for multiple pages and personalize the content.

Several templating engines are commonly used in Node.js, such as:

- **EJS (Embedded JavaScript):** Uses standard HTML with special tags to include variables and logic. It’s easy to learn and integrates perfectly with Express.
- **Pug:** Uses indentation instead of HTML tags and focuses on brevity.
- **Handlebars:** Follows a logic-less approach and supports helpers for reusable snippets.
- **Mustache:** Lightweight and minimal, suitable for simple projects.

We use **EJS** in this course because:

- It feels like regular HTML, so it’s easy to learn.
- It integrates seamlessly with **Express.js**.
- It allows embedding JavaScript directly in the HTML.
- It requires minimal setup.

An EJS file is a mix of HTML and placeholders. These placeholders, like `<%= name %>`, are replaced at runtime with values passed from your JavaScript code. The table below lists the most common EJS tags and how they are used.

| Tag      | Purpose                               | Example                            |
| -------- | ------------------------------------- | ---------------------------------- |
| `<%= %>` | Displays a variable value             | `<%= username %>`                  |
| `<% %>`  | Runs JavaScript logic (no output)     | `<% if (isAdmin) { %> ... <% } %>` |
| `<%- %>` | Displays unescaped (raw) HTML content | `<%- htmlSnippet %>`               |

!!! Note 
    "Unescaped HTML" Unescaped HTML means that any HTML tags inside the variable will be rendered as actual HTML elements rather than as plain text. For example, if `htmlSnippet` contains `<b>Hello</b>`, using `<%= htmlSnippet %>` will display the literal text `<b>Hello</b>`, while `<%- htmlSnippet %>` will display **Hello** in bold.

---

## 10.3 Building a Dynamic Page with EJS

To use **EJS**, we first need to install it. Run this command in your project folder:

```bash
npm install ejs
```

This will add EJS as a dependency in your project, allowing Express to render `.ejs` files as templates.

Below is an Express app that renders a dynamic webpage using EJS.

### Example: Displaying a Welcome Page

```javascript
// app.js
import express from "express";
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  const student = "John Doe";
  res.render("index", { student });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```
!!! note "What Is a View?"
    - In Express, a **view** is a file that defines how information should be displayed to the user. Views are usually written using a templating engine like EJS and are stored in a special folder named `views`.  
    - When you call `res.render('index')`, Express automatically looks for a file called `index.ejs` inside the `views` folder and renders it with the data provided.  
    - Views separate the **presentation layer** (HTML templates) from the **application logic** (JavaScript routes and controllers).

### `views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome</title>
</head>
<body>
  <h1>Welcome, <%= student %>!</h1>
  <p>This page was generated using EJS.</p>
</body>
</html>
```

!!! Note "How It Works"
    - `app.set("view engine", "ejs")` tells Express to use EJS for templates.  
    - `res.render("index", { student })` renders the file `views/index.ejs` and passes the variable `student`.  
    - Inside the template, `<%= student %>` prints the variable’s value.

!!! tip "View Folder Name"
    By default, Express looks for templates in a folder named `views`. However, you can change this default by using `app.set('views', 'your_folder_name')` to specify a different folder name.

!!! tip
    You can define any variable name (for example `ss`) in your server code and pass it to the template by mapping it to the name you want to use inside the EJS file. For instance: `res.render('index', { student: ss });`. Inside `index.ejs`, you would still use `<%= student %>` to access the value of `ss`.

---

## 10.4 Handling Form Submissions

We typically use **GET** when the form submission simply retrieves or filters information (such as search queries), and **POST** when we are sending or changing data on the server (like submitting contact forms or uploading files). We also use **GET** when we just want to view or navigate to a route, such as when visiting a web page. GET requests append data to the URL, while POST requests include the data in the body of request packages, making them more secure for sensitive information.

Now let’s learn how to collect user input using an HTML form and display it dynamically.

### Example: Contact Form

#### `app.js`

```javascript
import express from "express";
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Parse form data
app.use(express.urlencoded({ extended: true }));

// GET route - show form
app.get("/contact", (req, res) => {
  res.render("contact");
});

// POST route - process form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  res.render("result", { name, email, message });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/contact");
});
```

!!! note
    We include `app.use(express.urlencoded())` so Express can parse data from HTML forms that use POST requests. Without this middleware, the server wouldn’t be able to read form input values sent in the request body (`req.body`). It essentially converts the encoded form data into a JavaScript object that we can access in our code.

!!! note
    The `extended: true` option in `express.urlencoded()` tells Express to use the **qs** library for parsing URL-encoded data, which supports rich objects and nested structures. If you set it to `false`, Express uses the built-in **querystring** library, which handles only simple key-value pairs.

#### `views/contact.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Contact Us</title>
</head>
<body>
  <h1>Contact Form</h1>
  <form action="/contact" method="POST">
    <label>Name:</label><br />
    <input type="text" name="name" required /><br /><br />

    <label>Email:</label><br />
    <input type="email" name="email" required /><br /><br />

    <label>Message:</label><br />
    <textarea name="message" required></textarea><br /><br />

    <button type="submit">Send</button>
  </form>
</body>
</html>
```

#### `views/result.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Submission Result</title>
</head>
<body>
  <h1>Submission Received!</h1>
  <p><strong>Name:</strong> <%= name %></p>
  <p><strong>Email:</strong> <%= email %></p>
  <p><strong>Message:</strong> <%= message %></p>

  <a href="/contact">Back to Form</a>
</body>
</html>
```

!!! note "Understanding `req.body`"
    The `express.urlencoded()` middleware parses the submitted form data and stores it in `req.body`.  
    You can then access individual fields using object destructuring, as shown above. These properties appear in `req.body` because the HTML form fields in `contact.ejs` use the attributes `name="name"`, `name="email"`, and `name="message"`. When the form is submitted, Express parses the incoming data and creates an object whose keys correspond to these `name` attributes.

!!! tip "Object Destructuring"
    **Object destructuring** is a shorthand syntax in JavaScript that allows you to extract values from an object and assign them to variables.  
    For example:
    ```javascript
    const person = { name: "Alice", age: 25 };
    const { name, age } = person;
    ```
    In the context of Express, the line `const { name, email, message } = req.body;` means:
    > “Take the `name`, `email`, and `message` properties from the `req.body` object and create variables with those names.”

---
## 10.5 Getting Parameters with GET Requests

When sending parameters using the **GET** method, there are two main approaches:

1. **Add parameters as key–value pairs** at the end of the URL by adding a question mark (`?`) and separating multiple pairs with an ampersand (`&`).
2. **Embed parameters directly in the route** as part of the URL path.

For example:

- Using key–value pairs → `/post?id=5`
- Embedding in the route → `/post/5`

---

### Understanding GET Parameters

When a user clicks a link such as:

```html
<a href="/post?id=5">View Post</a>
```

the browser sends a **GET** request to the server with a *query string* (`?id=5`) attached to the URL. Express can read this value easily through `req.query`.

---

### Example 1 — Using Query Parameters

```javascript
app.get('/post', (req, res) => {
  const postId = req.query.id;  // Access ?id=5
  res.send(`You requested post number ${postId}`);
});
```

If the user visits `http://localhost:3000/post?id=5`, the page will display:

```
You requested post number 5
```

---

### Example 2 — Using Route Parameters

Now let’s look at the same example using a **route parameter** instead of a query string.

```javascript
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;  // Access /post/5
  res.send(`You requested post number ${postId}`);
});
```

In this version, the URL looks cleaner and more semantic:

```
http://localhost:3000/post/5
```

!!! tip 
    Query parameters are useful for passing small pieces of data in a URL, such as filters, search keywords, or IDs.
    You can attach multiple parameters by separating them with `&`, for example:
    `/search?term=html&category=tutorial`.

---

### Comparison: Query Parameters vs. Route Parameters

| Type                | URL Example  | Accessed By     | Description                         |
| ------------------- | ------------ | --------------- | ----------------------------------- |
| **Query parameter** | `/post?id=5` | `req.query.id`  | Added after `?` in the URL          |
| **Route parameter** | `/post/5`    | `req.params.id` | Defined in the route as `/post/:id` |

!!! note 
    You can combine both in the same route if needed. For example:<br>
    `/post/5?mode=edit` → `req.params.id` is `5`, and `req.query.mode` is `"edit"`.

!!! tip

    Both query parameters and route parameters allow you to send data through URLs.

    - Use **query parameters** for optional or filter-type data.
    - Use **route parameters** when the value identifies a specific resource (like a post or user).

---

## 10.6 Summary

In this module, you learned how to:

- Set up **EJS** with Express.  
- Create templates that include JavaScript logic.  
- Render pages dynamically using `res.render()`.  
- Handle HTML forms with `GET` and `POST`.  
- Display submitted data on a result page.

In the next module, you will learn how to **work with databases** and connect your Express app to persistent data sources.

<!---

## Helper Videos

### Part 1

<iframe width="100%" height="315"
src="https://www.youtube.com/embed/zT3HQeEkd6k"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

-->