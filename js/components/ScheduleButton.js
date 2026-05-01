class ScheduleButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.addEventListeners();
    }

    render() {
        const isActive = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : '';
        this.container.innerHTML = `
            <a href="#" class="nav-item ${isActive || 'active'}" id="nav-schedule">
                <i class="far fa-calendar-alt" style="color: var(--color-family-time);"></i>
                <span>Schedule</span>
            </a>
        `;
    }

    addEventListeners() {
        const btn = this.container.querySelector('#nav-schedule');
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show schedule, hide analytics
            document.getElementById('schedule-container').style.display = 'block';
            const analyticsContainer = document.getElementById('analytics-container');
            if (analyticsContainer) {
                analyticsContainer.style.display = 'none';
            }

            // Update header text
            const header = document.querySelector('.header-left h2');
            if (header) {
                header.textContent = 'Schedule';
            }

            // Update active states
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            btn.classList.add('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScheduleButton('schedule-button-container');
});
