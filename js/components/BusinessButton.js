class BusinessButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        const isActive = window.location.pathname.endsWith('business.html') ? 'active' : '';
        this.container.innerHTML = `
            <a href="business.html" class="nav-item ${isActive}">
                <i class="fas fa-briefcase" style="color: var(--color-social-media);"></i>
                <span>Business</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BusinessButton('business-button-container');
});
