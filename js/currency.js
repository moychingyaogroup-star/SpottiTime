// Currency and Plant System Management

class CurrencySystem {
    constructor() {
        this.storageKey = 'spottitime_currency';
        this.plantKey = 'spottitime_plant';

        this.currency = this.loadCurrency();
        this.plantState = this.loadPlantState();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initUI());
        } else {
            this.initUI();
        }
    }

    loadCurrency() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }

    saveCurrency() {
        localStorage.setItem(this.storageKey, this.currency.toString());
    }

    addCurrency(amount) {
        this.currency += amount;
        this.saveCurrency();
        this.updateUI();

        if (window.pointsSystem) {
            window.pointsSystem.showFloatingText(`+${amount} Apples!`, '#ffd633');
        }
    }

    loadPlantState() {
        const defaultState = {
            day: 1,
            lastWateredDate: null,
            applesCollected: false
        };
        const stored = localStorage.getItem(this.plantKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return defaultState;
            }
        }
        return defaultState;
    }

    savePlantState() {
        localStorage.setItem(this.plantKey, JSON.stringify(this.plantState));
    }

    waterPlant() {
        const today = new Date().toDateString();

        if (this.plantState.lastWateredDate !== today) {
            this.plantState.lastWateredDate = today;

            // Advance day if not maxed out
            if (this.plantState.day < 10) {
                this.plantState.day++;
                this.plantState.applesCollected = false; // Reset collection for new day if applicable
            }

            this.savePlantState();
            this.renderPlant();

            if (window.pointsSystem) {
                window.pointsSystem.showFloatingText('Watered!', '#3399ff');
            }
        } else {
            if (window.pointsSystem) {
                window.pointsSystem.showFloatingText('Already watered today!', '#a0a0ab');
            }
        }
    }

    collectApples() {
        if (this.plantState.day >= 6 && !this.plantState.applesCollected) {
            this.addCurrency(5);
            this.plantState.applesCollected = true;
            this.savePlantState();
            this.renderPlant();
        }
    }

    initUI() {
        this.updateUI();
        this.createPlantUI();
    }

    updateUI() {
        const currencyDisplay = document.getElementById('currency-display');
        if (currencyDisplay) {
            currencyDisplay.innerHTML = `<i class="fas fa-apple-alt" style="color: #ffd633; margin-right: 4px;"></i>${this.currency}`;
        }
    }

    createPlantUI() {
        // Find a place to put the plant. Let's put it in the right panels, above the leaderboard
        const rightPanels = document.querySelector('.right-panels');
        if (!rightPanels) return;

        const plantPanel = document.createElement('div');
        plantPanel.className = 'panel-section plant-section';
        plantPanel.id = 'plant-container';

        rightPanels.insertBefore(plantPanel, rightPanels.children[1]); // Insert after Categories

        this.renderPlant();
    }

    renderPlant() {
        const container = document.getElementById('plant-container');
        if (!container) return;

        container.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'panel-header';
        header.innerHTML = `<h3><i class="fas fa-leaf" style="color: #4dff4d; margin-right: 8px;"></i> GARDEN (Day ${this.plantState.day})</h3>`;

        const plantDisplay = document.createElement('div');
        plantDisplay.className = 'plant-display';

        let plantEmoji = '🌱'; // Day 1-2
        let plantSize = '40px';

        if (this.plantState.day >= 3 && this.plantState.day <= 5) {
            plantEmoji = '🌿'; // Day 3-5
            plantSize = '60px';
        } else if (this.plantState.day >= 6) {
            plantEmoji = '🌳'; // Day 6-10
            plantSize = '80px';
        }

        const plantIcon = document.createElement('div');
        plantIcon.className = 'plant-icon';
        plantIcon.style.fontSize = plantSize;
        plantIcon.innerHTML = plantEmoji;

        const controls = document.createElement('div');
        controls.className = 'plant-controls';

        const waterBtn = document.createElement('button');
        waterBtn.className = 'plant-btn';
        const today = new Date().toDateString();
        if (this.plantState.lastWateredDate === today) {
            waterBtn.innerHTML = '<i class="fas fa-tint-slash"></i> Watered';
            waterBtn.disabled = true;
            waterBtn.style.opacity = '0.5';
        } else {
            waterBtn.innerHTML = '<i class="fas fa-tint" style="color: #3399ff;"></i> Water';
            waterBtn.onclick = () => this.waterPlant();
        }

        controls.appendChild(waterBtn);

        // Add collect button if day >= 6 and not collected
        if (this.plantState.day >= 6) {
            const collectBtn = document.createElement('button');
            collectBtn.className = 'plant-btn';

            if (!this.plantState.applesCollected) {
                collectBtn.innerHTML = '<i class="fas fa-apple-alt" style="color: #ffd633;"></i> Collect';
                collectBtn.onclick = () => this.collectApples();
            } else {
                collectBtn.innerHTML = '<i class="fas fa-check"></i> Collected';
                collectBtn.disabled = true;
                collectBtn.style.opacity = '0.5';
            }
            controls.appendChild(collectBtn);
        }

        plantDisplay.appendChild(plantIcon);

        // Render apples on the tree visually if they exist and aren't collected
        if (this.plantState.day >= 6 && !this.plantState.applesCollected) {
            const apples = document.createElement('div');
            apples.className = 'golden-apples-overlay';
            apples.innerHTML = '🍎🍎🍎';
            plantDisplay.appendChild(apples);
        }

        container.appendChild(header);
        container.appendChild(plantDisplay);
        container.appendChild(controls);
    }
}

window.currencySystem = new CurrencySystem();
