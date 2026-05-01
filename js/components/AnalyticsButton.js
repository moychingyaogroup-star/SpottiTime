class AnalyticsButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item">
                <i class="fas fa-chart-bar" style="color: var(--color-exercise);"></i>
                <span>Analytics</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsButton('analytics-button-container');
});
