/**
 * CPU Scheduling Algorithms
 * Each algorithm returns an object containing:
 * - timeline: Array of { pid, start, end, duration }
 * - processes: Updated processes with WT, TAT, RT, CT
 * - metrics: Overall performance metrics
 */

export const FCFS = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    const timeline = [];
    const results = [];
    let currentTime = 0;

    sorted.forEach(p => {
        if (currentTime < p.arrival) {
            currentTime = p.arrival;
        }
        
        const start = currentTime;
        const end = start + p.burst;
        timeline.push({ pid: p.pid, start, end, duration: p.burst, color: p.color });
        
        results.push({
            ...p,
            finish: end,
            tat: end - p.arrival,
            wt: (end - p.arrival) - p.burst,
            rt: start - p.arrival
        });
        
        currentTime = end;
    });

    return { timeline, results, metrics: calculateOverallMetrics(results, currentTime) };
};

export const SJF_NP = (processes) => {
    let sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    const timeline = [];
    const results = [];
    let currentTime = 0;
    let completedCount = 0;
    const n = processes.length;
    const isCompleted = new Array(n).fill(false);

    while (completedCount < n) {
        let idx = -1;
        let minBurst = Infinity;

        for (let i = 0; i < n; i++) {
            if (sorted[i].arrival <= currentTime && !isCompleted[i]) {
                if (sorted[i].burst < minBurst) {
                    minBurst = sorted[i].burst;
                    idx = i;
                } else if (sorted[i].burst === minBurst) {
                    if (sorted[i].arrival < sorted[idx].arrival) {
                        idx = i;
                    }
                }
            }
        }

        if (idx !== -1) {
            const p = sorted[idx];
            const start = currentTime;
            const end = start + p.burst;
            timeline.push({ pid: p.pid, start, end, duration: p.burst, color: p.color });
            
            results.push({
                ...p,
                finish: end,
                tat: end - p.arrival,
                wt: (end - p.arrival) - p.burst,
                rt: start - p.arrival
            });
            
            isCompleted[idx] = true;
            completedCount++;
            currentTime = end;
        } else {
            currentTime = Math.min(...sorted.filter((_, i) => !isCompleted[i]).map(p => p.arrival));
        }
    }

    return { timeline, results, metrics: calculateOverallMetrics(results, currentTime) };
};

export const SRTF = (processes) => {
    let n = processes.length;
    let remainingBurst = processes.map(p => p.burst);
    let isCompleted = new Array(n).fill(false);
    let currentTime = 0;
    let completedTotal = 0;
    let timeline = [];
    let results = new Array(n);
    let lastPid = null;
    let startTime = 0;

    while (completedTotal < n) {
        let idx = -1;
        let minTime = Infinity;

        for (let i = 0; i < n; i++) {
            if (processes[i].arrival <= currentTime && !isCompleted[i] && remainingBurst[i] < minTime) {
                minTime = remainingBurst[i];
                idx = i;
            }
        }

        if (idx !== -1) {
            if (lastPid !== processes[idx].pid) {
                if (lastPid !== null) {
                    timeline.push({ pid: lastPid, start: startTime, end: currentTime, duration: currentTime - startTime, color: processes.find(p => p.pid === lastPid).color });
                }
                lastPid = processes[idx].pid;
                startTime = currentTime;
                
                // Response time check
                if (results[idx] === undefined) {
                    results[idx] = { ...processes[idx], rt: currentTime - processes[idx].arrival };
                }
            }

            remainingBurst[idx]--;
            currentTime++;

            if (remainingBurst[idx] === 0) {
                isCompleted[idx] = true;
                completedTotal++;
                const p = processes[idx];
                const finish = currentTime;
                results[idx] = {
                    ...results[idx],
                    finish,
                    tat: finish - p.arrival,
                    wt: finish - p.arrival - p.burst
                };
                
                timeline.push({ pid: lastPid, start: startTime, end: currentTime, duration: currentTime - startTime, color: p.color });
                lastPid = null;
            }
        } else {
            if (lastPid !== null) {
                timeline.push({ pid: lastPid, start: startTime, end: currentTime, duration: currentTime - startTime, color: processes.find(p => p.pid === lastPid).color });
                lastPid = null;
            }
            currentTime++;
        }
    }

    return { timeline: groupTimeline(timeline), results, metrics: calculateOverallMetrics(results, currentTime) };
};

export const PRIORITY_NP = (processes) => {
    let n = processes.length;
    let isCompleted = new Array(n).fill(false);
    let currentTime = 0;
    let completedTotal = 0;
    let timeline = [];
    let results = [];

    while (completedTotal < n) {
        let idx = -1;
        let highestPriority = Infinity;

        for (let i = 0; i < n; i++) {
            if (processes[i].arrival <= currentTime && !isCompleted[i]) {
                if (processes[i].priority < highestPriority) {
                    highestPriority = processes[i].priority;
                    idx = i;
                } else if (processes[i].priority === highestPriority) {
                    if (processes[i].arrival < processes[idx]?.arrival) {
                        idx = i;
                    }
                }
            }
        }

        if (idx !== -1) {
            const p = processes[idx];
            const start = currentTime;
            const end = start + p.burst;
            timeline.push({ pid: p.pid, start, end, duration: p.burst, color: p.color });
            
            results.push({
                ...p,
                finish: end,
                tat: end - p.arrival,
                wt: end - p.arrival - p.burst,
                rt: start - p.arrival
            });
            
            isCompleted[idx] = true;
            completedTotal++;
            currentTime = end;
        } else {
            currentTime = Math.min(...processes.filter((_, i) => !isCompleted[i]).map(p => p.arrival));
        }
    }

    return { timeline, results, metrics: calculateOverallMetrics(results, currentTime) };
};

export const RR = (processes, quantum) => {
    let n = processes.length;
    let remainingBurst = processes.map(p => p.burst);
    let readyQueue = [];
    let currentTime = 0;
    let timeline = [];
    let results = new Array(n);
    let completed = 0;
    let isAddedToQueue = new Array(n).fill(false);

    // Initial fill
    const pushToQueue = () => {
        for (let i = 0; i < n; i++) {
            if (!isAddedToQueue[i] && processes[i].arrival <= currentTime) {
                readyQueue.push(i);
                isAddedToQueue[i] = true;
            }
        }
    }

    pushToQueue();

    while (completed < n) {
        if (readyQueue.length > 0) {
            let idx = readyQueue.shift();
            let p = processes[idx];
            
            // Response time
            if (results[idx] === undefined) {
                results[idx] = { ...p, rt: currentTime - p.arrival };
            }

            let execTime = Math.min(remainingBurst[idx], quantum);
            timeline.push({ pid: p.pid, start: currentTime, end: currentTime + execTime, duration: execTime, color: p.color });
            
            currentTime += execTime;
            remainingBurst[idx] -= execTime;

            // Check for new arrivals while executing
            pushToQueue();

            if (remainingBurst[idx] > 0) {
                readyQueue.push(idx);
            } else {
                completed++;
                const finish = currentTime;
                results[idx] = {
                    ...results[idx],
                    finish,
                    tat: finish - p.arrival,
                    wt: finish - p.arrival - p.burst
                };
            }
        } else {
            currentTime++; 
            pushToQueue();
        }
    }

    return { timeline: groupTimeline(timeline), results, metrics: calculateOverallMetrics(results, currentTime) };
};

/* Helper Functions */

function calculateOverallMetrics(results, totalTime) {
    const n = results.length;
    const avgWT = results.reduce((sum, p) => sum + p.wt, 0) / n;
    const avgTAT = results.reduce((sum, p) => sum + p.tat, 0) / n;
    const activeTime = results.reduce((sum, p) => sum + p.burst, 0);
    const cpuUtilization = (activeTime / totalTime) * 100;
    const throughput = n / totalTime;

    return { 
        avgWT: avgWT.toFixed(2), 
        avgTAT: avgTAT.toFixed(2), 
        cpuUtilization: cpuUtilization.toFixed(2),
        throughput: throughput.toFixed(2)
    };
}

function groupTimeline(timeline) {
    if (timeline.length === 0) return [];
    let grouped = [];
    let current = { ...timeline[0] };

    for (let i = 1; i < timeline.length; i++) {
        if (timeline[i].pid === current.pid) {
            current.end = timeline[i].end;
            current.duration += timeline[i].duration;
        } else {
            grouped.push(current);
            current = { ...timeline[i] };
        }
    }
    grouped.push(current);
    return grouped;
}
