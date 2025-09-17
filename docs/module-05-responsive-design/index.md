# Module 5 — Responsive Design & Media Queries

> **Week:** 5<br>
> **Focus:** Mobile‑first thinking, flexible layouts, and CSS media queries

!!! note "Learning Outcomes" 
    By the end of this module, you will be able to:

    - Explain why responsive design matters and what “mobile‑first” means.
    - Configure the viewport for correct scaling on phones and tablets.
    - Build fluid layouts using percentages, flexible units, and `max-width`.
    - Write CSS media queries with `min-width` breakpoints to adapt layout and typography.
    - Make images scale nicely without distortion.
    - Test layouts using browser DevTools device emulation.

---

## 5.1 What is Responsive Design?

Responsive design means your page **adapts** to different screen sizes (phone, tablet, laptop, desktop) without horizontal scrolling or tiny unreadable text. It also accounts for different orientations, input methods (touch vs. mouse), and pixel densities so the same content remains usable and readable everywhere. We achieve this by:

- Starting simple for small screens (mobile‑first).
- Using **fluid** measurements (%, `rem`, `vw/vh`) instead of fixed pixels when possible.
- Applying **media queries** to adjust styles at certain widths.
- Preferring a single‑column default that progressively enhances to multi‑column layouts at wider widths.
- Avoiding rigid fixed widths; use `max-width` on containers and sensible `min-width` on elements to prevent overflow and squished content.

This approach is often called **progressive enhancement**: begin with a solid baseline that works on the smallest, simplest environment, then layer on improvements for larger screens and more capable devices. It helps performance (less CSS/JS on the smallest layout), accessibility (clear reading order), and maintainability (one codebase that adapts).

!!! tip "Content First" Choose breakpoints based on where your **content** starts to look cramped or too spread out—not on a specific device model. While testing, drag the browser’s width and note where headings wrap awkwardly, cards feel too tight, or line length becomes uncomfortable—those are your natural breakpoints.

---

## 5.2 The Viewport Meta Tag

On mobile browsers, add this line inside `<head>` so CSS sizes match the device width and scaling:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without this tag, mobile devices often render the page as a zoomed‑out desktop site. By default, many mobile/tablet browsers simulate a much wider screen using a *virtual layout viewport*, which makes CSS pixel measurements behave as if the device were a desktop monitor. The viewport meta tag instructs the browser to use the device’s actual CSS‑pixel width, ensuring that measurements and media queries align with the real screen.

**Why this matters technically:** in CSS, `px` refers to a **CSS pixel** (an abstract unit), not a hardware pixel. Browsers map CSS pixels to device pixels using the **device pixel ratio (DPR)**. Without a viewport declaration, the layout viewport is often set to ≈980 CSS px and then the page is scaled down, so media queries (e.g., `@media (min-width: 600px)`) can behave as if you’re on a desktop even on a small phone.

Setting `width=device-width` makes the **layout viewport** match the device’s CSS‑pixel width (e.g., many phones are ≈360–430 CSS px wide), while `initial-scale=1` sets the initial zoom so 1 CSS px is rendered at the intended scale. This aligns your breakpoints, font sizes, and spacing with the **real CSS width** of the device. On high‑DPR screens (e.g., DPR = 3), 1 CSS px still maps to multiple hardware pixels for sharp rendering—that’s expected and desirable.

**Rule of thumb:** include this meta tag on responsive pages so your media queries fire at sensible widths, text is readable without forced zoom, and elements don’t appear tiny due to the artificial desktop‑sized viewport.



---

## 5.3 Flexible Layout Basics

*A flexible layout* is a layout that **adapts to the available space**. Instead of fixed pixel widths, it relies on relative units (%, `rem`, `vw/vh`) and flexible systems like **Flexbox** and **CSS Grid** so containers and columns can **grow, shrink, and wrap** as the viewport changes. Use a cap such as `max-width` to avoid overly long line lengths on large screens, and let content stack or reflow at sensible breakpoints to prevent horizontal scrolling.

*Here are a few practical techniques to make your layout fluid in practice:*

### Fluid Containers

```css
/* Let the layout breathe on any screen */
#wrapper {
  max-width: 1100px;   /* prevent ultra-wide lines on big screens */
  margin: 0 auto;      /* center on wide screens */
  padding: 1rem;       /* comfortable side spacing */
}
```

*Explanation:* 

- `max-width` acts as a **cap**—it prevents lines of text from becoming too long on large monitors, but still lets the container shrink naturally on phones. 
- `margin: 0 auto` horizontally centers the wrapper when there is extra space.
- `padding` adds consistent inner breathing room so content doesn’t touch the edges.

!!! tip "Helper Video"
    <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/hzDtsKxUeUQ?si=QuvtaLLQE1GvnLNm"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>

### Images that Scale

```css
img {
  max-width: 100%;
  height: auto;      /* keep aspect ratio */
  display: block;
}
```

*Explanation:* 

- `max-width: 100%` keeps images from overflowing their container; they never get wider than the layout allows. 
- `height: auto` preserves the native aspect ratio so images don’t look squished or stretched. 
- `display: block` removes the tiny baseline gap that inline images can create below them.

!!! note "Units to Know and Use"

    - `%` — relative to the parent size; great for columns that share available space. 
    - `rem` — relative to the root (`html`) font size; ideal for type scales and consistent spacing. 
    - `vh`/`vw` — 1% of the viewport height/width; useful for full‑width banners or hero sections.

!!! tip "Helper Video"
    <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/BfQG4aPkeE0?si=KLs5x9L-eyLc81PQ"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>


### Percentages for Columns

```css
.columns {
  display: flex;
  gap: 1rem;
}
.col {
  flex: 1 1 0;       /* let columns grow/shrink */
}
/* Example: make the first column a bit wider */
.col--wide { flex-basis: 60%; }
.col--narrow { flex-basis: 40%; }
```

*Explanation:* 

- Setting `.columns` to `display: flex` lays children side‑by‑side and distributes space between them with `gap`. 
- The shorthand `flex: 1 1 0` means **grow: 1**, **shrink: 1**, **flex‑basis: 0**—each column can expand to fill available space and contract when space is tight. 
- The modifier classes simply bias the share of width (e.g., 60% vs 40%) on wider screens. On very small screens you would typically switch to a stacked layout using media queries from §5.4.

!!! tip "Helper Video"
    <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/JbDVMq_ltEw?si=2Pup5LCqHB5hKP81"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
---

## 5.4 Media Queries & Breakpoints

*Once your layout is fluid by default, use media queries to make small, intentional adjustments as more space becomes available.* Use media queries to change styles at certain widths. We’ll use **mobile‑first** style: write default CSS for small screens, then add queries with `` for bigger screens.

**Syntax**

```css
/* Apply these rules when viewport width is at least 600px */
@media (min-width: 600px) {
  /* styles here */
}
```

**Example: Stack → Two Columns → Three Columns**

```css
.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;           /* phones: 1 column */
}

@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }  /* tablets: 2 columns */
}

@media (min-width: 900px) {
  .cards { grid-template-columns: 1fr 1fr 1fr; }  /* laptops/desktop: 3 columns */
}
```



!!! tip "Picking Breakpoints"     
    Start with simple, content‑driven points such as **600px** and **900px**. Add more only if you truly need them.

### Linking Stylesheets Conditionally (HTML `media` attribute)

Sometimes it’s useful to split your responsive CSS into multiple files and let the browser apply each file only when its media query matches. Use the `media` attribute on the HTML `<link>` tag:

```html
<!-- Mobile‑first base styles (always loaded/applied) -->
<link rel="stylesheet" href="base.css">

<!-- Apply only at ≥600px -->
<link rel="stylesheet" href="mq-600.css" media="(min-width: 600px)">

<!-- Apply only at ≥900px -->
<link rel="stylesheet" href="mq-900.css" media="(min-width: 900px)">

<!-- Print styles example -->
<link rel="stylesheet" href="print.css" media="print">
```

**How to organize files**

- `base.css` contains your default (mobile) styles.
- Each `mq-*.css` file contains **only overrides** needed at that breakpoint.
- Keep selectors consistent so overrides are clear.

!!! tip "Which approach should I use?" 
    For this course, prefer **one stylesheet with media queries** (simpler to learn/maintain). Split into multiple files only if your project grows large or your team wants per‑breakpoint ownership.

!!! warning "Performance & gotchas" 

    - Many browsers will still **download** linked stylesheets even if the media doesn’t currently match (they may defer applying). Keep the number of files modest. 
    - **Order matters**: later stylesheets can override earlier ones if selectors have equal specificity.


<!--!!! tip "Helper video"
    📂 [Download starter files (ZIP)](../assets/files/5_4_starter.zip)  
    <iframe width="100%" height="315"
    src="https://www.youtube.com/embed/yiBICwzwsoY?si=-Jv1YWCfdBSJxpGR"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
-->

---



## 5.5 More on Flexible Layouts

### Testing & debugging your responsive layout

- Use the **Device Toolbar** in browser DevTools (Chrome/Edge/Firefox) to emulate common screen sizes.
- Test both **portrait** and **landscape** orientations.
- Check for **horizontal scrolling** on narrow screens; if it appears, inspect which element is overflowing.
- Inspect **computed styles** and **active media queries** to see which rules are currently applied.

---

### Typography that scales

Keep text readable on all screens by setting a clear base size and scaling up at wider widths.

```css
html { font-size: 100%; }    /* usually 16px */
body { font-size: 1rem; line-height: 1.6; }

h1 { font-size: 1.75rem; }
h2 { font-size: 1.5rem; }

@media (min-width: 900px) {
  body { font-size: 1.125rem; }   /* 18px if base is 16px */
  h1 { font-size: 2rem; }
}
```

*Why this works:* 

- using `rem` ties sizes to the root font, making type scales predictable and easy to increase at a breakpoint. 
- `line-height` improves readability, and a modest bump at ≥900px keeps text comfortable on large screens.

!!! tip "Line Length" 
    Aim for ≈45–75 characters per line. Use `max-width` on text containers to avoid very long lines on desktops.

---

### Navigation that adapts

Start vertical for phones; switch to horizontal on wider screens.

```html
<nav class="site-nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Contact</a>
</nav>
```

```css
.site-nav {
  display: flex;
  flex-direction: column;     /* stack on phones */
  gap: .5rem;
}
.site-nav a { text-decoration: none; padding: .5rem 1rem; }

@media (min-width: 600px) {
  .site-nav { flex-direction: row; }    /* inline on wider screens */
}
```

*Why this works:* 

- defaulting to a column uses the available vertical space on phones. 
- A single `min-width` query flips to a row, matching common desktop navigation without extra markup or JS.



!!! warning "Common pitfalls" 

    - Fixed pixel widths (e.g., `width: 1200px`) on containers cause overflow on phones. 
    - Absolute positioning for major layout often breaks responsiveness. 
    - Forgetting the viewport meta tag leads to zoomed‑out pages on mobile.

