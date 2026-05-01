class CategoriesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" id="nav-categories">
                <i class="fas fa-thumbtack" style="color: var(--text-secondary);"></i>
                <span>Categories</span>
            </a>
        `;
    }

    addEventListeners() {
        const btn = this.container.querySelector('#nav-categories');
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show categories view, hide others
            const categoriesContainer = document.getElementById('categories-view-container');
            if (categoriesContainer) {
                categoriesContainer.style.display = 'block';
            }
            const scheduleContainer = document.getElementById('schedule-container');
            if (scheduleContainer) {
                scheduleContainer.style.display = 'none';
            }
            const analyticsContainer = document.getElementById('analytics-container');
            if (analyticsContainer) {
                analyticsContainer.style.display = 'none';
            }

            // Update header text
            const header = document.querySelector('.header-left h2');
            if (header) {
                header.textContent = 'Categories';
            }

            // Update active states
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            btn.classList.add('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CategoriesButton('categories-button-container');
});
