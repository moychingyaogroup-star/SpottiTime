class ImportantDatesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        const isActive = window.location.pathname.endsWith('important-dates.html') ? 'active' : '';
        this.container.innerHTML = `
            <a href="important-dates.html" class="nav-item ${isActive}">
                <i class="far fa-flag" style="color: var(--text-secondary);"></i>
                <span>Important Dates</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImportantDatesButton('important-dates-button-container');
});
