# Module 2 — Introduction to CSS

> **Week:** 2  
> **Focus:** CSS fundamentals — syntax, selectors, the box model, colors/units, spacing

!!! note "Learning Outcomes"
    By the end of this module, you will be able to:

    - Explain how CSS works with HTML (the cascade and specificity at a high level).
    - Write valid CSS rules with selectors, properties, and values.
    - Apply styles using inline, internal, and external stylesheets, and choose the appropriate method.
    - Use common selectors (type, class, id, group, descendant, child, sibling, attribute, pseudo-class) to target elements.
    - Describe and apply the CSS box model (content, padding, border, margin) and `box-sizing`.
    - Work confidently with colors (hex, rgb/rgba, hsl/hsla) and units (px, %, em, rem, vw, vh).
    - Control spacing with margin/padding shorthands and understand collapsing margins.


## 2.1 Quick Recap: HTML & Where CSS Fits
HTML gives the structure and meaning of a page; CSS defines presentation (layout, colors, spacing, typography). Browsers combine the two to render the final page that users see. You write CSS rules that target one or more HTML elements and assign stylistic properties.

```html
  <!-- HTML structure -->
  <h1 class="title">Welcome</h1>
  <p>Hello, world!</p>
```

```css
  /* CSS presentation */
  .title { 
    color: #2b6cb0; 
  }
  p { 
    font-size: 14px;
    line-height: 1.6; 
  }
```

---

## 2.2 CSS Rules

A **CSS rule** is the basic instruction that tells the browser *what elements to style* and *how to style them*.

```css
selector {
  property: value;
  property: value;
}
```

* **Selector** → defines *which HTML element(s)* the rule applies to.
* **Declaration block** → everything inside the `{ }`.

    * A **property** specifies what aspect of the element’s style to change.
    * A **value** specifies the setting for that property.

!!! example
    ```css
    p {
      color: green;
      font-size: 18px;
    }
    ```

    - The **selector** `p` means: “apply these styles to all `<p>` elements.”  
    - The **declarations**:  
        - `color: green;` → makes the text green.  
        - `font-size: 18px;` → makes the text larger.  

---

## 2.3 CSS Properties

A **CSS property** is the specific presentation aspect of an element that you want to control — such as text color, font size, spacing, or background.

Here are some **common properties** you will use often:

| Property           | What It Controls                      | Example                    |
| ------------------ | ------------------------------------- | -------------------------- |
| `color`            | Text color                            | `color: blue;`             |
| `background`       | Background color or image             | `background: yellow;`      |
| `font-size`        | Size of the text                      | `font-size: 20px;`         |
| `font-weight`      | Thickness of text                     | `font-weight: bold;`       |
| `text-align`       | Horizontal alignment of text          | `text-align: center;`      |
| `width` / `height` | Size of an element’s box              | `width: 200px;`            |
| `margin`           | Space outside an element              | `margin: 10px;`            |
| `padding`          | Space inside an element (around text) | `padding: 5px;`            |
| `border`           | Line around an element                | `border: 1px solid black;` |

!!! note
    There are **hundreds of CSS properties**, but most web pages rely heavily on text, color, spacing, and layout-related ones. You’ll learn them gradually in this course.

---

## 2.4 Three Ways to Add CSS

### Inline styles (least preferred)

It can be used for quick demos or one-off overrides.

```html
<h1 style="color: darkslateblue;">Hello</h1>
```

**Cons:**

* Mixes style with content
* Hard to maintain
* Highest specificity (can be hard to override).

### Internal stylesheet (in the `<head>`)

Must be defined in a `style` element. Style elements should be placed in the `head` element of pages. It is good for small pages or prototypes.

```html
<head>
  <style>
    .card { 
      border: 1px solid #ddd; 
      padding: 1rem; 
    }
  </style>
</head>
```

### External stylesheet (recommended)

An external stylesheet is a separate file with the `.css` extension that contains CSS rules. These files must be linked to HTML pages using a `<link>` element, as shown below:

!!! example
    ```html
    <link rel="stylesheet" href="css/styles.css">
    ```
    - The `<link>` element must be placed inside the `<head>` section of the webpage.  
    - The `rel` attribute specifies the relationship, telling the browser that this file is a stylesheet.  
    - The `href` attribute provides the path (relative or absolute) to the CSS file.  

**Pros:**

- Reusable across multiple pages.  
- Best practice for real-world projects.  
- Promotes separation of concerns (HTML for structure, CSS for style).  

!!! note "Rule of thumb"
    Use external stylesheets for assignments unless the instructions explicitly require another method.
---

## 2.5 The “C” in CSS — Cascade (Overview)

When multiple rules apply to the same element, the browser resolves conflicts by considering:

1. **Importance** (e.g., `!important` overrides; avoid overusing)
2. **Specificity** (more specific selectors win)
3. **Source order** (later rules override earlier ones when specificity ties)

!!! tip "Naming and Structure of CSS rules"
    - Prefer meaningful class names
    - Avoid `!important` when possible
    - Organize CSS so later overrides are intentional.

---

## 2.6 Selectors You’ll Use Often

### Type (element) selector
Targets elements by **tag name**.

```css
p { line-height: 1.6; }
h1 { font-size: 2rem; }
img { max-width: 100%; }
```

!!! note
    - **When to use:** sensible defaults (base styles).
---

### Class selector

Targets elements with a given **class attribute**. Classes are reusable and elements can have multiple classes seperated by spaces.

```html
<button class="btn primary">Save</button>
<button class="btn">Cancel</button>
```

```css
.btn { padding: .5rem 1rem; }
.primary { background: #2b6cb0; color: white; }
```

!!! note
    - **When to use:** most day-to-day styling hooks.

---

### ID selector

Targets the element with a specific **id** (must be unique in the page).

```html
<section id="hero">...</section>
```

```css
#hero { background: #fffaf0; }
```

!!! Note 
    - **When to use:** anchors, JS hooks.

!!! warning
    - Very high specificity; avoid using IDs widely in CSS because they’re hard to override.

---

### Group selector

Apply the **same declarations** to multiple selectors.

```css
h1, h2, h3 { font-family: system-ui, sans-serif; }
```

Each item keeps its own specificity; grouping just avoids repetition.

---

### Descendant selector (space)

Matches elements **at any depth** inside another element.

```html
<section class="card">
  <p>Intro</p>
  <div><p>Nested paragraph</p></div>
</section>
```

```css
.card p { color: #334155; }   /* both <p> elements above match */
```

---

### Child selector (`>`)

Matches **direct children only** (one level down).

```html
<section class="card">
  <p>Intro</p>
  <div><p>Nested paragraph</p></div>
</section>
```

```css
.card>p { color: #334155; }   /* only the first <p> element above matches */
```
!!! note
    - **Use when:** you need strict structure control.

---

### Sibling selectors

* **Adjacent** (`+`) — matches the **next** sibling only.
* **General** (`~`) — matches **all following** siblings.

```html
<h2>Title</h2>
<p>Lead paragraph</p>
<p>Second paragraph</p>
```

```css
h2 + p { margin-top: .25rem; }  /* only the first p after h2 */
h2 ~ p { color: #475569; }      /* both paragraphs after h2 */
```

---

### Attribute selectors

Match elements by the presence or value of an attribute.

```css
/* presence / exact value */
a[target] { text-decoration-style: dotted; }
a[target="_blank"] { color: #1d4ed8; }

/* prefix / suffix / substring */
a[href^="http"] { /* starts with */ }
a[href$=".pdf"] { /* ends with   */ }
input[name*="email"] { /* contains */ }
```
!!! note
    - **Use cases:** buttons vs links, form inputs by type, external link styles.

---

### Pseudo-classes (state/structure)

Match elements in a **state** or at a **position**.

```css
a:hover { text-decoration: underline; }
input:focus { outline: 2px solid; outline-offset: 2px; }
li:first-child { margin-top: 0; }
li:nth-child(odd) { background: #f8fafc; }
```

---

### Bonus: Pseudo-elements (content parts)

Create or style virtual parts of an element. The rules below insert content **before** or **after** the element’s content.

```css
.card::before { content: "★"; margin-right: .25rem; }
.card::after  { content: ""; display: block; height: 1px; background: #e2e8f0; }
```


---

!!! tip "Common pattern"
    - Use **classes** for most styling hooks; reserve **IDs** for unique anchors or JavaScript hooks.


---

## 2.7 The CSS Box Model

Every element is a rectangular box:

```
margin (outside)
+------------------------------+  
|   border                     |
|   +----------------------+   |
|   |  padding             |   |
|   |  +---------------+   |   |
|   |  |   content     |   |   |
|   |  +---------------+   |   |
|   +----------------------+   |
+------------------------------+
```

Key properties:

* `width`, `height` apply to **content** by default.
* `padding`: The minimum space between the border and the content of an element.
* `border`: line around padding and content.
* `margin`: the space between the border and surrounding elements (separates from neighbors).
* `box-sizing`: If you set `box-sizing: border-box;`, then `width` and `height` include padding and border (easier layouts).

!!! example "Two CSS Rules"
    ```css
    * { box-sizing: border-box; }  /* '*' select all elements */
    .card {
      width: 300px;               /* includes padding + border with border-box */
      padding: 1rem;              
      border: 1px solid #e2e8f0;
      margin: 1rem auto;          /* top/bottom 1rem, centered block if width set */
    }
    ```

### Spacing shorthands

* `margin: 10px;` (all sides)
* `margin: 10px 20px;` (top/bottom, left/right)
* `margin: 5px 10px 15px;` (top, left/right, bottom)
* `margin: 5px 10px 15px 20px;` (top, right, bottom, left)

!!! Note "Collapsing Margins"
    Vertical margins of adjacent blocks may collapse into a single margin; padding/borders prevent collapsing.

---

## 2.8 Colors and Units

### 2.8.1 Colors
In CSS, colors can be applied to many properties such as `color`, `background-color`, and `border-color`. There are several common ways to define colors:

1. **Color Names**  
    CSS recognizes a set of predefined color names (e.g., `red`, `green`, `blue`, `black`, `white`).  

    ```css
    p {
      color: red;
    }
    ```

    !!! warning
        This way is simple and quick, but not flexible—you are limited to the browser’s list of names.

2. **Hexadecimal (Hex) Codes**
    Hex values represent colors using a `#RRGGBB` format, where each pair is a two-digit hexadecimal number (00–FF) for red, green, and blue.

        * Example: `#ff0000` → red
        * Example: `#00ff00` → green
        * Example: `#0000ff` → blue

        ```css
        p {
          color: #333333;  /* dark gray */
        }
        ```

    !!! note
        Hex is the most common way of specifying exact colors in CSS.

3. **RGB and RGBA**

    - **RGB:** Uses decimal values for red, green, and blue from `0` to `255`.
        ```css
        p {
          color: rgb(0, 128, 255);  /* bright blue */
        }
        ```
    - **RGBA:** Adds an *alpha channel* (transparency) as the 4th value, from `0` (fully transparent) to `1` (fully opaque).

        ```css
        p {
          color: rgba(0, 128, 255, 0.5);  /* semi-transparent blue */
        }
        ```

        !!! tip
            Useful when you want to control both color and transparency.

---

### 2.8.2 Units

CSS uses units to measure lengths, sizes, and spacing. Units can be:

1. **Absolute Units**
    These have fixed sizes and do not change based on the screen or parent element.

    - `px` → pixels (most common unit for web design).
    - `pt`, `cm`, `mm`, `in` → print-focused, rarely used in modern web design.

    Example:

    ```css
    p {
      font-size: 18px;
    }
    ```

1. **Relative Units**
    These are more flexible because they adapt to the context (e.g., parent element size or viewport).

    - `em` → relative to the font size of the parent element.
    - `rem` → relative to the root (`html`) element’s font size.
    - `%` → relative to another value (like parent’s width or font size).
    - `vw` (viewport width) and `vh` (viewport height) → relative to the size of the browser window.

    Example:

    ```css
    p {
      font-size: 1.2em;   /* 1.2 times the parent font size */
      margin: 10%;        /* margin = 10% of parent width */
    }
    ```

    !!! note "Best Practice"
        Use **relative units** (`em`, `rem`, `%`, `vw`, `vh`) whenever possible for responsive design. Absolute units like `px` are still useful but less adaptable on different screens.

## 2.9 Borders, Backgrounds, and Text Basics

```css
.box {
  border: 2px dashed #999;
  border-radius: 8px;          /* rounded corners */
  background: #f9fafb;         /* or background-image, background-size */
  color: #1a202c;              /* text color */
  line-height: 1.6;            /* readability */
}
```

Text-related properties you’ll use immediately:

* `font-family`, `font-size`, `font-weight`, `font-style`
* `text-align`, `text-decoration`, `text-transform`, `letter-spacing`

> **Reminder:** In this course, you may use `<b>`, `<i>`, and `<hr>` in HTML; prefer CSS for visual styling where possible.

---

## 2.10 Practice Lab — Style a Basic HTML Page

**Goal:** Take a simple HTML page and style it using an **external stylesheet**.

### Starter HTML (you may use or adapt)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Module 2 Lab</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <h1>My Sample Page</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="card">
      <h2>Welcome!</h2>
      <p>This is a paragraph to style.</p>
      <a class="btn" href="#">Call to Action</a>
    </section>
  </main>

  <footer class="site-footer">© 2025 Your Name</footer>
</body>
</html>
```

### Requirements

* Use an **external stylesheet** at `css/styles.css`.
* Demonstrate at least **6 different selectors** (e.g., `.class`, `#id`, `element`, descendant, pseudo-class like `:hover`, attribute).
* Apply **box model** properties: margin, padding, border, and `box-sizing: border-box;` globally.
* Use at least **two color formats** (e.g., `#hex` or `rgba()`).
* Use **relative units** for typography (`rem`, `em`) and **viewport units** at least once (`vh`, `vw`).
* Include a **hover** style for links or buttons.

!!! Note
    This lab is for practice only — **no submission required**. 
---

## 2.11 Common Pitfalls & Debugging

* Missing `link` tag or wrong path to `styles.css`.
* Typos in property names or forgetting semicolons.
* Inline styles overriding your stylesheet unintentionally.
* Overly specific selectors making later overrides hard.
* Expecting `width` to include padding/border without `box-sizing: border-box;`.

!!! tip "Debug tip"
    - Use your browser’s DevTools (Elements/Styles panels) to see which rules are applied and why some are crossed out.

---

## 2.12 Accessibility (A11y) Basics for CSS

* Ensure sufficient **color contrast** for text/background.
* Avoid conveying meaning **only** via color; pair with text/icons.
* Maintain readable **line-height** (\~1.5–1.7) and adequate **font sizes**.

---

## 2.13 Check Your Understanding (Self-Quiz)

1. What does `box-sizing: border-box;` change?
2. Which is more specific: `.card p` or `#card p`? Why?
3. Write a selector that targets all links that open in a new tab.
4. How do you center a fixed-width block element horizontally? (Give two methods.)


