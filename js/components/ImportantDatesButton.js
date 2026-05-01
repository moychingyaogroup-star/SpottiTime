class ImportantDatesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item">
                <i class="far fa-flag" style="color: var(--text-secondary);"></i>
                <span>Important Dates</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImportantDatesButton('important-dates-button-container');
});
