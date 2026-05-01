document.addEventListener('DOMContentLoaded', () => {
    const addDateBtn = document.getElementById('add-date-btn');
    const modal = document.getElementById('add-date-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('add-date-form');
    const grid = document.getElementById('dates-grid');

    // Open modal
    addDateBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.getElementById('date-title').focus();
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('date-title').value;
        const dateStr = document.getElementById('date-value').value;
        const emoji = document.getElementById('date-emoji').value || '📅';
        const desc = document.getElementById('date-desc').value;

        // Format date slightly
        const dateObj = new Date(dateStr);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        // Adjust for timezone offset to avoid being off by a day in local timezone for date-only inputs
        dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // Create new card
        const card = document.createElement('div');
        card.className = 'date-card important-date-card';
        card.innerHTML = `
            <div class="date-card-icon">${emoji}</div>
            <h3 class="date-card-title">${title}</h3>
            <div class="date-card-date">${formattedDate}</div>
            <div class="date-card-desc">${desc}</div>
        `;

        // Insert before add button (or append at the end, but usually best to append at end)
        grid.appendChild(card);

        // Reset and close
        form.reset();
        document.getElementById('date-emoji').value = '🎂'; // reset to default
        modal.classList.remove('active');
    });
});
