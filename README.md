# Intelligent CPU Scheduling Simulator 🚀

An interactive, high-performance web application designed to simulate and visualize various CPU scheduling algorithms. Perfect for students and educators to understand the inner workings of operating system process management.

![CPU Simulator Screenshot](cpu_simulator_main_page_1774981436246.png)

## 🌟 Features

- **Interactive Dashboard**: Mission control for all your CPU scheduling simulations.
- **Multiple Algorithms**:
  - **FCFS** (First Come First Serve)
  - **SJF** (Shortest Job First - Non-preemptive)
  - **SRTF** (Shortest Remaining Time First - Preemptive SJF)
  - **Priority Scheduling** (Non-preemptive)
  - **Round Robin** (Time-sharing with custom Quantum)
- **Visualizations**: 
  - Real-time **Gantt Chart** generation.
  - Performance comparison charts (Avg WT, Avg TAT, CPU Utilization).
- **Comprehensive Metrics**:
  - Waiting Time (WT)
  - Turnaround Time (TAT)
  - Response Time (RT)
  - Throughput & CPU Utilization
- **Learning Guide**: Integrated documentation for each scheduling policy.
- **Modern UI**: Clean, responsive design with dark/light mode support.

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Modern Flexbox/Grid)
- **Logic**: Vanilla JavaScript (ES6 Modules)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amrit17612/Intelligent-CPU-Scheduling-Simulator.git
   ```
2. **Open the project**:
   - Simply open `index.html` in any modern web browser.
   - Or serve it using a local server (e.g., `python3 -m http.server`).

## 📖 How to Use

1. **Dashboard**: Get an overview of the system.
2. **Simulator**:
   - Add processes with PID, Arrival Time, Burst Time, and Priority.
   - Use the "Mock" button for quick data generation.
   - Select an algorithm and run the simulation.
3. **Comparison**: Analyze how different algorithms perform with the same process set using visual charts.
4. **Guide**: Read descriptions of each algorithm to understand their pros and cons.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Developed with ❤️ for Academic Excellence.
