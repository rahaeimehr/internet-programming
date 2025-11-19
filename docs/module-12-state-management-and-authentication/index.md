# Module 12 — State Management and Authentication

> **Focus:** How websites remember users between requests using cookies and sessions.

!!! note "Learning Outcomes"
    By the end of this module, you will be able to:

    - Understand why authentication is essential in modern web applications.
    - Explain what cookies are, how they work, and where they are stored.
    - Store and retrieve session data using Express and `express-session`.
    - Build a full login–logout flow with route protection.
    - Understand common session options, security considerations, and best practices.

---

## 12.1 Overview

So far, all applications we have built have been **stateless**.  
This means:

- The server treats each request as a completely new request.
- The server does not automatically know who the user is.
- Once a page is refreshed, any temporary information (like a username) disappears.

But real websites **must remember** information about users:

- When someone logs in, the site must keep them logged in across pages.
- Shopping sites must remember items in a cart.
- Course websites must remember which student is making requests.
- Social media platforms must keep track of which user is posting or commenting.

To solve this problem, websites use **state management**.

In this module, we study:

1. **Cookies** — small pieces of data stored in the browser.  
2. **Sessions** — information stored on the server and linked to the user via a cookie.  
3. **Session-based authentication** — the most common type of authentication in traditional web applications.

By the end of this module, you will be able to build a working login system that remembers users and protects certain pages.

---

## 12.2 Cookies: Storing Small Data in the Browser

A **cookie** is a small text file stored by the browser. Cookies allow websites to “remember” things between requests—for example:

- Language preferences
- Recently viewed pages
- Tracking data for analytics
- Shopping cart previews
- Theme settings

Cookies belong to the **client side**—they live **in the user's browser**, not on the server.  
Each cookie contains:

- A **name**
- A **value**
- Optional **settings** (expiration, security rules, etc.)

Browsers automatically send cookies to the server with every request to that domain.

### 12.2.1 Installing and Enabling `cookie-parser`

To work with cookies in Express, install the middleware:

```bash
npm install cookie-parser
```

Add the middleware:

```javascript
import cookieParser from "cookie-parser";
app.use(cookieParser());
```

After this step, your Express application gains a method and an object:

- `res.cookie()` → lets you **create** cookies
- `req.cookies` → lets you **read** cookies

### 12.2.2 Creating and Reading Cookies

Example:

```javascript
app.get("/set", (req, res) => {
    res.cookie("username", "Reza");
    res.send("Cookie set!");
});

app.get("/get", (req, res) => {
    res.send("Stored cookie: " + req.cookies.username);
});
```

Here:

- Visiting `/set` stores a cookie named `username`.
- Visiting `/get` reads the cookie and displays the value.

### 12.2.3 Signed Cookies (Detecting Tampering)

Normally, users can open the developer tools and manually modify their cookies.  
To prevent this, Express allows **signed cookies**, which include a cryptographic signature.

```js
app.use(cookieParser("mySecretKey123"));
```

Creating a signed cookie:

```js
res.cookie("username", "Reza", { signed: true });
```

Reading a signed cookie:

```js
req.signedCookies.username
```

If the cookie is altered, Express will treat the signature as invalid and return `undefined`.

### 12.2.4 Cookie Options in Detail

Cookies include many optional settings. Below is a deeper explanation.

**maxAge**

How long the cookie should last (in milliseconds):

```js
res.cookie("role", "student", { maxAge: 86400000 }); // 1 day
```

**expires**

Set a specific expiration date:

```js
res.cookie("promo", "active", { expires: new Date("2030-01-01") });
```

**httpOnly**

Prevents JavaScript from reading the cookie.  
This helps defend against **XSS attacks**.

```js
res.cookie("sessionID", "abc123", { httpOnly: true });
```

**secure**

Sends the cookie **only** over HTTPS connections:

```js
res.cookie("data", "123", { secure: true });
```

This is required for production environments using HTTPS.

### 12.2.5 Summary Table

| Option   | Purpose |
|----------|---------|
| **maxAge** | Lifetime in milliseconds |
| **expires** | Exact expiration date |
| **httpOnly** | Prevent access via JavaScript |
| **secure** | Only send over HTTPS |
| **signed** | Enable signed cookies |

Cookies are wonderful for storing small preferences or settings.  
However, they are **not** good for storing sensitive information like passwords.

For secure logins, we use **sessions**.

---

## 12.3 Sessions: Storing User Data on the Server

Cookies store data in the browser, which means:

- Users can view the data.
- Users can modify the data.
- Cookies can only hold small amounts of information.

**Sessions solve all these problems.**

With sessions:

- **The server stores the data**, not the browser.
- The browser stores **only a small session ID** (like a key).
- The session ID links to data stored on the server.

This is the most common way to implement **authentication**.

### 12.3.1 Installing and Enabling `express-session`

```bash
npm install express-session
```

```javascript
import express from 'express';
import session from 'express-session';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: true
}));
```

### 12.3.2 What the Session Middleware Actually Does

Once enabled, `express-session` automatically:

- Creates a **unique session ID** for each user.
- Stores the session ID inside a cookie in the browser.
- Creates a `req.session` object for the user.
- Saves session data on the server.
- Retrieves the correct session every time the user makes a request.
- Handles expiration, cleanup, and session signing.

You no longer need to manually manage IDs or user data.

### 12.3.3 Session Settings

**secret**

Used to sign the session ID cookie so users cannot forge it.  
This must be:

- Long  
- Random  
- Private  

**resave**

- `false` means the session will only be saved if modified.
- Helps reduce unnecessary database writes.

**saveUninitialized**

- `true` means a fresh new user gets a session even before login.
- Useful for tracking anonymous users.

### 12.3.4 Storing Data in a Session

You can store any data you want inside the session:

```js
req.session.username = "Reza";
req.session.role = "admin";
req.session.cart = ["book", "pen"];
```

This information becomes available across:

- Different pages
- Different routes
- Multiple requests

It disappears only when:

- The session expires
- The server restarts (unless using a session store)
- The user logs out

!!! note
    Each connection receives its own session. Changing a session property for one user does not affect the same property in other users’ sessions.
---

## 12.4 Building a Login System Using Sessions

This section shows you how to implement a full login system.

### 12.4.1 Displaying the Login Page

```js
app.get('/login', (req, res) => {
    res.render('login');
});
```

Example login form:

```html
<form action="/login" method="POST">
    <input type="text" name="username" placeholder="Enter username">
    <input type="password" name="password" placeholder="Enter password">
    <button>Login</button>
</form>
```

### 12.4.2 Processing Login
In a real application, usernames and passwords **must be checked against data stored in a database**. This means the server should:

1. Receive the username and password from the login form.
2. Search the database to find a user with the provided username.
3. Compare the provided password with the stored (hashed) password.
4. Log the user in only if both match.

Hard‑coded username/password checks should be used **only for learning purposes**, never in production.

Example demonstration (not secure for real deployments):

```js
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {
        req.session.user = username;
        req.session.isLoggedIn = true;
        return res.redirect('/dashboard');
    }

    res.render('login', { ErrorMsg: "Invalid Username or Password." });
});
```

### 12.4.3 Protecting Routes
In many websites, some pages should only be visible to users who are logged in. These pages are often called **protected routes**. Examples include:
- A student dashboard showing grades
- A profile page with personal information
- Administrative pages that require special permissions

Since HTTP is stateless, the server does not automatically know whether a user is logged in. Therefore, we must explicitly check the session every time a protected page is requested.

This is where **middleware** becomes extremely useful.

#### What is Middleware Used For Here?
Middleware is a function that runs **before** the actual route handler. Its job in this case is to:

1. Examine the session object.
2. Determine whether the user is logged in.
3. If they are logged in → allow the request to continue.
4. If not logged in → redirect them to the login page.

This approach centralizes your authentication logic and avoids repeating the same checks in every route.

Here is a simple middleware function:

```js
function requireLogin(req, res, next) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}
```

#### How the Middleware Is Applied
You attach the middleware to any route that requires authentication:

```js
app.get('/dashboard', requireLogin, (req, res) => {
    res.send(`Welcome ${req.session.user}`);
});
```

When the browser visits `/dashboard`, Express performs the following steps:

1. Calls `requireLogin()` first.
2. The middleware checks `req.session.isLoggedIn`.
3. If the user is not logged in, Express **never reaches** the dashboard handler and redirects the user to `/login`.
4. If the user is logged in, `next()` is called, and the request continues normally.

#### Why Middleware Is Important
- It avoids repeating session checks in every route.
- It keeps your routes clean and focused.
- You can apply the same middleware to many routes.
- It makes the application more secure and easier to maintain.

In real applications, you can even create advanced middlewares:

- `requireAdmin` to check user roles
- `requireEmailVerification`
- Permission-based access control

This makes middleware one of the most powerful features in Express.

### 12.4.4 Logging Out

```js
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});
```

---

## 12.5 Summary

- Cookies store small browser data.
- Sessions store data on the server.
- `req.session` allows storing per-user information.
- Login systems use sessions to remember users.
- Route protection ensures only logged-in users can access certain pages.
- Destroying the session logs the user out.

