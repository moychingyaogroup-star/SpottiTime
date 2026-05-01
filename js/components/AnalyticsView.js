class AnalyticsView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);

        this.categories = [
            { id: 'sleep', name: 'Sleep', icon: 'fa-bed', colorVar: '--color-sleep', defaultColor: '#4d4dff' },
            { id: 'school', name: 'School/Work', icon: 'fa-school', colorVar: '--color-school', defaultColor: '#ff3333' },
            { id: 'study', name: 'Study', icon: 'fa-book', colorVar: '--color-study', defaultColor: '#b366ff' },
            { id: 'exercise', name: 'Exercise', icon: 'fa-dumbbell', colorVar: '--color-exercise', defaultColor: '#4dff4d' },
            { id: 'eat', name: 'Eat', icon: 'fa-utensils', colorVar: '--color-eat', defaultColor: '#ffb84d' },
            { id: 'transport', name: 'Transport', icon: 'fa-car', colorVar: '--color-transport', defaultColor: '#ff4d4d' },
            { id: 'personal_care', name: 'Personal Care', icon: 'fa-bath', colorVar: '--color-personal-care', defaultColor: '#b3b3ff' },
            { id: 'family_time', name: 'Family Time', icon: 'fa-home', colorVar: '--color-family-time', defaultColor: '#ff9999' },
            { id: 'hobbies', name: 'Hobbies', icon: 'fa-palette', colorVar: '--color-hobbies', defaultColor: '#4dffff' },
            { id: 'entertainment', name: 'Entertainment', icon: 'fa-gamepad', colorVar: '--color-entertainment', defaultColor: '#ffb84d' },
            { id: 'social_media', name: 'Social Media', icon: 'fa-mobile-alt', colorVar: '--color-social-media', defaultColor: '#3399ff' },
            { id: 'hanging_out', name: 'Hanging Out', icon: 'fa-laugh', colorVar: '--color-hanging-out', defaultColor: '#ff4dff' },
            { id: 'chores', name: 'Chores', icon: 'fa-broom', colorVar: '--color-chores', defaultColor: '#a0a0ab' },
            { id: 'competitions', name: 'Competitions', icon: 'fa-trophy', colorVar: '--color-competitions', defaultColor: '#ffd633' },
            { id: 'work', name: 'Work', icon: 'fa-briefcase', colorVar: '--color-work', defaultColor: '#33cc33' }
        ];

        this.personas = [
            {
                name: "Typical High School Student",
                icon: "fa-graduation-cap",
                reality: "Reality: heavy school + sleep, moderate distractions",
                expected: {
                    sleep: 30, school: 25, study: 10, social_media: 8, entertainment: 8,
                    hanging_out: 5, eat: 5, transport: 4, personal_care: 3, chores: 2,
                    exercise: 1, family_time: 2, hobbies: 2, competitions: 0, work: 0
                }
            },
            {
                name: "High-Performing Student",
                icon: "fa-star",
                reality: "Reality: less distraction, more study + structured time",
                expected: {
                    sleep: 30, school: 25, study: 15, exercise: 5, eat: 5, transport: 4,
                    personal_care: 4, family_time: 3, hobbies: 3, chores: 2, social_media: 2,
                    entertainment: 1.5, hanging_out: 1.5, competitions: 1.5, work: 0
                }
            },
            {
                name: "Athlete-Focused Person",
                icon: "fa-running",
                reality: "Reality: more sleep + training, less wasted time",
                expected: {
                    sleep: 32, school: 22.5, exercise: 12.5, eat: 6, study: 8, personal_care: 5,
                    transport: 4, family_time: 3, entertainment: 3, social_media: 2,
                    hanging_out: 2, chores: 2, hobbies: 1.5, competitions: 3, work: 0
                }
            },
            {
                name: "Unstructured / Distracted Student",
                icon: "fa-ghost",
                reality: "Reality: high time waste → low productivity",
                expected: {
                    sleep: 25, school: 25, social_media: 15, entertainment: 15, study: 5,
                    hanging_out: 5, eat: 5, transport: 3, personal_care: 2, chores: 1.5,
                    exercise: 0.5, family_time: 1.5, hobbies: 1.5, competitions: 0, work: 0
                }
            },
            {
                name: "Balanced Lifestyle Person",
                icon: "fa-balance-scale",
                reality: "Reality: sustainable, not extreme",
                expected: {
                    sleep: 30, school: 25, study: 8, exercise: 5, eat: 6, transport: 4,
                    personal_care: 4, family_time: 4, hobbies: 4, entertainment: 3,
                    social_media: 2.5, hanging_out: 3, chores: 2, competitions: 0.5, work: 1
                }
            }
        ];

        this.render();
        this.addEventListeners();
        this.updateAnalytics(); // Initial calculation
    }

    render() {
        if (!this.container) return;

        let inputsHTML = this.categories.map(cat => `
            <div class="input-group">
                <label>
                    <i class="fas ${cat.icon}" style="color: var(${cat.colorVar}, ${cat.defaultColor});"></i>
                    ${cat.name}
                </label>
                <input type="number" id="input-${cat.id}" data-id="${cat.id}" min="0" max="24" value="0" step="0.5">
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="analytics-form-section">
                <h3>Schedule Inputs (Hours)</h3>
                <div class="analytics-grid">
                    ${inputsHTML}
                </div>
                <div class="total-hours" id="total-hours-display">Total Hours: 0 / 24 (Free Time: 24h)</div>
            </div>

            <div class="analytics-viz-section">
                <div class="chart-container">
                    <h3>Time Distribution</h3>
                    <div class="pie-chart" id="analytics-pie-chart"></div>
                    <div class="legend" id="analytics-legend">
                        <!-- Legend items injected by JS -->
                    </div>
                </div>

                <div class="analytics-result-section">
                    <h3>Persona Analysis</h3>
                    <div class="persona-card" id="persona-result">
                        <div class="persona-title">
                            <i class="fas fa-question-circle"></i>
                            <span>Awaiting Input...</span>
                        </div>
                        <div class="persona-reality">
                            Please fill in your schedule to see your persona.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const inputs = this.container.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateAnalytics());
        });
    }

    // Helper to get CSS variable value
    getCssVar(varName, fallback) {
        const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return val ? val : fallback;
    }

    updateAnalytics() {
        const inputs = this.container.querySelectorAll('input[type="number"]');
        let totalHours = 0;
        let data = {};

        // Collect values
        inputs.forEach(input => {
            let val = parseFloat(input.value) || 0;
            if (val < 0) { val = 0; input.value = 0; }
            const id = input.getAttribute('data-id');
            data[id] = val;
            totalHours += val;
        });

        const totalDisplay = this.container.querySelector('#total-hours-display');

        if (totalHours > 24) {
            totalDisplay.textContent = `Total Hours: ${totalHours} / 24 (Exceeds 24 hours!)`;
            totalDisplay.classList.add('error');
            return; // Don't update chart if invalid
        } else {
            const freeTime = parseFloat((24 - totalHours).toFixed(1));
            totalHours = parseFloat(totalHours.toFixed(1));
            totalDisplay.textContent = `Total Hours: ${totalHours} / 24 (Free Time: ${freeTime}h)`;
            totalDisplay.classList.remove('error');

            // Add free time to data for pie chart
            data['free_time'] = freeTime;
        }

        // Calculate percentages
        let percentages = {};
        for (const [key, val] of Object.entries(data)) {
            percentages[key] = (val / 24) * 100;
        }

        // 1. Update Pie Chart
        this.updatePieChart(percentages);

        // 2. Analyze Persona
        this.analyzePersona(percentages);
    }

    updatePieChart(percentages) {
        let gradientSegments = [];
        let currentPercent = 0;
        let legendHTML = '';

        // Add regular categories
        this.categories.forEach(cat => {
            const pct = percentages[cat.id] || 0;
            if (pct > 0) {
                const color = this.getCssVar(cat.colorVar, cat.defaultColor);
                gradientSegments.push(`${color} ${currentPercent}% ${currentPercent + pct}%`);
                currentPercent += pct;

                legendHTML += `
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: ${color};"></div>
                        <span>${cat.name} (${pct.toFixed(1)}%)</span>
                    </div>
                `;
            }
        });

        // Add free time
        const freePct = percentages['free_time'] || 0;
        if (freePct > 0) {
            const freeColor = '#333333';
            gradientSegments.push(`${freeColor} ${currentPercent}% ${currentPercent + freePct}%`);

            legendHTML += `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${freeColor};"></div>
                    <span>Free Time (${freePct.toFixed(1)}%)</span>
                </div>
            `;
        }

        const pieChart = this.container.querySelector('#analytics-pie-chart');
        if (pieChart) {
            if (gradientSegments.length > 0) {
                pieChart.style.background = `conic-gradient(${gradientSegments.join(', ')})`;
            } else {
                pieChart.style.background = `conic-gradient(#333 0% 100%)`; // All free time
            }
        }

        const legendContainer = this.container.querySelector('#analytics-legend');
        if (legendContainer) {
            legendContainer.innerHTML = legendHTML;
        }
    }

    analyzePersona(userPercentages) {
        // If they haven't put much in, don't analyze yet
        if (userPercentages['free_time'] >= 90) {
            const resultContainer = this.container.querySelector('#persona-result');
            resultContainer.innerHTML = `
                <div class="persona-title">
                    <i class="fas fa-question-circle"></i>
                    <span>Awaiting Input...</span>
                </div>
                <div class="persona-reality">
                    Please fill in more of your schedule to see your persona.
                </div>
            `;
            return;
        }

        let bestMatch = null;
        let minDistance = Infinity;

        this.personas.forEach(persona => {
            let distance = 0;
            // Calculate sum of squared differences for all categories (excluding free time)
            this.categories.forEach(cat => {
                const userPct = userPercentages[cat.id] || 0;
                const expectedPct = persona.expected[cat.id] || 0;
                distance += Math.pow(userPct - expectedPct, 2);
            });

            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = persona;
            }
        });

        if (bestMatch) {
            const resultContainer = this.container.querySelector('#persona-result');
            resultContainer.innerHTML = `
                <div class="persona-title">
                    <i class="fas ${bestMatch.icon}"></i>
                    <span>${bestMatch.name}</span>
                </div>
                <div class="persona-reality">
                    ${bestMatch.reality}
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsView('analytics-container');
});
