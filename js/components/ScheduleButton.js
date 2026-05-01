class ScheduleButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item active">
                <i class="far fa-calendar-alt" style="color: var(--color-family-time);"></i>
                <span>Schedule</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScheduleButton('schedule-button-container');
});
