class BusinessButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item">
                <i class="fas fa-briefcase" style="color: var(--color-social-media);"></i>
                <span>Business</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BusinessButton('business-button-container');
});
