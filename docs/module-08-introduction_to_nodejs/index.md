# Module 8 — Introduction to Node.js (Modern)

> **Focus:** Run JavaScript outside the browser, understand Node’s module systems, and set up a clean ES Modules workflow.

!!! note "Learning Outcomes" 

    By the end of this module, you will be able to:

    - Explain what Node.js is and how it differs from browser JavaScript.
    - Install Node.js and verify your environment (Node & npm).
    - Initialize a project and configure `package.json` for ES Modules.
    - Write and run Node scripts using modern `import`/`export`.
    - Use core (built‑in) modules and third‑party packages with npm.
    - Understand when to use ES Modules vs. CommonJS.

---

## 8.1 Web Programming

### Client-Side vs Server-Side Web Development

Web development is generally divided into **two major categories**:

| Type            | Where the Code Runs                                             | Purpose                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client-Side** | Runs in the user's browser (e.g., Chrome, Firefox)              | Handles how a webpage looks and behaves for the user. This includes HTML, CSS, and JavaScript that manipulate the page’s layout, animations, forms, and interactive features.               |
| **Server-Side** | Runs on a web server before the page reaches the user's browser | Handles how data is processed, stored, and delivered. It manages user authentication, database interactions, and the logic that determines what content or data to send back to the client. |

In modern applications, both parts work together — client-side code manages the **user interface**, while server-side code powers the **business logic and data flow** behind the scenes.


### What is Node.js?
**Node.js** is a **JavaScript runtime** that executes JS **outside the browser** using the V8 engine. With Node, you can write **server‑side** and command‑line programs in the same language you use for the web frontend. 

### Key ideas

Node.js stands out because of a few foundational design ideas that define how it works and why it is so efficient. Instead of relying on traditional multithreading, Node.js uses an **event‑driven architecture** that allows it to handle thousands of connections at the same time without waiting for one to finish before starting another. This approach makes it ideal for applications that need to process many small tasks quickly, such as APIs or chat servers.

Another key idea is that Node.js shares the **same JavaScript language** used on the web’s front end. Developers can use a single language for both the browser and the server, which simplifies learning and improves productivity.&#x20;

Finally, the **npm ecosystem** gives developers access to a vast collection of reusable packages that speed up development. This community‑driven library system is one of the reasons Node.js is so popular for modern web and server applications.

!!! example "Browser vs Node" 

    **Browser (console):** 
    ```javascript     
    console.log('Hello from the browser');     
    alert('Hi!');
    ```
    **Node (terminal):** 
    ```javascript
    console.log('Hello from Node');
    // note that it does not make sense to use alert funtion in a server
    ```



## 8.2 Node.js vs Other Server‑Side Platforms

Below is a simplified comparison between **Node.js** and a few of the most popular alternatives used for server‑side development.

| Platform                          | Language   | Strengths                                                                               | Typical Use Cases                                         |
| --------------------------------- | ---------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Node.js**                       | JavaScript | Large npm ecosystem, same language front and back, great for realtime apps (WebSockets) | APIs, SPAs backends, realtime dashboards, developer tools |
| **PHP**                           | PHP        | Simple deployment on shared hosting, huge CMS ecosystem (WordPress, Drupal)             | Blogs, CMS‑based sites, small to medium web apps          |
| **Python (Django/Flask/FastAPI)** | Python     | Mature frameworks, great data/ML integration, clear syntax                              | APIs, data‑driven apps, dashboards                        |
| **Java (Spring)**                 | Java       | High performance, enterprise‑grade, strong type system                                  | Large enterprise applications, banking, backend systems   |
| **.NET (C# / ASP.NET Core)**      | C#         | Excellent Windows/Azure integration, fast performance, strong IDE support               | Enterprise APIs, cross‑platform web apps                  |

**When Node.js shines**

- Realtime communication (chat, live updates).
- Same language for frontend and backend (JavaScript).
- Handles many simultaneous I/O operations efficiently.

**When to consider another option**

- Heavy **CPU‑bound** workloads → use **Go**, **Java**, or **.NET**.
- Content‑heavy CMS sites → use **PHP (WordPress)**.
- Strong **data science** integration → use **Python**.

!!! note 
    In this course we focus on **Node.js** because it complements your existing JavaScript skills and supports modern full‑stack development.

## 8.3 Install & Verify

1. Download the **LTS** version from <a href="https://nodejs.org" target="_blank">nodejs.org</a> and install.
2. Open a terminal and check versions:
   ```bash
   node -v
   npm -v
   ```

If both print version numbers, you’re set.

### What is the `node`?

When you type the `node` command in the terminal followed by a filename, you are telling your computer to run that file using the Node.js runtime. The `node` command executes JavaScript code outside the browser. It reads your file, compiles it into machine code using the **V8 engine**, and runs it immediately. You can use node to execute scripts, test code snippets, or run complete web servers built with frameworks like `Express`.

### What is the `npm`?

**npm (Node Package Manager)** is the tool that comes bundled with Node.js. It manages packages — reusable blocks of code that extend your application’s functionality. You can use `npm` to install libraries, update them, or share your own code with others. For example, when you type `npm install express`, `npm` automatically downloads and installs `Express` and its dependencies so you can use them in your project.

## 8.4 Project Setup for Using ES Modules (See section 8.8)

### Step 1: Create a Project Folder

Create a project folder and then open it in VS Code.

### Step 2: Initialize the Project

Inside VS Code’s terminal type the following command to initiate `package.json` file.

```bash
npm init -y
```

The `package.json` file stores project metadata and configuration for Node.js, including the project name, version, dependencies, scripts, and settings such as the module type. It tells npm which packages to install and defines commands you can run like `npm start` or `npm test`.

Now you enable ES Modules by editing your `package.json` file and adding the `"type": "module"` field anywhere between `{...}` .

```json
{
  ...
  "type": "module",
  ...
}
```

!!! note
    With `"type": "module"`, files ending in `.js` are treated as **ES Modules** (modern `import`/`export`). Without it, Node assumes **CommonJS** for `.js` files.

Alternative: keep `package.json` as‑is and use the `mjs` extension for ES Modules.

---

## 8.5 Your First Script

Create `app.js`:

```javascript
console.log('Welcome to Node.js (ESM)!');
```

Run it by typing the following command in VS code terminal:

```bash
node app.js
```

## 8.6 Using Built‑in (Core) Modules

With ES Modules enabled, import core modules like this:

### Example: `os`

```javascript
import os from 'os';

console.log('Platform:', os.platform());
console.log('CPU Arch:', os.arch());
```

### Example: `fs` (File System)

```javascript
import fs from 'fs';

fs.writeFileSync('message.txt', 'Hello from Node!');
const txt = fs.readFileSync('message.txt', 'utf8');
console.log('File content:', txt);
```

!!! note
    
    Other helpful core modules: `path`, `url`, `events`, `crypto`, `http`, `process`, `stream`.


## 8.7 Using npm Packages

Install packages from npm. For example:

```bash
npm install chalk
```

Then import and use them. For example:

```javascript
import chalk from 'chalk';

console.log(chalk.green('Success!'));
console.log(chalk.red('Error message'));
```

## 8.8 ES Modules vs CommonJS (and Interop)

JavaScript has evolved through two main module systems used in Node.js: **CommonJS (CJS)** and **ES Modules (ESM)**. Understanding the difference helps developers write consistent, maintainable code and use the right approach depending on their project’s setup.

**CommonJS (CJS)** is the *original* module system used in Node.js. It loads files synchronously and uses `require()` to import code and `module.exports` to share a function or class with other files. Since CommonJS was built specifically for Node, it remains compatible with many older libraries and scripts. For example:

```javascript
// math.cjs
module.exports = function add(a, b) {
  return a + b;
};

// app.cjs
const add = require('./math.cjs');
console.log(add(2, 3));
```

**ES Modules (ESM)** represent the modern, standardized way of organizing and sharing code across JavaScript environments. Introduced in ES6 (2015), they use `import` and `export` statements, support asynchronous loading, and are compatible with browsers. In Node.js, you enable ESM by adding `"type": "module"` to your `package.json` or by using the `.mjs` extension.

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

In essence, both module systems serve the same purpose — to organize code into reusable pieces — but **ESM is the future standard** across all JavaScript platforms, including Node.js and web browsers. CommonJS, while still supported, is primarily for backward compatibility with older projects.


## 8.9 Troubleshooting

| Symptom                                                        | Likely Cause                             | Fix                                                                                            |
| -------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `Cannot use import statement outside a module`                 | File is treated as CJS                   | Add `"type": "module"` to `package.json` **or** rename file to `.mjs`                          |
| `ERR_REQUIRE_ESM` when using `require('package')`              | The package is ESM‑only (e.g., chalk v5) | Switch to `import pkg from 'package'` and use ESM                                              |
| `TypeError: ... is not a function` when using a default import | Wrong import style (named vs default)    | Check the package docs; use `import pkg from ...` vs `import { named } from ...` appropriately |

---

## 8.10 Summary

- Node runs JS outside the browser; no DOM.
- Prefer **ES Modules** for modern code (`"type": "module"` or `.mjs`).
- Use core modules with `import` and third‑party packages via npm.
- Interop is possible: `createRequire` in ESM; `await import()` (inside async) in CJS.

