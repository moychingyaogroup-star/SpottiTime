document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('employees-table-body');

    // Initial Data
    const employees = [
        { id: 'alex', name: 'Alex', role: 'boss', color: '#ff9999', initial: 'A', rate: 50, hours: 160, leave: 8 },
        { id: 'jasmine', name: 'Jasmine', role: 'Staff', color: '#4dff4d', initial: 'J', rate: 25, hours: 150, leave: 16 },
        { id: 'john', name: 'John', role: 'Staff', color: '#ffb84d', initial: 'J', rate: 25, hours: 155, leave: 0 }
    ];

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    function calculateCosts(rate, hoursMtd, leaveMtd) {
        // Basic calculations assuming standard work schedules.
        // Assuming 8 hours/day, 40 hours/week, 160 hours/month standard
        const dailyHours = 8;
        const weeklyHours = 40;
        const yearlyWeeks = 52;

        // Effective hourly rate cost (paying for work + paying for leave)
        // Here we just calculate cost based on input standard rate.
        const dailyCost = dailyHours * rate;
        const weeklyCost = weeklyHours * rate;

        // For monthly, let's use the explicit MTD input hours + paid leave
        const totalMonthlyPaidHours = hoursMtd + leaveMtd;
        const monthlyCost = totalMonthlyPaidHours * rate;

        // Yearly projection
        const yearlyCost = (weeklyHours * yearlyWeeks) * rate;

        return { dailyCost, weeklyCost, monthlyCost, yearlyCost };
    }

    function renderTable() {
        tbody.innerHTML = '';

        employees.forEach((emp, index) => {
            const costs = calculateCosts(emp.rate, emp.hours, emp.leave);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar" style="background-color: ${emp.color};">${emp.initial}</div>
                        <div class="employee-details">
                            <span class="emp-name">${emp.name}</span>
                            <span class="emp-role">${emp.role}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" class="editable-input rate-input" data-index="${index}" value="${emp.rate}" min="0" step="0.5">
                </td>
                <td>
                    <input type="number" class="editable-input hours-input" data-index="${index}" value="${emp.hours}" min="0">
                </td>
                <td>
                    <input type="number" class="editable-input leave-input" data-index="${index}" value="${emp.leave}" min="0">
                </td>
                <td class="calc-cost">${formatCurrency(costs.dailyCost)}</td>
                <td class="calc-cost">${formatCurrency(costs.weeklyCost)}</td>
                <td class="calc-cost">${formatCurrency(costs.monthlyCost)}</td>
                <td class="calc-cost">${formatCurrency(costs.yearlyCost)}</td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners to inputs
        document.querySelectorAll('.rate-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = e.target.dataset.index;
                employees[idx].rate = parseFloat(e.target.value) || 0;
                renderTable();
            });
        });

        document.querySelectorAll('.hours-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = e.target.dataset.index;
                employees[idx].hours = parseFloat(e.target.value) || 0;
                renderTable();
            });
        });

        document.querySelectorAll('.leave-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = e.target.dataset.index;
                employees[idx].leave = parseFloat(e.target.value) || 0;
                renderTable();
            });
        });
    }

    renderTable();
});
