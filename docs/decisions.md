# Decision Log

This file records why the project is built this way. It is meant for future-you opening the project after forgetting the details.

## Use DTOs Instead Of Exposing Entities

The backend uses `FoodItemRequest` and `FoodItemResponse` instead of sending `FoodItem` entities directly.

Reason:

- the API shape can change independently from the database shape
- validation belongs naturally on request DTOs
- response DTOs avoid leaking persistence details

## Keep Controllers Thin

Controllers call services and return responses.

Reason:

- HTTP logic stays in the controller
- business/application logic stays in the service
- database access stays in the repository

## Store Storage Location As An Enum

`StorageLocation` is an enum instead of a plain string.

Reason:

- only valid values are allowed: `FRIDGE`, `FREEZER`, `PANTRY`
- typos such as `Fridgge` are avoided
- the database stores readable enum names with `EnumType.STRING`

## Derive Status From Expiration Date

The app does not store `EXPIRED`, `EXPIRING_SOON`, or `SAFE` in the database.

Reason:

- status changes as time passes
- storing it would risk stale data
- the frontend currently derives it from `expirationDate`

This may move to the backend later if API consumers need the status directly.

## Fetch Items In App And Pass Props Down

`App.tsx` fetches inventory data and passes it to stats/table components.

Reason:

- one source of truth
- fewer API calls
- stats and table stay synchronized

## Search On Backend, Filter Location/Status On Frontend

Name search uses the backend repository query.

Location and status filters currently run on the frontend.

Reason:

- search by name is a database-friendly query
- status is currently derived on the frontend
- frontend filtering is simple for the current app size

If the inventory grows or filtering becomes more complex, move filters into backend query parameters.

## Use FormData In The Modal

The add/edit modal reads form values using `FormData`.

Reason:

- the form is simple
- avoids creating state for every input field
- works well for uncontrolled forms

If the form later needs live validation, dependent fields, or complex UI behavior, controlled inputs may be a better fit.

## Reuse The Modal For Add And Edit

`FoodItemFormModal` handles both creating and editing food items.

Reason:

- add and edit use the same fields
- one modal keeps styling and validation behavior consistent
- the frontend already has the selected item in `foodItems` state

For editing, the table passes the whole `FoodItem` to `App.tsx`, and `App.tsx` passes it to the modal as `itemToEdit`.

The modal does not fetch `GET /api/items/{id}` before editing yet. That can be added later if the app needs always-fresh data from the database before opening the form.

## Keep Delete In App State Flow

`FoodItemTable` exposes `onDeleteItem(id)`, but `App.tsx` calls the API and refreshes inventory.

Reason:

- `App.tsx` owns the inventory state
- the table stays focused on display and row actions
- deleting can reuse the same refresh path as add/edit/search

## Use Netlify, Render, And Neon For Deployment

The current deployment setup is:

```text
Frontend: Netlify
Backend: Render
Database: Neon PostgreSQL
```

Reason:

- Netlify works well for Vite/React static frontend builds
- Render can host the Spring Boot backend as a Docker web service
- Neon provides hosted PostgreSQL with a free tier suitable for portfolio projects
- the three-service split matches the local architecture: frontend, backend, database

Use this as the default deployment setup for similar React + Spring Boot + PostgreSQL portfolio projects, unless a future project has different requirements.
