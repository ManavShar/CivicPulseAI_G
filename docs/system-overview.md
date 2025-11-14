# 🏛️ CivicPulse AI: System Overview

## 1. Core Premise

CivicPulse AI is an autonomous smart city micro-operations platform. It transitions city management from a traditionally slow, **reactive** model (waiting for citizen complaints) to a modern, **predictive and autonomous** model.

It functions as an "AI-powered city brain" that ingests real-time data, predicts failures, and autonomously dispatches (simulated) resources to resolve issues before they escalate.

## 2. System Components

The system is built on a containerized, microservice-style architecture.

### a. Frontend (`apps/frontend`)
* **Tech:** React, Vite, TypeScript, Tailwind CSS, Mapbox, Framer Motion
* **Purpose:** The primary user interface for city operators. It's a single-page application (SPA) that provides the "Digital Twin" dashboard, incident lists, agent console, and replay mode. It communicates with the backend via a REST API and a live WebSocket connection.

### b. Backend (`apps/backend`)
* **Tech:** Node.js, Fastify, TypeScript, Prisma, PostgreSQL, WebSockets
* **Purpose:** The central nervous system.
    * **API Server:** Handles all RESTful requests for data (incidents, sensors, replay).
    * **WebSocket Server:** Pushes live data (sensor updates, new incidents, agent actions) to all connected frontend clients.
    * **Incident Engine:** Contains the business logic for detecting, scoring, and prioritizing new incidents based on incoming sensor data.
    * **Prediction Service:** Interfaces with the ML models to generate time-series forecasts (e.g., "predict trash overflow").
    * **Database:** Connects to the PostgreSQL database via Prisma for all data persistence.

### c. AI Agents (`apps/agents`)
* **Tech:** Python, FastAPI, LLM client (e.g., OpenAI library)
* **Purpose:** The "brain" of the operation. This service runs as a separate API that the backend orchestrator can call.
    * **Planner Agent:** Analyzes the overall city state, identifies high-priority incidents, and generates a high-level plan.
    * **Dispatcher Agent:** Takes the plan, breaks it into concrete (simulated) work orders, and assigns them to field teams.
    * **Analyst Agent:** Provides natural language summaries and explanations for AI-driven decisions, which are shown in the frontend.

### d. Machine Learning (`apps/ml`)
* **Tech:** Python, Scikit-learn / Prophet
* **Purpose:** A (placeholder) service for hosting predictive models. In this hackathon build, it provides a simple time-series forecasting model (e.g., ARIMA or Prophet) to predict sensor values.

### e. Simulation (`scripts/`)
* **Tech:** TypeScript (ts-node)
* **Purpose:** A script that generates realistic, fake sensor data and streams it to the backend's ingestion endpoint. This makes the digital twin feel "alive" for demo purposes.

## 3. Data Flow: An Incident Lifecycle

1.  **Ingestion:** The `generate_fake_sensors.ts` script runs, sending simulated sensor data (e.g., `{"sensorId": "trash-8A", "value": 0.92}`) to the backend (`/api/sensors/ingest`).
2.  **Detection:** The backend's `incidentDetection` service processes this new data. It checks against rules (e.g., `value > 0.9`) and triggers a new **Incident** (e.g., "Trash Overflow").
3.  **Scoring:** The `incidentScoring` service assigns a priority score (e.g., `severity: "High"`, `urgency: 9/10`).
4.  **Broadcast:** The WebSocket server broadcasts the new incident to all connected frontend clients.
5.  **Visualization:** The React frontend receives the WebSocket message and dynamically adds a new, animated, high-severity marker to the city map.
6.  **Action:** The backend's `agentOrchestrator` service sends the new, high-priority incident to the **Agent Service**.
7.  **Reasoning:** The **Planner Agent** (Python) receives the data, reasons about it (e.g., "This trash overflow is in a high-traffic public park"), and creates a plan.
8.  **Dispatch:** The **Dispatcher Agent** generates a simulated work order (e.g., "Dispatch 'Sanitation Team Bravo' to 'trash-8A'").
9.  **Feedback:** The agent service returns its thoughts, decisions, and the work order to the backend.
10. **Explainability:** The backend broadcasts the agent's actions via WebSocket. The frontend's "Agent Console" updates with the AI's reasoning, and the incident marker on the map changes its status to "Dispatched."
