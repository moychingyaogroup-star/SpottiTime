// ── TASKS SYSTEM ─────────────────────────────────────────────────────────────
function getTasks() {
    return gs('TASKS') || [
        { id: 1, text: "Organize my schedule for the week", done: false },
        { id: 2, text: "Finish math homework", done: false }
    ];
}

function saveTasks(t) {
    ss('TASKS', t);
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach(t => {
        const item = document.createElement('div');
        item.className = 'task-item' + (t.done ? ' done' : '');
        item.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:10px; background:var(--surface); border:1px solid var(--border); border-radius:8px; margin-bottom:8px;';

        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" ${t.done ? 'checked disabled' : ''} style="cursor:pointer; width:18px; height:18px;" onchange="completeTask(${t.id}, event)">
                <span style="text-decoration:${t.done ? 'line-through' : 'none'}; color:${t.done ? 'var(--muted)' : 'var(--text)'};">${escHtml(t.text)}</span>
            </div>
            ${t.done ? '' : `<button onclick="deleteTask(${t.id})" style="background:none; border:none; cursor:pointer; color:#EF4444; font-size:16px;">🗑</button>`}
        `;
        taskList.appendChild(item);
    });
}

function completeTask(id, e) {
    const tasks = getTasks();
    const t = tasks.find(x => x.id === id);
    if (t && !t.done) {
        t.done = true;
        saveTasks(tasks);

        // Award 50 points
        const rect = e.target.getBoundingClientRect();
        awardPoints(50, rect.left + window.scrollX, rect.top + window.scrollY);
        showToast('Task Complete! +50 pts 🎉');
        beep('complete');

        renderTasks();
    }
}

function deleteTask(id) {
    const tasks = getTasks().filter(x => x.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function addTask() {
    const input = document.getElementById('new-task-input');
    const text = input.value.trim();
    if (!text) return;

    const tasks = getTasks();
    tasks.push({ id: Date.now(), text, done: false });
    saveTasks(tasks);
    input.value = '';
    renderTasks();
}


// ── BIRD ANIMATION ───────────────────────────────────────────────────────────
function initBird() {
    const bird = document.createElement('div');
    bird.id = 'flappy-bird';
    bird.style.cssText = `
        position: fixed;
        top: 20%;
        left: -50px;
        font-size: 32px;
        cursor: pointer;
        z-index: 9999;
        transition: transform 0.1s;
        user-select: none;
    `;
    bird.innerHTML = '🦅';
    document.body.appendChild(bird);

    let birdX = -50;
    let birdY = window.innerHeight * 0.2;
    let amplitude = 50;
    let time = 0;
    let flap = true;

    function animateBird() {
        birdX += 2;
        time += 0.05;
        birdY = (window.innerHeight * 0.2) + Math.sin(time) * amplitude;

        // Flap effect
        if (Math.sin(time * 5) > 0) {
            bird.style.transform = 'scaleY(0.8)';
        } else {
            bird.style.transform = 'scaleY(1)';
        }

        bird.style.left = birdX + 'px';
        bird.style.top = birdY + 'px';

        if (birdX > window.innerWidth + 50) {
            birdX = -100; // Reset
            birdY = Math.random() * (window.innerHeight * 0.6) + 100;
        }

        requestAnimationFrame(animateBird);
    }

    bird.addEventListener('click', (e) => {
        // Award 25 points
        awardPoints(25, e.clientX, e.clientY);
        showToast('Caught the bird! +25 pts 🦅');
        beep('milestone');

        // Make the bird fly away fast
        birdX = window.innerWidth + 100;
    });

    animateBird();
}

document.addEventListener('DOMContentLoaded', () => {
    // We will initialize the bird on the home view or globally
    initBird();
    // Wait for the UI to exist
    setTimeout(renderTasks, 500);
});
