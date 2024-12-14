const dashboardIcon = document.querySelector('.dashboard-icon');
        const dashboard = document.querySelector('.dashboard');
        let isOpen = false;

        dashboardIcon.addEventListener('click', () => {
            isOpen = !isOpen;
            dashboard.classList.toggle('active');
            if (isOpen) {
                dashboardIcon.style.opacity = '0.5';
                initializeCharts();
            } else {
                dashboardIcon.style.opacity = '1';
            }
        });

        document.addEventListener('click', (e) => {
            if (!dashboard.contains(e.target) && !dashboardIcon.contains(e.target) && isOpen) {
                isOpen = false;
                dashboard.classList.remove('active');
                dashboardIcon.style.opacity = '1';
            }
        });