import type { FoodItem, FoodItemRequest } from "../data/types";

// Keep the backend base URL configurable so local and deployed environments can differ.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export async function getFoodItems(): Promise<FoodItem[]> {
    const response = await fetch(`${API_BASE_URL}/items`);

    if (!response.ok) {
        throw new Error("Could not load food items");
    }

    return response.json();
}

// Search for food items based on a search term.
export async function searchFoodItems(search: string): Promise<FoodItem[]> {
    const trimmedSearch = search.trim();

    // Empty search should behave exactly like the normal inventory load.
    if (!trimmedSearch) {
        return getFoodItems();
    }

    const params = new URLSearchParams({ search: trimmedSearch });
    const response = await fetch(`${API_BASE_URL}/items/search?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Could not search food items");
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

//Delete a food item by ID.
export async function deleteFoodItem(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Could not delete food item");
    }
    
}