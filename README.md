🚀 CivicPulse AI

CivicPulse AI is a real-time digital twin of a city that detects, predicts, and resolves micro-infrastructure issues autonomously using agentic AI and simulated sensor networks.

It functions as the AI brain of a future smart city, moving operations from reactive to predictive and autonomous.

✨ Core Features

🏙️ Real-Time Digital Twin: A high-fidelity map dashboard visualizing live sensor data (waste, lighting, water, traffic) with animated markers and heatmaps.

🔮 Predictive Analytics: Uses time-series forecasting to predict infrastructure failures before they happen (e.g., "Trash bin 4A-8 will overflow in 2 hours").

🧠 Agentic AI Operations: A multi-agent system (Planner, Dispatcher, Analyst) that autonomously detects incidents, creates action plans, and simulates work order dispatch.

CONSOLE Agent Console: A "mission control" UI to see the AI agents' live thoughts, decisions, and reasoning in plain English.

⏳ Incident Replay: A "time machine" feature to scrub through the last 24 hours and watch how incidents evolved and how the AI responded.

🎬 Cinematic Demo Mode: Trigger pre-defined city-wide scenarios like a "sudden flood" or "traffic gridlock" to demonstrate the system's resilience.

🎯 The Problem

Cities suffer from thousands of daily micro-issues: overflowing trash, failed streetlights, water leaks, and local congestion. The traditional "wait for a citizen to complain" model is slow, costly, and inefficient.

💡 The Solution

CivicPulse AI provides a central "brain" that:

Watches thousands of data streams 24/7.

Understands patterns and predicts future failures.

Acts by autonomously planning and dispatching maintenance tasks.

Explains its every decision in real-time.

🔧 Tech Stack

Frontend: React, Vite, TypeScript, Tailwind CSS, Mapbox, Framer Motion

Backend: Node.js, Fastify, TypeScript, Prisma, PostgreSQL

Real-time: WebSockets

AI Agents: Python, LangChain/Custom Logic

ML: Scikit-learn / Prophet (for time-series forecasting)

DevOps: Docker, Nginx, Turborepo (Monorepo)

📦 Getting Started

This is a monorepo using pnpm workspaces and turbo.

Prerequisites:

Node.js (v18+)

pnpm

Python (v3.10+)

Docker & Docker Compose

1. Clone the repository

git clone [https://github.com/your-username/civicpulse-ai.git](https://github.com/your-username/civicpulse-ai.git)
cd civicpulse-ai


2. Install dependencies

# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install


3. Set up environment variables

Copy the example env file and fill in the details (e.g., database URL, Mapbox key).

cp .env.example .env


4. Start the full system (Dev Mode)

This command uses turbo to run all services (frontend, backend, agents) in development mode. You will need to run the database separately (e.g., via docker-compose -f devops/docker-compose.yml up db).

pnpm dev


Frontend will be live at: http://localhost:5173

Backend API will be at: http://localhost:3000

Agent Service will be at: http://localhost:8000

🚀 Running in Production

A production-ready docker-compose.yml is provided for a full, containerized deployment.

docker-compose -f devops/docker-compose.yml up --build


This will build and run the database, frontend, backend, and agent containers, all reverse-proxied by Nginx and accessible at http://localhost.
