// Points System Management

class PointsSystem {
    constructor() {
        this.storageKey = 'spottitime_points';
        this.points = this.loadPoints();

        // Initialize UI if needed or wait for DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initUI());
        } else {
            this.initUI();
        }
    }

    loadPoints() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }

    savePoints() {
        localStorage.setItem(this.storageKey, this.points.toString());
    }

    addPoints(amount) {
        this.points += amount;
        this.savePoints();
        this.updateUI();

        // Dispatch custom event for other systems that might need to know
        const event = new CustomEvent('pointsChanged', { detail: { points: this.points, added: amount } });
        window.dispatchEvent(event);

        this.showFloatingText(`+${amount} Points!`, 'var(--accent-color)');
    }

    getPoints() {
        return this.points;
    }

    initUI() {
        this.updateUI();
    }

    updateUI() {
        const pointsDisplay = document.getElementById('points-display');
        if (pointsDisplay) {
            pointsDisplay.textContent = `${this.points} pts`;
        }
    }

    showFloatingText(text, color) {
        const floating = document.createElement('div');
        floating.className = 'floating-text';
        floating.textContent = text;
        floating.style.color = color || 'white';

        // Try to position it near the mouse if there was a recent click,
        // otherwise center it
        floating.style.position = 'fixed';
        floating.style.top = '50%';
        floating.style.left = '50%';
        floating.style.transform = 'translate(-50%, -50%)';
        floating.style.zIndex = '9999';
        floating.style.pointerEvents = 'none';
        floating.style.fontSize = '24px';
        floating.style.fontWeight = 'bold';
        floating.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
        floating.style.animation = 'float-up 1.5s ease-out forwards';

        document.body.appendChild(floating);

        setTimeout(() => {
            floating.remove();
        }, 1500);
    }
}

window.pointsSystem = new PointsSystem();

// Flappy Bird Logic
class FlappyBird {
    constructor() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.scheduleContainer = document.getElementById('schedule-container');
        if (!this.scheduleContainer) return;

        // Spawn one right away for testing
        setTimeout(() => this.spawnBird(), 2000);
    }

    spawnBird() {
        if (!this.scheduleContainer) return;

        const bird = document.createElement('div');
        bird.className = 'flappy-bird';

        // Simple bird using emoji or CSS shapes. Let's use an emoji for simplicity or text content.
        bird.innerHTML = '🦅'; // Eagle or bird emoji

        // Random starting vertical position within the container
        const containerHeight = this.scheduleContainer.clientHeight || 500;
        const startY = Math.random() * (containerHeight - 50) + 20;

        // Random speed
        const duration = Math.random() * 4 + 4; // 4-8 seconds to cross

        bird.style.top = `${startY}px`;
        bird.style.animationDuration = `${duration}s`;

        // Add click listener
        bird.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.pointsSystem) {
                window.pointsSystem.addPoints(25);
            }

            // Visual effect for catching bird
            bird.innerHTML = '✨';
            bird.style.animationPlayState = 'paused';

            setTimeout(() => {
                bird.remove();
            }, 500);
        });

        this.scheduleContainer.appendChild(bird);

        // Remove bird after it finishes crossing
        setTimeout(() => {
            if (bird.parentNode) {
                bird.remove();
            }
        }, duration * 1000);

        // Schedule next spawn
        const nextSpawn = Math.random() * 15000 + 10000;
        setTimeout(() => this.spawnBird(), nextSpawn);
    }
}

window.flappyBird = new FlappyBird();
