import type { FoodItem, FoodItemRequest } from "../data/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

//fetching food items from the database
export async function getFoodItems(): Promise<FoodItem[]> {
    const response = await fetch(`${API_BASE_URL}/items`);

    if (!response.ok) {
        throw new Error("Could not load food items");
    }

    return response.json();
}

// Send only the fields required to create a food item; the backend returns id/timestamps.
export async function addFoodItem(item: FoodItemRequest): Promise<FoodItem> {
    const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error("Could not add food item");
    }

    return response.json();
}
