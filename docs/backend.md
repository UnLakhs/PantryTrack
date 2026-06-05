# Backend Notes

The backend is a Spring Boot REST API backed by PostgreSQL.

## Packages

```text
com.apostolos.backend
|-- config
|-- controller
|-- dto
|-- model
|-- repository
`-- service
```

## Model

`FoodItem` is the JPA entity mapped to the `food_items` table.

Important fields:

```text
id
name
category
quantity
expirationDate
storageLocation
notes
createdAt
updatedAt
```

`StorageLocation` is an enum:

```text
FRIDGE
FREEZER
PANTRY
```

It is stored as a string in the database with:

```java
@Enumerated(EnumType.STRING)
```

## Repository

`FoodItemRepository` extends `JpaRepository<FoodItem, Long>`.

That gives standard methods automatically:

```text
findAll
findById
save
deleteById
existsById
```

The search method is:

```java
List<FoodItem> findByNameContainingIgnoreCase(String name);
```

Spring Data JPA builds the query from the method name.

## DTOs

`FoodItemRequest` represents data sent from the frontend to the backend.

It has validation annotations such as:

```java
@NotBlank
@NotNull
@FutureOrPresent
```

`FoodItemResponse` represents data sent from the backend to the frontend.

The frontend receives response DTOs, not JPA entities.

## Service

`FoodItemService` owns application-level behavior:

- get all items
- add one item
- search by name
- map `FoodItem` entities to `FoodItemResponse` DTOs

## Controller

Current endpoints:

```http
GET /api/items
GET /api/items/search?search=milk
POST /api/items
```

Controllers should stay thin: they receive HTTP requests, call services, and return DTO responses.

## Local Database Config

Shared config:

```text
backend/src/main/resources/application.properties
```

Local ignored config:

```text
backend/src/main/resources/application-local.properties
```

Use `application-local.properties` for local passwords or machine-specific settings.
