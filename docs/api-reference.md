# API Reference - CivicPulse AI

This document outlines the core API endpoints for the CivicPulse AI backend.

**Base URL:** `http://localhost:3000/api`

---

## 🏙️ Sensors

Endpoints for managing and viewing sensor data.

### GET `/api/sensors`

Retrieves a list of all registered sensors in the city.

* **Query Parameters:**
    * `zone` (string, optional): Filter sensors by city zone (e.g., "Zone-A").
    * `type` (string, optional): Filter by sensor type (e.g., "waste", "lighting", "water").
* **Success Response (200 OK):**
    ```json
    [
      {
        "id": "sensor-waste-001",
        "type": "waste",
        "zone": "Zone-A",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "status": "operational",
        "lastValue": 0.85
      },
      {
        "id": "sensor-light-001",
        "type": "lighting",
        "zone": "Zone-B",
        "latitude": 40.7135,
        "longitude": -74.0072,
        "status": "faulty",
        "lastValue": 0.1
      }
    ]
    ```

### GET `/api/sensors/:id/history`

Retrieves the historical time-series data for a single sensor.

* **Query Parameters:**
    * `timeframe` (string, optional): Time window (e.g., "1h", "24h", "7d"). Defaults to "24h".
* **Success Response (200 OK):**
    ```json
    {
      "sensorId": "sensor-waste-001",
      "history": [
        { "timestamp": "2023-10-27T10:00:00Z", "value": 0.82 },
        { "timestamp": "2023-10-27T10:05:00Z", "value": 0.83 },
        { "timestamp": "2023-10-27T10:10:00Z", "value": 0.85 }
      ]
    }
    ```

---

##  Lidar Incidents

Endpoints for managing and tracking city incidents.

### GET `/api/incidents`

Retrieves a list of all incidents.

* **Query Parameters:**
    * `status` (string, optional): Filter by status ("active", "predicted", "resolved", "dispatched").
    * `severity` (string, optional): Filter by severity ("Low", "Medium", "High", "Critical").
* **Success Response (200 OK):**
    ```json
    [
      {
        "id": "inc-9a8f7c",
        "title": "Trash Overflow",
        "type": "WASTE",
        "status": "active",
        "severity": "High",
        "createdAt": "2023-10-27T10:10:00Z",
        "sensorId": "sensor-waste-001",
        "details": {
          "currentValue": 0.95,
          "threshold": 0.9
        }
      }
    ]
    ```

### GET `/api/incidents/:id`

Retrieves the full details for a single incident, including its event log.

* **Success Response (200 OK):**
    ```json
    {
      "id": "inc-9a8f7c",
      "title": "Trash Overflow",
      "status": "dispatched",
      "severity": "High",
      "sensorId": "sensor-waste-001",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "eventLog": [
        {
          "timestamp": "2023-10-27T10:10:00Z",
          "message": "Incident detected: Trash level at 95%."
        },
        {
          "timestamp": "2023-10-27T10:11:00Z",
          "message": "AI Planner: 'High severity waste incident in public park. Requires immediate dispatch.'"
        },
        {
          "timestamp": "2023-10-27T10:11:30Z",
          "message": "AI Dispatcher: 'Work order #WO-452 created. Assigned to Sanitation Team Bravo.'"
        }
      ]
    }
    ```

---

## 🧠 Agents

Endpoints for interacting with the AI Agent console.

### GET `/api/agents/status`

Gets the current status and recent logs from the agent system.

* **Success Response (200 OK):**
    ```json
    {
      "agents": [
        { "name": "PlannerAgent", "status": "idle" },
        { "name": "DispatcherAgent", "status": "active" },
        { "name": "AnalystAgent", "status": "idle" }
      ],
      "recentLogs": [
        {
          "timestamp": "2023-10-27T10:11:30Z",
          "agent": "DispatcherAgent",
          "message": "Work order #WO-452 created. Assigned to Sanitation Team Bravo."
        },
        {
          "timestamp": "2023-10-27T10:11:00Z",
          "agent": "PlannerAgent",
          "message": "High severity waste incident in public park. Requires immediate dispatch."
        }
      ]
    }
    ```

---

## ⏳ Replay

Endpoints for the "time machine" replay mode.

### GET `/api/replay`

Fetches a snapshot of all city-wide events within a given time range.

* **Query Parameters:**
    * `start` (ISOString): The start of the time window.
    * `end` (ISOString): The end of the time window.
* **Success Response (200 OK):**
    ```json
    {
      "timeframe": {
        "start": "2023-10-27T10:00:00Z",
        "end": "2023-10-27T11:00:00Z"
      },
      "events": [
        {
          "timestamp": "2023-10-27T10:05:00Z",
          "type": "SENSOR_UPDATE",
          "data": { "sensorId": "sensor-waste-001", "value": 0.83 }
        },
        {
          "timestamp":"2023-10-27T10:10:00Z",
          "type": "INCIDENT_CREATED",
          "data": { "id": "inc-9a8f7c", "title": "Trash Overflow" }
        },
        {
          "timestamp": "2023-10-27T10:11:30Z",
          "type": "AGENT_ACTION",
          "data": { "agent": "DispatcherAgent", "message": "Work order #WO-452 created." }
        }
      ]
    }
    ```
