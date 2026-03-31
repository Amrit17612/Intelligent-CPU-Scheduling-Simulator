import * as algorithms from './algorithms.js';
import * as ui from './ui.js';
import * as charts from './charts.js';

// State
let processes = [];
let processCount = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) window.lucide.createIcons();
    
    // View switching
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            ui.switchView(view);
        });
    });

    // Custom Switch View Event (for buttons)
    window.addEventListener('switch-view', (e) => {
        ui.switchView(e.detail);
    });

    // Form Handling
    const processForm = document.getElementById('process-form');
    processForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pid = document.getElementById('pid').value;
        const arrival = parseInt(document.getElementById('arrival').value);
        const burst = parseInt(document.getElementById('burst').value);
        const priority = parseInt(document.getElementById('priority').value) || 0;

        addProcess({ pid, arrival, burst, priority });
        processForm.reset();
        document.getElementById('pid').value = `P${processCount + 1}`;
    });

    // Mock Data
    document.getElementById('random-data-btn').addEventListener('click', () => {
        const mockData = [
            { pid: 'P1', arrival: 0, burst: 6, priority: 2 },
            { pid: 'P2', arrival: 2, burst: 8, priority: 1 },
            { pid: 'P3', arrival: 5, burst: 3, priority: 3 },
            { pid: 'P4', arrival: 9, burst: 4, priority: 4 }
        ];
        processes = [];
        processCount = 0;
        mockData.forEach(addProcess);
    });

    // Clear All
    document.getElementById('clear-all-btn').addEventListener('click', () => {
        processes = [];
        processCount = 0;
        ui.updateProcessList(processes);
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('pid').value = `P${processCount + 1}`;
    });

    // Algorithm Change (Quantum Visibility)
    document.getElementById('algorithm-select').addEventListener('change', (e) => {
        const quantumGroup = document.getElementById('quantum-group');
        quantumGroup.style.display = e.target.value === 'rr' ? 'flex' : 'none';
    });

    // Run Simulation
    document.getElementById('run-simulation-btn').addEventListener('click', runSimulation);

    // Compare All
    document.getElementById('compare-all-btn').addEventListener('click', compareAllAlgorithms);

    // Dynamic delete buttons
    document.getElementById('process-list').addEventListener('click', (e) => {
        if (e.target.closest('.delete-process')) {
            const index = e.target.closest('.delete-process').dataset.index;
            processes.splice(index, 1);
            ui.updateProcessList(processes);
        }
    });

    // Initial ID
    document.getElementById('pid').value = `P1`;
});

function addProcess(p) {
    const process = {
        ...p,
        color: ui.generateProcessColor(processCount++),
        remainingTime: p.burst
    };
    processes.push(process);
    ui.updateProcessList(processes);
}

function runSimulation() {
    if (processes.length === 0) {
        alert('Please add some processes first!');
        return;
    }

    const algo = document.getElementById('algorithm-select').value;
    const quantum = parseInt(document.getElementById('quantum').value) || 2;
    let result;

    switch(algo) {
        case 'fcfs': result = algorithms.FCFS(processes); break;
        case 'sjf-np': result = algorithms.SJF_NP(processes); break;
        case 'sjf-p': result = algorithms.SRTF(processes); break;
        case 'priority-np': result = algorithms.PRIORITY_NP(processes); break;
        case 'rr': result = algorithms.RR(processes, quantum); break;
        default: result = algorithms.FCFS(processes);
    }

    // Display
    document.getElementById('results-section').style.display = 'block';
    ui.renderGanttChart(result.timeline, true);
    ui.renderResultsTable(result.results);
    ui.updateSummaryMetrics(result.metrics);

    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function compareAllAlgorithms() {
    if (processes.length === 0) {
        alert('Please add some processes first!');
        return;
    }

    const quantum = parseInt(document.getElementById('quantum').value) || 2;
    const comparisonResults = {
        'FCFS': algorithms.FCFS(processes),
        'SJF (NP)': algorithms.SJF_NP(processes),
        'SRTF (P)': algorithms.SRTF(processes),
        'Priority (NP)': algorithms.PRIORITY_NP(processes),
        'Round Robin': algorithms.RR(processes, quantum)
    };

    charts.renderComparisonCharts(comparisonResults);
    ui.switchView('comparison');
}
