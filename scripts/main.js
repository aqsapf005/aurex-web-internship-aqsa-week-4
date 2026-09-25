// Task Management App — Week 4
// Vanilla JS: DOM manipulation, events, form validation, localStorage persistence

const STORE_KEY = 'aurex_week4_tasks';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const err = document.getElementById('err');
const list = document.getElementById('list');
const empty = document.getElementById('empty');
const countEl = document.getElementById('count');
const filterBtns = document.querySelectorAll('.filters button[data-filter]');

let tasks = [];
let filter = 'all';

// ---- localStorage helpers ----
function loadTasks(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Failed to load tasks from localStorage', e);
    tasks = [];
  }
}

function saveTasks(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
  }catch(e){
    console.error('Failed to save tasks to localStorage', e);
  }
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---- Rendering ----
function render(){
  list.innerHTML = '';

  const visible = tasks.filter(t => {
    if(filter === 'active') return !t.done;
    if(filter === 'done') return t.done;
    return true;
  });

  empty.hidden = visible.length !== 0;

  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    li.dataset.id = t.id;

    const check = document.createElement('button');
    check.className = 'check';
    check.type = 'button';
    check.setAttribute('aria-label', 'Mark complete');
    check.addEventListener('click', () => toggleDone(t.id));

    const body = document.createElement('div');
    body.className = 'body';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = t.text;
    body.appendChild(title);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEdit(t, title));

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn del';
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => removeTask(t.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    li.appendChild(check);
    li.appendChild(body);
    li.appendChild(actions);
    list.appendChild(li);
  });

  const activeCount = tasks.filter(t => !t.done).length;
  countEl.textContent = activeCount + (activeCount === 1 ? ' task left' : ' tasks left');
}

// ---- Edit in place ----
function startEdit(task, titleEl){
  const box = document.createElement('input');
  box.className = 'edit-input';
  box.type = 'text';
  box.value = task.text;
  box.maxLength = 120;
  titleEl.replaceWith(box);
  box.focus();
  box.setSelectionRange(box.value.length, box.value.length);

  function commit(){
    const val = box.value.trim();
    if(val){
      task.text = val;
      saveTasks();
    }
    render();
  }

  box.addEventListener('keydown', e => {
    if(e.key === 'Enter'){ e.preventDefault(); commit(); }
    if(e.key === 'Escape'){ render(); }
  });
  box.addEventListener('blur', commit);
}

// ---- CRUD actions ----
function addTask(text){
  tasks.unshift({ id: uid(), text, done: false });
  saveTasks();
  render();
}

function toggleDone(id){
  const t = tasks.find(t => t.id === id);
  if(t){
    t.done = !t.done;
    saveTasks();
    render();
  }
}

function removeTask(id){
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// ---- Form validation & submit ----
form.addEventListener('submit', e => {
  e.preventDefault();
  const val = input.value.trim();

  if(!val){
    err.textContent = 'Type a task before adding it.';
    input.focus();
    return;
  }
  if(val.length > 120){
    err.textContent = 'Keep it under 120 characters.';
    return;
  }

  err.textContent = '';
  addTask(val);
  input.value = '';
});

input.addEventListener('input', () => { err.textContent = ''; });

// ---- Filtering ----
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    render();
  });
});

// ---- Init ----
loadTasks();
render();
