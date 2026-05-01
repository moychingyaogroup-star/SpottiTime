class AnalyticsButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" id="nav-analytics">
                <i class="fas fa-chart-bar" style="color: var(--color-exercise);"></i>
                <span>Analytics</span>
            </a>
        `;
    }

    addEventListeners() {
        const btn = this.container.querySelector('#nav-analytics');
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show analytics, hide others
            const analyticsContainer = document.getElementById('analytics-container');
            if (analyticsContainer) {
                analyticsContainer.style.display = 'flex'; // Or block depending on CSS
            }
            document.getElementById('schedule-container').style.display = 'none';
            const categoriesContainer = document.getElementById('categories-view-container');
            if (categoriesContainer) {
                categoriesContainer.style.display = 'none';
            }

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
