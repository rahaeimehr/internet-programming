/* 
  To-Do List — Reference Solution
  - Core features: add, complete, delete, input validation
  - Bonus: localStorage persistence
*/

(function () {
  const form = document.getElementById('todoForm');
  const input = document.getElementById('taskInput');
  const list = document.getElementById('taskList');
  const countTotalEl = document.getElementById('countTotal');
  const countDoneEl = document.getElementById('countDone');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');

  /** ------- Model (stored in localStorage) ------- **/
  /** Each item: { id: string, text: string, done: boolean } */
  let tasks = load();

  renderAll();

  /** ------- Events ------- **/
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = (input.value || '').trim();
    if (!text) {
      alert('Please enter a non-empty task.');
      input.focus();
      return;
    }
    addTask(text);
    input.value = '';
    input.focus();
  });

  // Event delegation for Complete/Delete buttons
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const li = btn.closest('li.todo');
    if (!li) return;

    const id = li.dataset.id;
    if (btn.classList.contains('complete')) {
      toggleDone(id);
    } else if (btn.classList.contains('delete')) {
      removeTask(id);
    }
  });

  clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.done);
    persist();
    renderAll();
  });

  clearAllBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks? This cannot be undone.')) {
      tasks = [];
      persist();
      renderAll();
    }
  });

  /** ------- Functions ------- **/
  function addTask(text) {
    const task = {
      id: cryptoRandomId(),
      text,
      done: false
    };
    tasks.push(task);
    persist();
    renderTask(task);
    updateCounts();
  }

  function toggleDone(id) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    t.done = !t.done;
    persist();
    const li = list.querySelector(`li[data-id="${id}"]`);
    if (li) {
      li.classList.toggle('done', t.done);
    }
    updateCounts();
  }

  function removeTask(id) {
    tasks = tasks.filter(x => x.id !== id);
    persist();
    const li = list.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();
    updateCounts();
  }

  function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'todo';
    li.dataset.id = task.id;
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.type = 'button';
    completeBtn.className = 'icon complete';
    completeBtn.setAttribute('aria-label', 'Mark complete');
    completeBtn.textContent = task.done ? 'Undo' : 'Complete';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'icon delete';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.textContent = 'Delete';

    // Keep the button labels in sync with done state (on click)
    completeBtn.addEventListener('click', () => {
      // Delegate also handles it, but this keeps label instant on keyboard activation
      setTimeout(() => {
        const t = tasks.find(x => x.id === task.id);
        if (!t) return;
        completeBtn.textContent = t.done ? 'Undo2' : 'Complete2';
      }, 1000);
    });

    li.append(span, completeBtn, deleteBtn);
    list.prepend(li); // newest on top
  }

  function renderAll() {
    list.innerHTML = '';
    // newest first for visibility
    [...tasks].reverse().forEach(renderTask);
    updateCounts();
  }

  function updateCounts() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    countTotalEl.textContent = String(total);
    countDoneEl.textContent = String(done);

    // Update button labels for visible items
    list.querySelectorAll('li.todo').forEach(li => {
      const id = li.dataset.id;
      const t = tasks.find(x => x.id === id);
      const completeBtn = li.querySelector('button.complete');
      if (t && completeBtn) {
        completeBtn.textContent = t.done ? 'Undo' : 'Complete';
      }
    });
  }

  function persist() {
    try {
      localStorage.setItem('assignment7_tasks', JSON.stringify(tasks));
    } catch {
      // If storage fails (private mode or quota), just ignore.
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem('assignment7_tasks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function cryptoRandomId() {
    // Prefer crypto API for uniqueness; fallback if unavailable
    if (window.crypto && crypto.getRandomValues) {
      const buf = new Uint32Array(2);
      crypto.getRandomValues(buf);
      return [...buf].map(n => n.toString(36)).join('');
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
})();
