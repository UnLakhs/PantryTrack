export type FoodItem = {
    id: number;
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: "FRIDGE" | "FREEZER" | "PANTRY";
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type FoodItemRequest = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: "FRIDGE" | "FREEZER" | "PANTRY";
    notes?: string;
}
