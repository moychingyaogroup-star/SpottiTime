document.addEventListener('DOMContentLoaded', () => {
    const scheduleGrid = document.getElementById('schedule-grid');
    const miniCalendar = document.getElementById('mini-calendar');
    const totalShiftsEl = document.getElementById('total-shifts');
    const totalHoursEl = document.getElementById('total-hours');

    // Employee data state
    const employees = {
        'alex': { hours: 0 },
        'jasmine': { hours: 0 },
        'john': { hours: 0 }
    };

    let totalShifts = 0;

    // Generate Hourly Grid (05:00 to 23:00)
    for (let hour = 5; hour <= 23; hour++) {
        const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
        const row = document.createElement('div');
        row.className = 'grid-row';

        // Time Cell
        const timeCell = document.createElement('div');
        timeCell.className = 'time-cell';
        timeCell.textContent = timeLabel;
        row.appendChild(timeCell);

        // Employee Cells
        ['alex', 'jasmine', 'john'].forEach(empId => {
            const cell = document.createElement('div');
            cell.className = 'shift-cell';
            cell.dataset.employeeId = empId;
            cell.dataset.time = timeLabel;

            cell.addEventListener('click', () => {
                toggleShift(cell, empId);
            });

            row.appendChild(cell);
        });

        scheduleGrid.appendChild(row);
    }

    function toggleShift(cell, empId) {
        if (cell.hasChildNodes()) {
            // Remove shift
            cell.innerHTML = '';
            employees[empId].hours = Math.max(0, employees[empId].hours - 1);
            totalShifts = Math.max(0, totalShifts - 1);
        } else {
            // Add shift
            const shiftBlock = document.createElement('div');
            shiftBlock.className = 'shift-block';
            shiftBlock.textContent = 'Shift';
            cell.appendChild(shiftBlock);

            employees[empId].hours += 1;
            totalShifts += 1;
        }
        updateStats();
    }

    // Time Off Buttons Logic (-1h, -1d)
    document.querySelectorAll('.btn-time-off').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const empItem = e.target.closest('.employee-item');
            const empId = empItem.dataset.employeeId;
            const type = e.target.dataset.type;

            if (type === '-1h') {
                employees[empId].hours = Math.max(0, employees[empId].hours - 1);
            } else if (type === '-1d') {
                employees[empId].hours = Math.max(0, employees[empId].hours - 8); // Assume 1 day = 8 hours
            }

            updateStats();
        });
    });

    function updateStats() {
        let allHours = 0;

        // Update individual employee displays
        Object.keys(employees).forEach(empId => {
            const el = document.querySelector(`.employee-item[data-employee-id="${empId}"] .employee-hours`);
            if (el) {
                el.textContent = `${employees[empId].hours}h`;
            }
            allHours += employees[empId].hours;
        });

        // Update top stats
        totalShiftsEl.textContent = totalShifts;
        totalHoursEl.textContent = `${allHours}h`;
    }

    // Mini Calendar Logic (Current Month)
    const now = new Date();
    const monthName = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    miniCalendar.textContent = `${monthName} ${year}`;

    // Copy Last Month logic mock
    document.getElementById('btn-copy-last-month').addEventListener('click', () => {
        alert("Copying last month's shifts functionality will be implemented here.");
        // Mock action: adding a few shifts
        const cells = document.querySelectorAll('.shift-cell');
        if(cells.length > 0) {
            // Add a mock shift to first cell
            if(!cells[0].hasChildNodes()) {
               toggleShift(cells[0], cells[0].dataset.employeeId);
            }
        }
    });
});
