class FriendsButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item">
                <i class="fas fa-user-friends" style="color: var(--text-secondary);"></i>
                <span>Friends</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FriendsButton('friends-button-container');
});
