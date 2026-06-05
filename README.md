# PantryTrack

PantryTrack is a full-stack learning project for tracking food stored at home and avoiding waste from forgotten or expired items.

The app lets a user add food items, view their inventory, search by name, filter by location/status, and see dashboard statistics based on expiration dates.

## Stack

- React
- TypeScript
- Tailwind CSS
- Spring Boot
- Spring Data JPA
- PostgreSQL

## Current Features

- Add food items from the frontend modal
- Store food items in PostgreSQL
- View inventory in a table
- Search food items by name
- Filter items by storage location
- Filter items by expiration status
- Show dashboard stats from the same inventory data used by the table
- Basic CORS setup for Vite frontend and Spring Boot backend

## Project Structure

```text
PantryTrack
|-- backend
|   `-- src/main/java/com/apostolos/backend
|       |-- config
|       |-- controller
|       |-- dto
|       |-- model
|       |-- repository
|       `-- service
|-- frontend
|   `-- src
|       |-- api
|       |-- components
|       |-- data
|       `-- utils
`-- docs
```

## Backend Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE pantrytrack;
```

The shared backend config lives in:

```text
backend/src/main/resources/application.properties
```

Local secrets can go in:

```text
backend/src/main/resources/application-local.properties
```

That file is ignored by Git.

Run the backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

## Frontend Setup

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend API at:

```text
http://localhost:8080/api
```

You can override this with a Vite environment variable:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## API Endpoints

```http
GET /api/items
GET /api/items/search?search=milk
POST /api/items
```

## Documentation

More detailed notes live in:

- [Frontend Notes](docs/frontend.md)
- [Backend Notes](docs/backend.md)
- [Architecture Notes](docs/architecture.md)
- [Decision Log](docs/decisions.md)

These docs explain how the app is currently wired and why certain choices were made.
