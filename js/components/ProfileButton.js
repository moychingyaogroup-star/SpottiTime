class ProfileButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.user = null; // Store user state

        // Listen for Firebase auth state changes
        window.addEventListener('authStateChanged', (e) => {
            this.user = e.detail.user;
            this.render();
        });

        this.render();
    }

    render() {
        if (this.user) {
            // User is logged in
            const avatarHtml = this.user.photoURL
                ? `<img src="${this.user.photoURL}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`
                : `🐱`;

            this.container.innerHTML = `
                <div class="profile-section" onclick="window.logoutFromGoogle()" style="padding: 16px 20px; margin: 0 12px 24px; background-color: var(--bg-hover); border-radius: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; position: relative;">
                    <div class="profile-avatar" style="width: 40px; height: 40px; background-color: #ffb84d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden;">
                        ${avatarHtml}
                    </div>
                    <div class="profile-info">
                        <div class="profile-name" style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${this.user.displayName || 'User'}</div>
                        <div class="profile-level" style="font-size: 12px; color: var(--accent-color);">Logout</div>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in
            this.container.innerHTML = `
                <div class="profile-section" onclick="window.loginWithGoogle()" style="padding: 16px 20px; margin: 0 12px 24px; background-color: var(--bg-hover); border-radius: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; justify-content: center;">
                    <i class="fab fa-google" style="font-size: 20px;"></i>
                    <div class="profile-info">
                        <div class="profile-name" style="font-weight: 600; font-size: 14px;">Login with Google</div>
                    </div>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfileButton('profile-button-container');
});
