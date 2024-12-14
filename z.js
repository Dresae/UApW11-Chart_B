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

function generateHistogramData(sampleSize = 1000) {
    // Generate random data points
    const rawData = Array.from({ length: sampleSize }, () => 
        Math.floor(Math.random() * 60000) // Generate values between 0 and 60000
    );

    // Create bins for the histogram
    const bins = {
        '0-10K': 0,
        '10K-20K': 0,
        '20K-30K': 0,
        '30K-40K': 0,
        '40K-50K': 0,
        '50K+': 0
    };

    // Count frequencies
    rawData.forEach(value => {
        if (value < 10000) bins['0-10K']++;
        else if (value < 20000) bins['10K-20K']++;
        else if (value < 30000) bins['20K-30K']++;
        else if (value < 40000) bins['30K-40K']++;
        else if (value < 50000) bins['40K-50K']++;
        else bins['50K+']++;
    });

    return {
        labels: Object.keys(bins),
        data: Object.values(bins),
        // Calculate percentage for each bin
        percentages: Object.values(bins).map(value => 
            ((value / sampleSize) * 100).toFixed(1)
        )
    };
}

function initializeCharts() {
    // Common chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#fff' }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Count: ${context.raw} (${context.dataset.percentages[context.dataIndex]}%)`;
                    }
                }
            }
        }
    };

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
        options: chartOptions
    });

    // Histogram
    const histogramData = generateHistogramData();
    const histogramCtx = document.getElementById('histogramChart').getContext('2d');
    new Chart(histogramCtx, {
        type: 'bar',
        data: {
            labels: histogramData.labels,
            datasets: [{
                label: 'Monthly Profit Distribution',
                data: histogramData.data,
                percentages: histogramData.percentages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            ...chartOptions,
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#fff' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { 
                        color: '#fff',
                        callback: function(value) {
                            return value + ' items';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Count: ${context.raw} (${context.dataset.percentages[context.dataIndex]}%)`;
                        }
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
            ...chartOptions,
            scales: {} // Remove scales for pie chart
        }
    });

    // Bubble Chart
    const bubbleCtx = document.getElementById('bubbleChart').getContext('2d');
    new Chart(bubbleCtx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Investment Returns',
                data: Array.from({length: 15}, () => ({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    r: Math.random() * 15
                })),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        },
        options: chartOptions
    });
}