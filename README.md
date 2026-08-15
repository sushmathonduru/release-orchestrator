# Enterprise DevOps Release Orchestration and Deployment Automation Platform

A lightweight, containerized platform that tracks a software release as it
moves through the deployment pipeline: **Dev → QA → Staging → Production**.

## Architecture

- **frontend/** – Static HTML/CSS/JS dashboard served by nginx
- **backend/** – Node.js/Express REST API
- **mongodb** – Stores release records
- **docker-compose.yml** – Orchestrates all three services together

## Running the project

```bash
git clone <your-repo-url>
cd release-orchestrator
docker compose up --build
```

- Dashboard: http://localhost:8080
- API health check: http://localhost:5000/api/health

## API Endpoints

| Method | Endpoint                     | Description                     |
|--------|-------------------------------|----------------------------------|
| GET    | /api/releases                 | List all releases                |
| POST   | /api/releases                 | Create a new release (starts Dev)|
| PATCH  | /api/releases/:id/promote     | Move release to next stage       |
| PATCH  | /api/releases/:id/approve     | Approve a release                |
| DELETE | /api/releases/:id             | Delete a release record          |

## Branching Strategy

This repository uses a Git Flow inspired model:
`main` (production-ready) ← `release` ← `develop` ← `feature/*` and `hotfix/*`
branches for urgent production fixes. See the technical report for full
justification.
# develop branch active
