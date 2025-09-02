# Module 3 — HTML Advanced & Media Embedding

> **Week:** 3  
> **Focus:** Lists, tables, forms, and media (images, audio, video, iframe) with accessibility best practices

---

## 3.1 Learning Outcomes

!!! note "Learning Outcomes"
    By the end of this module, you will be able to:

    - Create semantic **lists** (ordered, unordered) and choose the right type for content.
    - Build accessible **tables** using `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th>` and use `colspan`/`rowspan` correctly.
    - Design basic **forms**: inputs, labels, fieldsets, validation attributes, and understand `action`/`method` at a high level.
    - Embed **images**, **audio**, **video**, and **YouTube** via `<iframe>` with appropriate attributes (e.g., `controls`, `poster`).
    
---

## 3.2 Lists — Ordered, Unordered

Use lists when items are related. Choose the list type that matches the **meaning** of your content, not just the look. Lists also help assistive technologies announce structure (e.g., “list of 5 items”).

### 3.2.1 Unordered lists (`<ul>`) — when order **does not** matter
Use for collections where sequence isn’t important (features, groceries, tags).

```html
<h3>Groceries</h3>
<ul>
  <li>Apples</li>
  <li>Milk</li>
  <li>Bread</li>
</ul>
```
!!! note "`<li>` elements"
    `<li>` defines a single **list item**. It must appear **inside** a `<ul>` (unordered list) or `<ol>` (ordered list). A list item can contain plain text or other HTML elements (e.g., `<a>`, `<p>`, or even another `<ul>` for nesting).
**Nesting**

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
    </ul>
  </li>
  <li>Dairy</li>
</ul>
```

**Styling sample**

```css
ul { list-style-type: disc; /* disc | circle | square | none */ }
ul.nav { list-style: none; margin: 0; padding: 0; }  /* for menus; remove default bullets */
```

!!! tip
    Navigation menus are often marked up as `<nav><ul>…</ul></nav>`. Remove bullets with `list-style: none` and lay items out with Flexbox (see Module 4).

---

### 3.2.2 Ordered lists (`<ol>`) — when order **does** matter

Use for steps, rankings, or sequences.

```html
<h3>Recipe Steps</h3>
<ol>
  <li>Preheat oven to 375°F.</li>
  <li>Mix ingredients.</li>
  <li>Bake for 25 minutes.</li>
</ol>
```

**Attributes you may need**

* `start` — set the starting number: `<ol start="5">…`
* `reversed` — count down: `<ol reversed>…`
* `type` — numbering style (`1`, `a`, `A`, `i`, `I`): `<ol type="a">…`
  *(Prefer CSS for visual styles when possible.)*
* `value` (on `li`) — override a specific item’s number: `<li value="10">Jump here</li>`

!!! warning
    Don’t use ordered lists to **fake** headings or layout. Use proper headings and CSS layout instead.

---

### Common patterns & pitfalls

* Only `li` elements can be children of `<ul>`/`<ol>`. 
* Use lists for **lists of things**; don’t use them just to indent or align content.
* For spacing between items, prefer CSS (`li { margin-bottom: .25rem; }`).
* Keep nesting clear and well-indented in your HTML so it’s easy to read and debug.

--- 

## 3.3 Tables — Structure & Accessibility

Use tables for **tabular data** (not page layout). Keep them simple: clear headers, a short description, and readable spacing.

### Parts of a table
- `<table>` — the whole table.
- `<caption>` — a short title for the table.
- `<thead>` — wraps header row(s).
- `<tbody>` — wraps main data row(s).
- `<tfoot>` — wraps footer row(s), e.g., totals or notes.
- `<tr>` — a row.
- `<th>` — a **header** cell (use in the top row and/or first column).
- `<td>` — a **data** cell.

### Example
```html
<table>
  <caption>Course Modules</caption>
  <thead>
    <tr>
      <th>#</th>
      <th>Topic</th>
      <th>Week</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Intro to the Web &amp; HTML</td>
      <td>1</td>
    </tr>
    <tr>
      <td>2</td>
      <td>CSS Fundamentals</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
```

### Styling sample

```css
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: .5rem; text-align: left; }
thead th { background: #f7fafc; }
caption { caption-side: top; font-weight: 600; margin-bottom: .5rem; }
```

### Rowspan and Colspan (merge cells)

**`colspan`** merges **columns** (cell stretches horizontally across multiple columns).

```html
<table>
  <caption>Product Prices</caption>
  <thead>
    <tr>
      <th>Item</th>
      <th colspan="2">Price</th> <!-- spans USD + EUR -->
    </tr>
    <tr>
      <th></th>
      <th>USD</th>
      <th>EUR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Notebook</th>
      <td>$5</td>
      <td>€4.50</td>
    </tr>
    <tr>
      <th>Pen</th>
      <td>$2</td>
      <td>€1.80</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Prices are approximate.</td>
    </tr>
  </tfoot>
</table>
```

**`rowspan`** merges **rows** (cell stretches vertically across multiple rows).

```html
<table>
  <caption>Class Times</caption>
  <thead>
    <tr>
      <th>Course</th>
      <th>Day</th>
      <th>Room</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2">Math</th> <!-- labels two rows -->
      <td>Mon 10:00</td>
      <td>Room 201</td>
    </tr>
    <tr>
      <td>Wed 10:00</td>
      <td>Room 201</td>
    </tr>
    <tr>
      <th>History</th>
      <td>Fri 9:00</td>
      <td>Room 105</td>
    </tr>
  </tbody>
</table>
```

### Accessibility basics

* Add a short, meaningful **`<caption>`**.
* Use `<th>` for header cells (top row for columns, first column for row labels).
* Don’t use empty cells for spacing—use CSS margins/padding instead.

### Common mistakes to avoid

* Using tables for **layout** instead of data.
* Mixing up `<th>` and `<td>`.
* No borders/padding, making tables hard to read.
* Hard-coded widths that break on small screens.

---

## 3.4 Forms — Inputs, Labels, Validation

Use forms to collect input from users. Keep structure simple and always label your inputs.

### Basic parts (what each element is for)

- **`<form>`** — wraps the whole form.  
  Use it to group controls that submit together. It has two important attributes:
    - **`action`**: where the form would send data (a URL). For now, you can use `"#"` while practicing.
    - **`method`**: `"get"` (adds data to the URL) or `"post"` (sends data in the body). In this course, use **`"get"`** unless told otherwise.
    
- **`<label>`** — the text description for an input/control.  
  Clicking a label focuses its input, which helps usability and accessibility.
    - Connect with **`for="id"`** (the label’s `for` must match the input’s `id`), **or** nest the input inside the label.

- **`<input>`** — single-line controls chosen by **`type`** (text, email, number, checkbox, radio, etc.).  
  Most inputs need:
    - **`id`** (to connect a label),
    - **`name`** (the key used when the form submits),
    - and a helpful **`placeholder`** (hint text; not a replacement for a label).

- **`<select>`** + **`<option>`** — a drop-down list.  
  Use when the user should choose from known values.
    - Put the machine-readable value in **`value`**: `<option value="support">Support</option>`.
    - Mark a default with **`selected`**.
    - set the `size` attribite to a number greater than 1 to make list instead of having a drop-down list

- **`<textarea>`** — a multi-line text box.  
  Control its size with **`rows`** (and `cols` if you want). Supports `maxlength`, `placeholder`, and `required`.

- **`<button>`** — clickable button.  
  Always set **`type`**:
    - `type="submit"` — submits the form.
    - `type="button"` — just a button (no submit).
    - `type="reset"` — clears form values.

- **`<fieldset>`** + **`<legend>`** — group related controls with a short label.  
  Great for **radio groups** or sections like “Contact info”.

!!! tip
    Every control that should be submitted needs a **`name`**. Without `name`, its value is **not** sent.

---

### Minimal example 

```html
<form action="process" method="get">
  <fieldset>
    <legend>Contact Us</legend>

    <label for="name">Name</label>
    <input id="name" name="name" type="text" placeholder="Your full name" required minlength="2" maxlength="60">

    <label for="email">Email</label>
    <input id="email" name="email" type="email" placeholder="you@example.com" required>

    <label for="topic">Topic</label>
    <select id="topic" name="topic" required>
      <option value="">-- Choose one --</option>
      <option value="support">Support</option>
      <option value="feedback">Feedback</option>
      <option value="other">Other</option>
    </select>

    <label>
      <input type="checkbox" name="subscribe" value="yes">
      Subscribe to updates
    </label>

    <fieldset>
      <legend>Preferred Contact</legend>
      <label><input type="radio" name="contact" value="email" checked> Email</label>
      <label><input type="radio" name="contact" value="phone"> Phone</label>
    </fieldset>

    <label for="message">Message</label>
    <textarea id="message" name="message" rows="4" maxlength="500" placeholder="How can we help?" required></textarea>

    <button type="submit">Send</button>
  </fieldset>
</form>
```

---

### Useful input types (basics, with when to use them)

* **`type="text"`** — general free-form text.
  Use for names, titles, short answers. Add `maxlength` to keep inputs reasonable.

* **`type="email"`** — email addresses with simple built-in checks.
  Browser validates format like `name@site.com`. Still add a label and `required` if needed.

* **`type="number"`** — numeric input with up/down controls.
  Use `min`, `max`, and `step` (e.g., `step="1"` for integers, `step="0.01"` for money).

* **`type="password"`** — hides characters on screen.
  Use for password fields; still just text under the hood (don’t store real passwords in coursework).

* **`type="checkbox"`** — on/off choice.
  Include a `value` (e.g., `"yes"`). Multiple checkboxes with the **same `name`** submit multiple values.

* **`type="radio"`** — choose **one** from a set.
  All radios in the same group share the **same `name`**; each has a different `value`. Use `checked` to set a default.

* **`type="date"`** — pick a calendar date.
  The browser shows a date picker. You can set `min`/`max` if needed.

* **`type="submit"`** — submit button.
  You can also use `<button type="submit">Send</button>` for custom text or icons.

---

### Common attributes to know (what they do, simply)

* **`id`** — unique identifier on the page.
  Lets a `<label>` point to the input via `for="…"`. Helpful for CSS/JS hooks later.

* **`name`** — the **key** used when data is submitted.
  Without it, the input’s value is **not included** in the submission.

* **`value`** — the current/initial value.
  For checkboxes/radios, this is the value sent when checked (e.g., `"yes"`).

* **`placeholder`** — short hint inside the input.
  Use as a cue, not a replacement for a proper `<label>`.

* **`required`** — blocks submission if the field is empty/invalid.
  Works with types like `email`, `number`, `date`, etc.

* **`min` / `max`** — lower/upper bounds for `number`, `date`, and friends.
  Example: `<input type="number" min="1" max="10">`.

* **`step`** — size of each change for `number`/`date`-like inputs.
  Example: `step="0.5"` allows halves; `step="1"` whole numbers only.

* **`minlength` / `maxlength`** — length limits for text and textarea.
  Example: `minlength="10"` ensures the user writes enough.

* **`checked`** — preselect a `checkbox`/`radio`.
  Only one radio in a group should be checked by default.

* **`selected`** — preselect an `<option>` in a `<select>`.
  If nothing is selected and the first option is a prompt (like “— Choose —”), set its `value=""` so `required` works.

* **`disabled`** — grays out a control and **excludes it** from submitted data.
  Use sparingly; users can’t interact with it.

* **`readonly`** — shows a value but disallows editing.
  Unlike `disabled`, **it will be submitted**.

!!! note
    Link labels to inputs using **`for="id"`** (or wrap the input inside the label). This improves accessibility and makes the label clickable.

---

### Styling sample

```css
form label { display: block; margin-top: .5rem; }
input, select, textarea { display: block; width: 100%; max-width: 480px; }
button { margin-top: .75rem; }
```

---

### Common mistakes to avoid

* Missing **`name`** on inputs (the value won’t be submitted).
* Using **`placeholder`** instead of a real `<label>`.
* Radios not working as a group (they must share the **same `name`**).
* Wrong `for`/`id` pairs, so labels don’t focus the right input.
* Putting a `<button>` without `type` inside a form (it defaults to **submit** and may submit unexpectedly).

---

## 3.5 Media — Images, Audio, Video, and YouTube

Embed media to enrich your page. Keep it simple, add helpful text, and choose sensible attributes.

### 3.5.1 Images (`<img>`)
Use images for content that adds meaning. Always include **alt text**.

```html
<img
  src="assets/imgs/campus.jpg"
  alt="Augusta University campus fountain at sunset">
```

* **`src`** — path to the image file.
* **`alt`** — text alternative (what the image shows/means). Use `alt=""` for purely decorative images.

!!! tip
    Keep file sizes small. Prefer modern formats (e.g., JPG/PNG; WebP if available).

---

### 3.5.2 Audio (`<audio>`)

Provide **controls** so users can play/pause. Include a short fallback message.

```html
<audio controls>
  <source src="media/intro.mp3" type="audio/mpeg">
  <source src="media/intro.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

* **`controls`** — shows play/pause UI.
* **Multiple `<source>`** — browser picks the first it supports.
* Optional: `loop`, `muted`.

!!! note
    Most browsers block **autoplay with sound**. If you must autoplay, set `muted`.

---

### 3.5.3 Video (`<video>`)

Give users controls and a **poster** image.

```html
<video controls width="640" height="360" poster="assets/imgs/poster.jpg">
  <source src="media/lesson.mp4" type="video/mp4">
  Sorry, your browser doesn’t support embedded videos.
</video>
```

* **`controls`** — shows play/pause UI.
* **`poster`** — placeholder image before playback.
* **`width`/`height`** — set the display size.
* Optional: `loop`, `muted`.

---

### 3.5.4 YouTube (via `<iframe>`)

Use the **embed** URL and a short, descriptive title. Keep attributes minimal.

```html
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Intro video: Course overview"
  allowfullscreen>
</iframe>
```

* **`src`** — use the `/embed/` URL from YouTube’s Share → Embed.
* **`title`** — short description for accessibility.
* **`allowfullscreen`** — lets users expand the video.

---

### Common mistakes to avoid

* Missing `alt` on images (or using long, unhelpful alt text).
* No `controls` on audio/video.
* Broken paths (check folders like `assets/` or `media/`).
* Using huge media files that slow the page.



