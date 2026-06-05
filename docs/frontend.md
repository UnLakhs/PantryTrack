# Frontend Notes

The frontend is a React + TypeScript + Tailwind CSS app.

## Main Data Flow

`App.tsx` owns the main inventory state:

```ts
const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
```

That state is passed down to components:

```tsx
<DashboardStats foodItems={filteredFoodItems} />
<FoodItemTable foodItems={filteredFoodItems} />
```

This is intentional. Both stats and table should use the same data source so they stay in sync.

## API Layer

Backend calls live in:

```text
frontend/src/api/food-items.ts
```

Current API helpers:

```text
getFoodItems
searchFoodItems
addFoodItem
updateFoodItem
deleteFoodItem
```

Components should prefer these helpers instead of writing `fetch` inline.

## Search and Filters

Search is backend-backed:

```text
GET /api/items/search?search=...
```

Location and status filters currently run on the frontend.

Why:

- `storageLocation` already exists on each item
- `status` is derived from `expirationDate`
- the current dataset is small enough for frontend filtering

The current filter logic is:

```text
search result AND location filter AND status filter
```

So if the user searches `Rice` while `Location = Fridge`, and Rice is in the pantry, no result is shown. The UI explains this with a filter-specific empty state and a clear filters action.

## Status Calculation

Expiration status is shared in:

```text
frontend/src/utils/food-item-status.ts
```

This avoids duplicating the same date logic in the table, stats, and filters.

Statuses:

```text
EXPIRED
EXPIRING_SOON
SAFE
```

## Add/Edit Modal Flow

`FoodItemFormModal` uses `FormData` to read uncontrolled form fields.

The same modal handles both add and edit:

```text
itemToEdit is null      -> POST /api/items
itemToEdit has an item  -> PUT /api/items/{id}
```

When editing, `App.tsx` passes the existing `FoodItem` from state into the modal. The modal fills fields with `defaultValue`, so it does not need a separate `GET /api/items/{id}` request.

On successful save:

```text
addFoodItem/updateFoodItem
  |
App reloads foodItems
  |
Table and stats refresh
```

The modal displays local success/failure messages.

## Delete Flow

Delete starts in the table, but the API call lives in `App.tsx`.

```text
FoodItemTable Delete click
  |
App.handleDeleteItem(id)
  |
deleteFoodItem(id)
  |
App reloads foodItems
```

This keeps `FoodItemTable` focused on rendering rows and actions, while `App.tsx` remains the owner of inventory state.
