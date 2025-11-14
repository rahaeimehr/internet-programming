# Module 11 — Working with Data

> **Focus:** Understanding the need for persistent data storage in web applications and learning how to implement it in Node.js using **JSON files** and **SQLite databases**.

!!! note "Learning Outcomes"
    After completing this module, you will be able to:

    - Explain why web applications require persistent storage.
    - Describe why Node.js does not have a unified database interface.
    - Work with JSON files for simple data persistence.
    - Use SQLite to store and retrieve structured data efficiently.
    - Compare the strengths and limitations of JSON and SQLite in real-world scenarios.

---

## 11.1 The Need for Having Persistent Storage

In a simple JavaScript application, data typically exists only in memory while the program runs. Once the program stops or the server restarts, that data disappears entirely. This behavior is fine for small demonstrations, but real-world web applications need to keep information between sessions. For example, a user who registers on a website expects their account to remain available even after the server restarts.

Persistent storage refers to any mechanism that **saves data permanently to disk**, ensuring that it remains available across server restarts, crashes, and user sessions. Without such storage, your app would behave like a “temporary sandbox,” where every interaction is lost when the process stops.

Common examples of data that require persistence include:

- User information such as accounts, passwords, and profiles.
- Posts, messages, or uploaded content.
- Product listings or orders in e-commerce systems.
- Logs and analytics data.

A web application without persistent storage cannot maintain its state over time, which severely limits its usefulness. Implementing persistent storage transforms a simple server into a real application that can record history, support multiple users, and provide meaningful, long-term services.

---

## 11.2 No Unified Database Interface in Node.js

While Node.js is powerful and flexible, it does **not provide a unified or built-in interface** for working with databases. Each type of database—whether relational, document-based, or file-based—requires its own module or package. This is different from frameworks like Django (Python) or Laravel (PHP), which include built-in database abstraction layers.

### 11.2.1 Database Diversity

Databases differ greatly in how they store, organize, and query data. Because of that, Node.js developers use specific modules designed for each system:

| Database Type    | Example Databases         | Common Node.js Modules           |
| ---------------- | ------------------------- | -------------------------------- |
| Relational       | SQLite, MySQL, PostgreSQL | `better-sqlite3`, `mysql2`, `pg` |
| Document (NoSQL) | MongoDB                   | `mongodb`, `mongoose`            |
| Key-Value        | Redis                     | `redis`                          |
| File-based       | JSON files, CSV files     | built-in `fs` module             |

Each module exposes its own functions for connecting, querying, and closing the database. Therefore, **code written for one database cannot be reused** with another without modification. For example, the way you insert data in MySQL (`connection.query(...)`) differs from how you do it in SQLite (`db.prepare(...).run()`).

### 11.2.2 Why This Module Covers JSON and SQLite

In this course, we focus on two simple yet instructive data storage options that illustrate the main principles of persistence:

#### JSON File Storage

JSON (JavaScript Object Notation) is a lightweight text format natively supported by JavaScript. Because of its simplicity and compatibility, JSON is widely used in **REST APIs** to exchange data between clients and servers. Learning how to read and write JSON files in Node.js builds a foundation for handling structured data, both for persistence and communication.

Using JSON files is an excellent first step for beginners because it introduces concepts like serialization, data parsing, and file manipulation using Node.js’s built-in modules.

#### SQLite Database

SQLite is a self-contained, relational database engine that stores all data in a single `.db` file. It does not require a separate database server or installation, which makes it perfect for small and medium-sized web applications. It supports standard SQL queries, transactions, and indexing, giving you the experience of working with a true database system while keeping setup minimal.

By learning both JSON and SQLite, you’ll gain experience with two very different persistence models — one file-based and unstructured, the other relational and structured.

---

## 11.3 JSON File Storage

JSON file storage is the simplest way to make data persistent in Node.js. Since JSON is both human-readable and JavaScript-native, it can be used without any additional libraries.

### 11.3.1 Core Objects and Functions

The main Node.js modules and functions involved in JSON file persistence are:

- `fs`(File System module): for reading and writing files.
- `fs.readFileSync(path, 'utf8')` → reads the file content as a string. The second parameter `'utf8'` specifies the text encoding format to correctly interpret the file content as human-readable text instead of a binary buffer.
- `fs.writeFileSync(path, string)` → writes a string to the file.
- `JSON.parse(string)` → converts text to a JavaScript object or array.
- `JSON.stringify(object)` → converts an object to a compact JSON text string.

### 11.3.2 CRUD Operations with JSON

Below are short examples illustrating how to perform basic data operations.

#### Create and Write Data

```js
import fs from 'fs';
const FILE = 'data.json';
const users = [{ id: 1, name: 'Alice' }];
fs.writeFileSync(FILE, JSON.stringify(users));
```

This code creates a file called `data.json` and saves the `users` array into it.

#### Read Data

```js
const users = JSON.parse(fs.readFileSync(FILE, 'utf8'));
console.log(users);
```

The file is read as a string and then parsed into an array or object.

#### Search and Update Data

```js
const users = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// SEARCH by property value
const user = users.find(u => u.name === 'Alice');
if (user) {
  user.email = 'alice@updated.com'; // UPDATE the found record
  fs.writeFileSync(FILE, JSON.stringify(users));
}
```

In this example, the program searches for a specific user and updates one of its properties and saves the modified array back to disk.

#### Delete Data

```js
const users = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const remaining = users.filter(u => u.id !== 1);
fs.writeFileSync(FILE, JSON.stringify(remaining));
```

Deleting data simply means filtering out unwanted objects and saving the rest.

### 11.3.3 When to Use JSON Files

JSON storage is ideal for small projects, quick demos, and configuration files. It helps beginners understand the concepts of serialization and persistence without needing a full database. However, as soon as your app requires multi-user access, complex queries, or large datasets, you should migrate to a database system like SQLite.

---

## 11.4 Working with SQLite Databases

SQLite brings relational database features into a single-file format. It supports **SQL (Structured Query Language)** for creating tables, inserting, updating, and retrieving data.

### 11.4.1 Installing and Initializing SQLite

Install the `better-sqlite3` package, a fast and easy-to-use SQLite library:

```bash
npm install better-sqlite3
```

Create a database setup file, `db.js`:

```js
import Database from 'better-sqlite3';
const db = new Database('data.db');

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
)`);

export default db;
```
!!! tip
    The keyword 'default' designates `db` as the module's primary export. <br>
    When another file imports this module, it can choose any variable name to represent it. <br>
    Example:<br>
    `import myDatabase from './db.js'; ` <br>
    'myDatabase' refers to the default export
### 11.4.2 Core Methods

**Database-level methods:**

- `new Database(filename)` → creates or opens a database file.
- `db.exec(sql)` → executes SQL commands that don’t return data (e.g., CREATE TABLE).
- `db.prepare(sql)` → prepares a reusable **Statement** object.

**Statement-level methods:**

- `stmt.run(...params)` → performs INSERT, UPDATE, or DELETE operations.
- `stmt.get(...params)` → retrieves a single record.
- `stmt.all(...params)` → retrieves multiple records as an array.
- `stmt.iterate(...params)` → iterates through large result sets efficiently.

### 11.4.3 Example Operations

```js
import db from './db.js';

// INSERT
db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run('Bob', 'bob@example.com');

// SELECT
const all = db.prepare('SELECT * FROM users').all();

// UPDATE
db.prepare('UPDATE users SET name = ? WHERE id = ?').run('Robert', 1);

// DELETE
db.prepare('DELETE FROM users WHERE id = ?').run(1);
```

Parameterized queries (`?`) protect against SQL injection and make your database operations safe.

### 11.4.4 Advantages of SQLite

- Single-file setup, easy to manage.
- Handles large amounts of data efficiently.
- Supports complex queries and indexing.
- Safe for multiple concurrent reads and writes.
- Provides transactional safety to ensure data integrity.

SQLite acts like a lightweight version of MySQL or PostgreSQL, ideal for small to mid-sized applications and learning SQL fundamentals.

---

## 11.5 Comparing JSON and SQLite

| Feature           | JSON File                             | SQLite Database                            |
| ----------------- | ------------------------------------- | ------------------------------------------ |
| **Format**        | Plain text (human-readable)           | Binary database file                       |
| **Structure**     | Arrays or objects                     | Tables with rows and columns               |
| **Access API**    | `fs.readFileSync`, `fs.writeFileSync` | `db.prepare()`, `stmt.run()`, `stmt.all()` |
| **Performance**   | Slower (rewrites entire file)         | Faster, uses indexes                       |
| **Concurrency**   | Not safe for multiple writes          | Safe, supports transactions                |
| **Querying**      | Manual filtering in JS                | Full SQL support                           |
| **Ease of Setup** | Simplest (no install)                 | Minimal setup (install library)            |
| **Best Use Case** | Demos, configs, prototypes            | Realistic small to medium sites            |

SQLite is more robust and scalable, while JSON is best for learning or small-scale projects.

---
## 11.5 Example

This section demonstrates a **single** EJS template that can display data coming from **either** JSON or SQLite sources. 

**Scenario 1: Using JSON Storage**

```js
// app.js
import fs from 'fs';
import express from 'express';
const app = express();
app.set('view engine', 'ejs');

// JSON Scenario
app.get('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  const title = 'Users (JSON)';
  res.render('users', { title, users });
});

```
**Scenario 2: Using SQLite Storage**

```js
// app.js
import express from 'express';
import db from './db.js';
const app = express();
app.set('view engine', 'ejs');

// SQLite Scenario
app.get('/users-sqlite', (req, res) => {
  const users = db.prepare('SELECT id, name, email FROM users ORDER BY id DESC').all();
  const title = 'Users (SQLite)';
  res.render('users', { title, users });
});

```

**Template (EJS):`views/users.ejs`**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
  <table cellspacing="0" cellpadding="6">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <% if (!users || users.length === 0) { %>
        <tr><td colspan="3">No data</td></tr>
      <% } else { %>
        <% users.forEach(u => { %>
          <tr>
            <td><%= u.id %></td>
            <td><%= u.name %></td>
            <td><%= u.email %></td>
          </tr>
        <% }) %>
      <% } %>
    </tbody>
  </table>
</body>
</html>
```

---
## 11.7 Summary

Persistent storage allows applications to retain data across sessions, restarts, and failures. Node.js doesn’t have a single standard for databases, but it provides a rich ecosystem of packages for every need. In this module, we explored two practical approaches:

- **JSON File Storage:** Ideal for small-scale projects and configuration management.
- **SQLite Database:** A lightweight relational database with strong reliability and SQL support.

Mastering these approaches equips you to build real, data-driven applications that combine **Node.js**, **Express**, and **EJS** into complete web systems.

