class AnalyticsButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.addEventListeners();

        // Check if we should auto-open analytics view
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('view') === 'analytics') {
            // Need a slight delay to ensure everything else is loaded and other nav buttons don't override
            setTimeout(() => {
                const btn = this.container.querySelector('#nav-analytics');
                if (btn) btn.click();
            }, 100);
        }
    }

    render() {
        this.container.innerHTML = `
            <a href="index.html?view=analytics" class="nav-item" id="nav-analytics">
                <i class="fas fa-chart-bar" style="color: var(--color-exercise);"></i>
                <span>Analytics</span>
            </a>
        `;
    }

    addEventListeners() {
        const btn = this.container.querySelector('#nav-analytics');
        btn.addEventListener('click', (e) => {
            const scheduleContainer = document.getElementById('schedule-container');
            const analyticsContainer = document.getElementById('analytics-container');

            // If we're not on the page with containers, let the normal link navigation happen
            if (!scheduleContainer || !analyticsContainer) {
                return;
            }

            e.preventDefault();

            // Show analytics, hide schedule
            analyticsContainer.style.display = 'flex'; // Or block depending on CSS
            scheduleContainer.style.display = 'none';

            // Update header text
            const header = document.querySelector('.header-left h2');
            if (header) {
                header.textContent = 'Analytics';
            }

            // Update active states
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            btn.classList.add('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsButton('analytics-button-container');
});
