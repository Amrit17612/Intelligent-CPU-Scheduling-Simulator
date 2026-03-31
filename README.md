# Intelligent CPU Scheduling Simulator 🚀

An interactive, high-performance web application designed to simulate and visualize various CPU scheduling algorithms. Perfect for students and educators to understand the inner workings of operating system process management.

---

## 📸 Preview
![CPU Simulator Screenshot](cpu_simulator_main_page_1774981436246.png)

## 🌟 Key Features

- **📊 Advanced Visualizations**: 
  - Interactive **Gantt Chart** that shows process execution over time.
  - Performance comparisons using dynamic **Bar Charts** (Avg WT, Avg TAT, CPU Utilization).
- **⚙️ 5+ Core Algorithms**:
  - **FCFS** (First Come First Serve)
  - **SJF** (Shortest Job First - Non-preemptive)
  - **SRTF** (Shortest Remaining Time First - Preemptive SJF)
  - **Priority Scheduling** (Non-preemptive)
  - **Round Robin** (Time-sharing with custom Quantum settings)
- **⚡ Real-time Analytics**: Calculate Waiting Time (WT), Turnaround Time (TAT), Response Time (RT), Throughput, and CPU Efficiency instantly.
- **🛠️ Flexible Input**: Add custom processes or generate "Mock" data for quick testing.
- **🎨 Modern UI**: Professional dark-themed interface with smooth transitions, responsive layout, and intuitive navigation.
- **📚 Integrated Learning**: A built-in guide to help users understand the theory behind each algorithm.

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, CSS3 (Modern Grid & Flexbox)
- **Logic**: ES6+ JavaScript (Modular Architecture)
- **Chart Engine**: [Chart.js](https://www.chartjs.org/)
- **Iconography**: [Lucide Icons](https://lucide.dev/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for data.

## 🚀 Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/Amrit17612/Intelligent-CPU-Scheduling-Simulator.git
```

### 2. Run the Application
Since this is a client-side web application, no complex setup is required:
- **Simple Open**: Just open `index.html` in any modern web browser (Chrome, Safari, Firefox, Edge).
- **Local Server (Recommended)**: Use a simple server to avoid CORS issues if using modules:
  ```bash
  # Using Python
  python3 -m http.server 8000
  # Using Node.js
  npx serve .
  ```

## 📖 Theoretical Overview

### Scheduling Algorithms Explained:
1. **First Come First Serve (FCFS)**: The simplest policy—processes are handled in arrival order.
2. **Shortest Job First (SJF)**: Minimizes waiting time by selecting the smallest burst first.
3. **Shortest Remaining Time First (SRTF)**: A preemptive version of SJF, switching if a shorter job arrives.
4. **Priority Scheduling**: Assigns importance to each process; higher priority gets the CPU first.
5. **Round Robin (RR)**: Ensures fairness by giving each process a fixed time quantum.

---

## 🤝 Contribution
Contributions are welcome! If you have ideas for new algorithms (like Multilevel Queue) or UI improvements, feel free to fork the repo and submit a PR.

## 📄 License
Distributed under the **MIT License**.

---
Developed for learning and exploration in Computer Science. 🎓
