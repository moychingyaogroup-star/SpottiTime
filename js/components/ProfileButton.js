class ProfileButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="profile-section" style="padding: 16px 20px; margin: 0 12px 24px; background-color: var(--bg-hover); border-radius: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                <div class="profile-avatar" style="width: 40px; height: 40px; background-color: #ffb84d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                    🐱
                </div>
                <div class="profile-info">
                    <div class="profile-name" style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Time Architect</div>
                    <div class="profile-level" style="font-size: 12px; color: var(--accent-color);">Level 1</div>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfileButton('profile-button-container');
});
