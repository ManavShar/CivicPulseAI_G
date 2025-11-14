# 🚀 CivicPulse AI

**CivicPulse AI** is a real-time digital twin of a city that detects, predicts, and resolves micro-infrastructure issues autonomously using agentic AI and simulated sensor networks.

It functions as the AI brain of a future smart city, moving operations from **reactive** to **predictive and autonomous**.

---

### ✨ Core Features

* **🏙️ Real-Time Digital Twin:** A high-fidelity map dashboard visualizing live sensor data (waste, lighting, water, traffic) with animated markers and heatmaps.
* **🔮 Predictive Analytics:** Uses time-series forecasting to predict infrastructure failures *before* they happen (e.g., "Trash bin 4A-8 will overflow in 2 hours").
* **🧠 Agentic AI Operations:** A multi-agent system (Planner, Dispatcher, Analyst) that autonomously detects incidents, creates action plans, and simulates work order dispatch.
* **CONSOLE Agent Console:** A "mission control" UI to see the AI agents' live thoughts, decisions, and reasoning in plain English.
* **⏳ Incident Replay:** A "time machine" feature to scrub through the last 24 hours and watch how incidents evolved and how the AI responded.
* **🎬 Cinematic Demo Mode:** Trigger pre-defined city-wide scenarios like a "sudden flood" or "traffic gridlock" to demonstrate the system's resilience.

---

### 🎯 The Problem

Cities suffer from thousands of daily micro-issues: overflowing trash, failed streetlights, water leaks, and local congestion. The traditional "wait for a citizen to complain" model is slow, costly, and inefficient.

### 💡 The Solution

CivicPulse AI provides a central "brain" that:
1.  **Watches** thousands of data streams 24/7.
2.  **Understands** patterns and predicts future failures.
3.  **Acts** by autonomously planning and dispatching maintenance tasks.
4.  **Explains** its every decision in real-time.

---

### 🔧 Tech Stack

* **Frontend:** React, Vite, TypeScript, Tailwind CSS, Mapbox, Framer Motion
* **Backend:** Node.js, Fastify, TypeScript, Prisma, PostgreSQL
* **Real-time:** WebSockets
* **AI Agents:** Python, LangChain/Custom Logic
* **ML:** Scikit-learn / Prophet (for time-series forecasting)
* **DevOps:** Docker, Nginx, Turborepo (Monorepo)

---

### 📦 Getting Started

This is a monorepo using `pnpm` workspaces and `turbo`.

**Prerequisites:**
* Node.js (v18+)
* `pnpm`
* Python (v3.10+)
* Docker & Docker Compose

#### 1. Clone the repository

```bash
git clone [https://github.com/your-username/civicpulse-ai.git](https://github.com/your-username/civicpulse-ai.git)
cd civicpulse-ai

