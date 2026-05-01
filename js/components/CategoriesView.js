class CategoriesView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);

        this.categories = [
            { id: 'eat', name: 'Eat', emoji: '🍽️', colorVar: '--color-eat', defaultColor: '#ffb84d' },
            { id: 'chores', name: 'Chores', emoji: '🧹', colorVar: '--color-chores', defaultColor: '#a0a0ab' },
            { id: 'transport', name: 'Transport', emoji: '🚗', colorVar: '--color-transport', defaultColor: '#ff4d4d' },
            { id: 'study', name: 'Study', emoji: '📚', colorVar: '--color-study', defaultColor: '#b366ff' },
            { id: 'exercise', name: 'Exercise', emoji: '💪', colorVar: '--color-exercise', defaultColor: '#4dff4d' },
            { id: 'hanging_out', name: 'Hanging Out', emoji: '😄', colorVar: '--color-hanging-out', defaultColor: '#ff4dff' },
            { id: 'sleep', name: 'Sleep', emoji: '😴', colorVar: '--color-sleep', defaultColor: '#4d4dff' },
            { id: 'entertainment', name: 'Entertainment', emoji: '🎮', colorVar: '--color-entertainment', defaultColor: '#ffb84d' },
            { id: 'competitions', name: 'Competitions', emoji: '🏆', colorVar: '--color-competitions', defaultColor: '#ffd633' },
            { id: 'work', name: 'Work', emoji: '💼', colorVar: '--color-work', defaultColor: '#33cc33' },
            { id: 'personal_care', name: 'Personal Care', emoji: '🧴', colorVar: '--color-personal-care', defaultColor: '#b3b3ff' },
            { id: 'family_time', name: 'Family Time', emoji: '👨‍👩‍👧‍👦', colorVar: '--color-family-time', defaultColor: '#ff9999' },
            { id: 'hobbies', name: 'Hobbies', emoji: '🎨', colorVar: '--color-hobbies', defaultColor: '#4dffff' },
            { id: 'social_media', name: 'Social Media', emoji: '📱', colorVar: '--color-social-media', defaultColor: '#3399ff' },
            { id: 'school', name: 'School', emoji: '🏫', colorVar: '--color-school', defaultColor: '#ff3333' }
        ];

        this.render();
    }

    // Helper to get CSS variable value
    getCssVar(varName, fallback) {
        const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return val ? val : fallback;
    }

    render() {
        if (!this.container) return;

        let cardsHTML = this.categories.map(cat => {
            const color = this.getCssVar(cat.colorVar, cat.defaultColor);
            return `
                <div class="category-card" data-id="${cat.id}">
                    <div class="category-icon-large">${cat.emoji}</div>
                    <div class="category-card-name">${cat.name}</div>
                    <div class="category-card-status">No blocks today</div>
                    <div class="category-card-progress-bar-bg">
                        <div class="category-card-progress-bar-fill" style="width: 0%; background-color: ${color};"></div>
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="categories-header">
                <h2>Categories</h2>
                <p>Track how you spend your time across life areas</p>
            </div>
            <div class="categories-grid">
                ${cardsHTML}
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CategoriesView('categories-view-container');
});
