# Module 9 — Web Servers with Node.js and Express

> **Focus:** Building Web Servers with Node.js and Express.js

!!! note "Learning Outcomes" 
    By the end of this module, you will be able to:

    - Understand the purpose of Express.js in web development.
    - Create a simple Express web server.
    - Handle different HTTP routes and requests.
    - Serve static files (HTML, CSS, and JS) using Express.
    - Use basic middleware to process and manage requests.

---

## 9.0 Overview

In the previous module, you learned how to run JavaScript outside of the browser using Node.js. Now, we’ll expand that knowledge to build **web servers** using Node.js and its most popular framework, **Express.js**.

Express simplifies the process of handling web requests, managing routes, and sending responses compared to Node’s built-in `http` module.

---

## 9.1 Client-Side vs. Server-Side Development

Web development can be divided into two main categories:

- **Client-Side Development:** Code that runs in the browser (HTML, CSS, and JavaScript) to control layout and interactivity.
- **Server-Side Development:** Code that runs on the server, handling requests, accessing databases, and sending responses back to the client.

When a user visits a website, the browser (client) sends a **request** to the **server**, which processes it and returns a **response** — usually an HTML page, JSON data, or a file.

---

## 9.2 Node.js Server Example

Node.js includes a built-in module called `http` that lets you create a basic web server. However, writing larger applications using only this module can quickly become complex.

### Example: Using the `http` Module (ES Modules)

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Home Page!');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the About Page.');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

This code creates a Node.js server that handles two routes (`/` and `/about`) and returns a 404 message for all others. You can test it by visiting:

- `http://localhost:3000` — displays *Welcome to the Home Page!*
- `http://localhost:3000/about` — displays *This is the About Page.*

While this approach works, it becomes inefficient for larger applications that require multiple routes and more advanced logic.

---

## 9.3 Setting Up Express in VS Code

Express.js simplifies server creation. Follow these steps to get started:

1. **Create a New Project Folder**<br>
    In VS Code, create a folder, for example:
```bash
C:\Users\YourName\Desktop\express-demo
```
2. **Initialize the Project**<br>
    Open the terminal and run:

    ```bash
    npm init -y
    ```
    This creates a `package.json` file to manage your project’s dependencies.

3. **Enable ES Modules**<br>
    Open `package.json` and add the following property at the top level:

    ```json
    {
      "type": "module"
    }
    ```

    !!! reminder 
        This allows Node.js to use `import` and `export` syntax.

4. **Install Express.js**<br>
    Run:

    ```bash
    npm install express
    ```

    !!! tip "Note" 
        You need to install Express.js once **per project**. Each project folder has its own `node_modules` directory. If you create a new project, you’ll need to reinstall it within that folder.

5. **Create `server`** (ES Modules)<br>
    Inside your folder, create a file named `server.js` and add:

    ```javascript
    import express from 'express';
    const app = express();

    app.get('/', (req, res) => {
      res.send('Welcome to my first Express server!');
    });

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
    ```

6. **Run the Server** <br>
    In the terminal, type:

    ```bash
    node server.js
    ```
    Then open your browser and go to `http://localhost:3000`.

---

## 9.4 Routing in Express

A **route** defines how your server responds to a request for a specific URL or HTTP method.

Example:

```javascript
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});
```

Now your server can return different responses depending on the requested route.

---

## 9.5 Serving Static Files

Express can easily serve **static files** such as HTML, CSS, images, and client-side JavaScript.

1. **Create a Folder Named** `public` <br>
    This folder stores all your static files (HTML, CSS, JavaScript, and images).

2. **Add Sample Files** <br>
    For example:

    - `index.html`
    - `style.css`
    - `script.js`

3. **Tell Express to Serve the Folder**<br>
    Add this line to your `server.js`:

    ```javascript
    app.use(express.static('public'));
    ```

    !!! tip "How It Works" 
    
        When someone visits `http://localhost:3000/style.css`, Express automatically looks for a file named `style.css` inside the `public` folder and sends it to the browser.

4. **Access the Files in Your Browser**

    - `http://localhost:3000/` — loads `public/index.html`
    - `http://localhost:3000/style.css` — loads your stylesheet
    - `http://localhost:3000/script.js` — loads your script

!!! tip 
    
    This setup keeps front-end files organized while your Express code focuses on backend logic.

---

## 9.6 Middleware Basics

**Middleware** are functions that execute between receiving a request and sending a response. They are powerful tools for logging, authentication, and data parsing.

Example:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Move to the next middleware or route handler
});
```

!!! note "Callback Parameters" 
    The callback in `app.get()` usually takes two parameters — `req` (the request object) and `res` (the response object). You can include a third parameter, `next`, to pass control to the next middleware or route when chaining functions.

Common built-in middleware includes:

- `express.static()` — serves static files.
- `express.json()` — parses incoming JSON data.

---

## 9.7 Summary

In this module, you learned how to:

- Set up a project using Express.js.
- Create and manage routes.
- Serve static files efficiently.
- Use middleware to process requests.

Express is the backbone of many modern web applications built with Node.js. In the next module, you’ll learn how to create **dynamic pages** using templating engines and handle **form submissions**.

---

## Helper Video

  Comming soon