# Module 4 — CSS Layouts and Positioning

> **Week:** 4 <br>
> **Focus:** Page layouts and element positioning with CSS


!!! note "Learning Outcomes" 
    By the end of this module, you will be able to:
    
    - Explain the difference between `display`, `position`, and `float` in CSS.
    - Use `inline`, `block`, and `inline-block` display values appropriately.
    - Apply common `position` values (`static`, `relative`, `absolute`, `fixed`, `sticky`).
    - Understand and use the `float` and `clear` properties.
    - Build layouts using **Flexbox** for alignment and spacing.
    - Build layouts using **Grid** for two-dimensional control.
    - Apply simple responsive design ideas.

---

## 4.1 Display Property

HTML elements are generally classified as **block elements** or **inline elements**. Block elements start on a new line and expand to fill the available width, while inline elements flow within a line of text and only take as much space as needed. This difference has important consequences for how elements stack, wrap, and align on a page.

The CSS `display` property controls how elements appear in the layout, and it enables us to change this default block or inline behavior.

* **block**: Starts on a new line and takes the full width (e.g., `<div>`, `<p>`, `<h1>`).
* **inline**: Does not start on a new line; only takes up as much width as needed (e.g., `<span>`, `<a>`).
* **inline-block**: Behaves like inline, but allows width/height to be set.

!!! example 
    ```css
    p {
        display: inline-block;
        width: 200px;
    }     
    ```
---

## 4.2 CSS Positioning

By default, browsers render elements in the **normal flow**: block elements stack vertically one after another, while inline elements flow side by side within a line of text. This is the starting point for page layout.

The `position` property controls how an element is placed.

* **static**: Default, follows normal flow.
* **relative**: Positioned relative to its normal place.
* **absolute**: Positioned relative to the nearest positioned ancestor.
* **fixed**: Stays in the same place even when scrolling.
* **sticky**: Switches between relative and fixed, depending on scroll.

### Relative Positioning

Elements with `position: relative;` remain in the normal flow but can be nudged using top, right, bottom, or left. This is useful when you just want small adjustments.

!!! example
    ```css
    .relative-box {
        position: relative;
        top: 10px;
        left: 20px;
    }
    ```

### Absolute Positioning

Elements with `position: absolute;` are removed from the normal flow and placed relative to the nearest ancestor with a non-static position.

!!! example
    ```css
    .absolute-box {
        position: absolute;
        top: 50px;
        left: 100px;
    }
    ```

### Fixed Positioning

Elements with `position: fixed;` stay in the same spot relative to the viewport, even when scrolling.

!!! example
    ```css
    .fixed-box {
        position: fixed;
        bottom: 0;
        right: 0;
    }
    ```

### Sticky Positioning

Elements with `position: sticky;` act like relative until you scroll past them, then they stick like fixed.

!!! example 
    ```css
    .sticky-box {
        position: sticky;
        top: 0;
    }
    ```
### Stacking Order and `z-index`

When elements overlap, the browser decides which one should be shown **on top**. This is called the **stacking order**.  

By default:

- Elements that appear later in the HTML are placed above earlier ones.
- Positioning (`relative`, `absolute`, `fixed`, `sticky`) makes an element eligible for stacking order control.

The **`z-index` property** lets us change this order.  

- Higher values appear **in front** of lower values.  
- Negative values push elements **behind** others.  
- `z-index` only works on elements with a `position` other than `static`.  

!!! note "Quick Rule"
    If two elements overlap, the one with the **higher `z-index`** will be visible on top.


!!! example
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>z-index Example</title>
      <style>
        .box {
          width: 150px;
          height: 150px;
          position: absolute;
        }
        .red {
          background: red;
          top: 40px;
          left: 40px;
          z-index: 2; /* higher → on top */
        }
        .green {
          background: green;
          top: 80px;
          left: 80px;
          z-index: 1; /* shows behind green */
        }
      </style>
    </head>
    <body>
      <div class="box red"></div>
      <div class="box green"></div>
    </body>
    </html>
    ```

In this example:

- The red box appears first in the code but has `z-index: 2`.  
- The green box has `z-index: 1`, so it shows behind red.  

##4.3 Float and Clear

`float` was an older way to move elements left or right. When an element is floated, it is taken out of the normal flow and other content (like text) will wrap around it. This effect made it popular for wrapping text around images or for building multi-column layouts before Flexbox and Grid became common.

`clear` tells elements not to wrap around floated elements, which forces them to start below the floated content. This helps maintain structure when using floats.

!!! example 

    ```css
    #logo {
        float: left;
    }
    ```

!!! tip
    Today, **Flexbox** is preferred over floats for layouts.

---

## 4.4 Flexbox Layout System

Flexbox is a modern way to create flexible and responsive layouts.

* `display: flex;` turns a container into a flex container.
* `justify-content` controls horizontal alignment.
* `align-items` controls vertical alignment.
* `flex-wrap` allows items to wrap to a new line.

!!! example
    ```html
    <div class="container">
        <div class="box">Box 1</div>
        <div class="box">Box 2</div>
        <div class="box">Box 3</div>
    </div>

    ```
    ```css
    .container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;
    }
    .box {
        background-color: lightblue;
        padding: 20px;
    }
    ```
---

## 4.5 CSS Grid Layout System

Grid is another modern layout system that provides powerful two‑dimensional control (rows and columns). It is useful for creating full page layouts or complex content arrangements.

* `display: grid;` turns a container into a grid.
* `grid-template-columns` and `grid-template-rows` define the structure.
* `gap` sets spacing between grid items.
* Items can span multiple rows or columns with `grid-column` and `grid-row`.

!!! example
    ```html
    <div class="grid-container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>
    ```

    ```css
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 2fr; /* fr means fraction of available space */
        gap: 15px;
    }
    .item {
        background-color: lightcoral;
        padding: 20px;
        text-align: center;
    }
    ```

---

## 4.6 Responsive Design Basics (Preview)

Responsive design means making websites look good on all devices.

* Use `%` or `vw`/`vh` instead of fixed `px` when possible.
* Flexbox automatically adjusts space distribution.
* Media queries (covered in Module 5) allow more fine-tuned responsiveness.

!!! tip 
    Start with a mobile-friendly layout first (small screens) and then adjust for larger ones.


