let wtChart = null;
let tatChart = null;
let utilChart = null;

export const renderComparisonCharts = (algorithmsData) => {
    const labels = Object.keys(algorithmsData);
    const wtData = labels.map(label => algorithmsData[label].metrics.avgWT);
    const tatData = labels.map(label => algorithmsData[label].metrics.avgTAT);
    const utilData = labels.map(label => algorithmsData[label].metrics.cpuUtilization);

    if (wtChart) wtChart.destroy();
    if (tatChart) tatChart.destroy();
    if (utilChart) utilChart.destroy();

    const ctxWt = document.getElementById('wt-chart').getContext('2d');
    const ctxTat = document.getElementById('tat-chart').getContext('2d');
    const ctxUtil = document.getElementById('util-chart').getContext('2d');

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f8fafc',
                bodyColor: '#f8fafc',
                borderColor: '#334155',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    };

    wtChart = new Chart(ctxWt, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Waiting Time',
                data: wtData,
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: '#6366f1',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: commonOptions
    });

    tatChart = new Chart(ctxTat, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Turnaround Time',
                data: tatData,
                backgroundColor: 'rgba(168, 85, 247, 0.8)',
                borderColor: '#a855f7',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: commonOptions
    });

    utilChart = new Chart(ctxUtil, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'CPU Utilization',
                data: utilData,
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    max: 100
                }
            }
        }
    });
};
