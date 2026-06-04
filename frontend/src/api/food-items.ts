import type { FoodItem } from "../data/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export async function getFoodItems(): Promise<FoodItem[]> {
    const response = await fetch(`${API_BASE_URL}/items`);

    if (!response.ok) {
        throw new Error("Could not load food items");
    }

    return response.json();
}
