class ScheduleButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        const isActive = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : '';
        this.container.innerHTML = `
            <a href="index.html" class="nav-item ${isActive}">
                <i class="far fa-calendar-alt" style="color: var(--color-family-time);"></i>
                <span>Schedule</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScheduleButton('schedule-button-container');
});
