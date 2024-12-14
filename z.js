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

function initializeCharts() {
// Scatter Plot
const scatterCtx = document.getElementById('scatterChart').getContext('2d');
new Chart(scatterCtx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Revenue vs Expenses',
            data: Array.from({length: 20}, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Revenue (K)',
                    color: '#fff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: { color: '#fff' }
            },
            y: {
                title: {
                    display: true,
                    text: 'Expenses (K)',
                    color: '#fff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: { color: '#fff' }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        }
    }
});