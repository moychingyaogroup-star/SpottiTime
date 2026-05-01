class MessagesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <i class="far fa-comment-dots" style="color: var(--text-secondary);"></i>
                    <span>Messages</span>
                </div>
                <div style="width: 16px; height: 16px; background-color: var(--accent-color); border-radius: 50%;"></div>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MessagesButton('messages-button-container');
});
