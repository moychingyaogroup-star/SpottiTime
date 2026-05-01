class CategoriesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item">
                <i class="fas fa-thumbtack" style="color: var(--text-secondary);"></i>
                <span>Categories</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CategoriesButton('categories-button-container');
});
