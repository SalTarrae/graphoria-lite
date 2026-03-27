# Graphoria Lite

Graphoria Lite is a lightweight interactive web application designed for visual modeling of interconnected data structures. The system 
allows users to create, edit, and connect nodes on a dynamic canvas, forming graphs, trees, and other relational structures.

This project is a simplified prototype inspired by the concept of diploma work of an interactive cross-platform information modeling system 
and demonstrates key principles of software standardization, documentation, and frontend-backend interaction.

---

## Overview

The application provides an interactive environment where users can:

* Create and manage nodes with custom attributes
* Visually position nodes on a canvas
* Establish directional relationships between nodes
* Edit both node properties and connection types
* Persist and retrieve graph data via REST API

The system supports modeling of:

* Graph structures
* Tree hierarchies
* Concept maps
* Dependency diagrams

---

## Architecture

The project follows a client-server architecture:

* **Frontend** — interactive UI for graph manipulation
* **Backend** — REST API for data management
* **In-memory storage** — simplified data persistence for demonstration purposes

---

## Technology Stack

### Frontend

* React
* Vite
* React Flow (graph visualization)
* Axios
* PropTypes

### Backend

* Node.js
* Express.js
* Swagger (OpenAPI documentation)

### Tooling

* ESLint
* license-checker
* npm

---

## Project Structure

```
graphoria-lite/
│
├── backend/
│   ├── server.js
│   ├── swagger.js
│   ├── routes/
│   │   └── nodes.js
│   └── data/
│       └── graphStore.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── LICENSE
├── licenses-backend.txt
├── licenses-frontend.txt
├── README.md
└── privacy-policy.md
```

---

## Features

* Interactive graph canvas
* Drag-and-drop node positioning
* Node creation and deletion
* Node editing (title, description, type, color)
* Edge creation with directional arrows
* Edge labeling (relation types)
* Automatic removal of edges when deleting nodes
* REST API integration
* Swagger API documentation

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/SalTarrae/graphoria-lite.git
cd graphoria-lite
```

---

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend will be available at:

```
http://localhost:4000
```

Swagger documentation:

```
http://localhost:4000/api-docs
```

---

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## API Documentation

The backend exposes a REST API documented using Swagger (OpenAPI 3.0).

Main endpoints include:

### Graph

* `GET /api/graph` — retrieve full graph
* `POST /api/graph` — replace full graph

### Nodes

* `GET /api/nodes`
* `GET /api/nodes/{id}`
* `POST /api/nodes`
* `PUT /api/nodes/{id}`
* `DELETE /api/nodes/{id}`

### Edges

* `GET /api/edges`
* `POST /api/edges`
* `PUT /api/edges/{id}`
* `DELETE /api/edges/{id}`

---

## License

This project is distributed under the MIT License.

See the [LICENSE](https://github.com/SalTarrae/graphoria-lite/blob/master/LICENSE) file for full details.

---

## Dependency License Analysis

All project dependencies were analyzed using the `license-checker` tool.

Generated reports:

* `licenses-backend.txt`
* `licenses-frontend.txt`

The analysis confirms that the majority of dependencies use permissive licenses such as MIT, ISC, Apache-2.0, and BSD.

Frontend package was excluded from the analysis using:

```
license-checker --excludePackages "graphoria-lite-frontend@1.0.0"
```

---

## Privacy and GDPR

The project includes a privacy policy document describing data handling and usage conditions:

* `privacy-policy.md`

A cookie consent mechanism can be integrated to comply with GDPR requirements.

---

## Author

Denys Andriiuk

---

## Notes

This project was developed as part of a coursework assignment in the subject:

"Software Standardization and Documentation"
