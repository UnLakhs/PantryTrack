# PantryTrack

## Overview

PantryTrack is a full-stack web application that helps users manage food items stored at home and track their expiration dates.

The goal is simple:

> Know what food you have, where it is stored, and what needs to be consumed before it expires.

This project is designed as a learning project using:

- React
- Tailwind CSS
- Spring Boot
- PostgreSQL

---

## Problem

Many people buy groceries and forget what they already have at home.

This leads to:

- Food waste
- Unnecessary purchases
- Expired products
- Poor inventory visibility

PantryTrack solves this by providing a centralized food inventory dashboard.

---

## Core Features

### Add Food Items

Users can create food entries with:

- Name
- Category
- Quantity
- Expiration Date
- Storage Location
- Notes

Example:

- Milk
- Chicken Breast
- Rice
- Eggs

---

### View Inventory

Display all stored items in a single dashboard.

Each item displays:

- Name
- Quantity
- Location
- Expiration Date
- Current Status

---

### Expiration Tracking

Items are automatically classified as:

- Expired
- Expires Today
- Expiring Soon
- Safe

This status is calculated based on the current date.

---

### Filtering

Filter items by:

#### Storage Location

- Fridge
- Freezer
- Pantry

#### Status

- Expired
- Expiring Soon
- Safe

---

### Search

Search food items by name.

Example:

- milk
- rice
- chicken

---

### Edit Items

Users can update:

- Quantity
- Notes
- Expiration Date
- Storage Location

---

### Delete Items

Remove products that are consumed or no longer needed.

---

## Dashboard Statistics

Display useful metrics:

- Total Items
- Expired Items
- Expiring This Week
- Items By Location

---

# Technical Architecture

## Frontend

### Stack

- React
- TypeScript
- Tailwind CSS
- Fetch API

### Suggested Structure

```text
src
├── api
├── components
├── pages
├── hooks
├── types
└── App.tsx
```

---

## Backend

### Stack

- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL

### Suggested Structure

```text
controller
service
repository
model
dto
exception
config
```

---

## Database

### Table: food_items

Fields:

- id
- name
- category
- quantity
- expiration_date
- storage_location
- notes
- created_at
- updated_at

---

## API Endpoints

### GET

```http
GET /api/items
GET /api/items/{id}
```

### POST

```http
POST /api/items
```

### PUT

```http
PUT /api/items/{id}
```

### DELETE

```http
DELETE /api/items/{id}
```

### Filters

```http
GET /api/items?status=EXPIRED
GET /api/items?location=FRIDGE
GET /api/items?search=milk
```

---

## Learning Goals

This project is intended to practice:

- Spring Boot Architecture
- Controllers
- Services
- Repositories
- Dependency Injection
- DTOs
- Validation
- PostgreSQL Integration
- React API Communication
- CRUD Operations
- Tailwind UI Development

---

## Future Improvements

- Authentication & Authorization
- User Accounts
- Email Notifications
- Barcode Scanning
- Shopping List Generation
- Mobile Responsive Dashboard
