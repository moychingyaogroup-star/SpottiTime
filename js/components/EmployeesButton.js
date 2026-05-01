class EmployeesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const isActive = window.location.pathname.endsWith('employees.html') ? 'active' : '';
        this.container.innerHTML = `
            <a href="employees.html" class="nav-item ${isActive}">
                <i class="fas fa-users" style="color: var(--color-competitions);"></i>
                <span>Employees</span>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EmployeesButton('employees-button-container');
});
