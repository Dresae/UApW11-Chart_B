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

    // Histogram
    const histogramCtx = document.getElementById('histogramChart').getContext('2d');
    new Chart(histogramCtx, {
        type: 'bar',
        data: {
            labels: ['0-10K', '10-20K', '20-30K', '30-40K', '40-50K', '50K+'],
            datasets: [{
                label: 'Profit Distribution',
                data: [15, 25, 35, 20, 10, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: { color: '#fff' }
                },
                y: {
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

    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['North', 'South', 'East', 'West', 'Central'],
            datasets: [{
                data: [30, 20, 25, 15, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
    });