const colors = [
    '#6366f1', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', 
    '#ec4899', '#ef4444', '#06b6d4', '#8b5cf6', '#14b8a6'
];

export const generateProcessColor = (index) => {
    return colors[index % colors.length];
};

export const updateProcessList = (processes) => {
    const list = document.getElementById('process-list');
    const emptyState = document.getElementById('empty-state');
    
    if (processes.length === 0) {
        list.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    list.innerHTML = processes.map((p, i) => `
        <tr style="border-left: 4px solid ${p.color}">
            <td><span class="badge" style="background:${p.color}">${p.pid}</span></td>
            <td>${p.arrival}</td>
            <td>${p.burst}</td>
            <td>${p.priority || '-'}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-process" data-index="${i}">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Re-initialize icons
    if (window.lucide) window.lucide.createIcons();
};

export const renderGanttChart = (timeline, animate = false) => {
    const container = document.getElementById('gantt-chart');
    const legend = document.getElementById('gantt-legend');
    container.innerHTML = '';
    legend.innerHTML = '';

    if (timeline.length === 0) return;

    const totalTime = timeline[timeline.length - 1].end;
    const chartWidth = container.offsetWidth - 40;
    const timeScale = chartWidth / totalTime;

    const row = document.createElement('div');
    row.className = 'gantt-row';
    container.appendChild(row);

    if (animate) {
        timeline.forEach((block, i) => {
            setTimeout(() => {
                const div = createGanttBlock(block, timeScale, totalTime);
                row.appendChild(div);
                div.style.opacity = '0';
                div.animate([{ opacity: 0, transform: 'scaleX(0)' }, { opacity: 1, transform: 'scaleX(1)' }], { duration: 300, fill: 'forwards' });
            }, i * 400); // 400ms delay between blocks
        });
    } else {
        timeline.forEach(block => {
            row.appendChild(createGanttBlock(block, timeScale, totalTime));
        });
    }

    // Render Legend
    const uniquePids = [...new Set(timeline.map(b => b.pid))];
    uniquePids.forEach(pid => {
        const found = timeline.find(b => b.pid === pid);
        if (found) {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <div class="legend-color" style="background:${found.color}"></div>
                <span>${pid}</span>
            `;
            legend.appendChild(item);
        }
    });
};

function createGanttBlock(block, scale, total) {
    const div = document.createElement('div');
    div.className = 'gantt-block';
    div.style.width = `${block.duration * scale}px`;
    div.style.backgroundColor = block.color;
    div.style.transformOrigin = 'left';
    div.innerHTML = `
        <span>${block.pid}</span>
        <span class="time-label">${block.start}</span>
        ${block.end === total ? `<span class="end-time">${block.end}</span>` : ''}
    `;
    return div;
}

export const renderResultsTable = (results) => {
    const body = document.getElementById('results-body');
    body.innerHTML = results.map(r => `
        <tr>
            <td><span class="badge" style="background:${r.color}">${r.pid}</span></td>
            <td>${r.wt}</td>
            <td>${r.tat}</td>
            <td>${r.rt}</td>
            <td>${r.finish}</td>
        </tr>
    `).join('');
};

export const updateSummaryMetrics = (metrics) => {
    document.getElementById('avg-wt-val').textContent = metrics.avgWT;
    document.getElementById('avg-tat-val').textContent = metrics.avgTAT;
    document.getElementById('util-val').textContent = metrics.cpuUtilization + '%';
    document.getElementById('throughput-val').textContent = metrics.throughput;
};

export const switchView = (viewId) => {
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`view-${viewId}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewId) {
            item.classList.add('active');
        }
    });
};
