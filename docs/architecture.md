# Architecture

PantryTrack currently follows a simple full-stack flow:

```text
React UI
  |
frontend/src/api
  |
Spring Boot Controller
  |
Service
  |
Repository
  |
PostgreSQL
```

## Data Flow

The frontend does not call `fetch` directly from every component. API calls are grouped in:

```text
frontend/src/api/food-items.ts
```

This keeps components focused on UI and state, while the API file owns backend URLs and response checks.

The backend does not expose JPA entities directly. Controllers return DTOs:

```text
FoodItemRequest
FoodItemResponse
```

This keeps the HTTP API separate from the database entity shape.

## Main Frontend Data Owner

`App.tsx` is the main owner of inventory data.

It fetches `foodItems` once, stores them in state, and passes them down:

```text
App
|-- DashboardStats
|-- InventoryToolbar
|-- FoodItemTable
`-- FoodItemFormModal
```

This avoids each component fetching the same data independently.

## Backend Layers

```text
Controller = HTTP requests and responses
Service = application logic and DTO mapping
Repository = database access through Spring Data JPA
Model = JPA entities and enums
DTO = API request/response payloads
Config = framework/application configuration
```

The normal request flow for creating an item is:

```text
POST /api/items
  |
FoodItemController.addFoodItem
  |
FoodItemService.addFoodItem
  |
FoodItemRepository.save
  |
PostgreSQL
```

The normal request flow for editing an item is:

```text
PUT /api/items/{id}
  |
FoodItemController.updateFoodItem
  |
FoodItemService.updateFoodItem
  |
FoodItemRepository.findById
  |
FoodItemRepository.save
  |
PostgreSQL
```

The normal request flow for deleting an item is:

```text
DELETE /api/items/{id}
  |
FoodItemController.deleteFoodItem
  |
FoodItemService.deleteFoodItem
  |
FoodItemRepository.deleteById
  |
PostgreSQL
```
