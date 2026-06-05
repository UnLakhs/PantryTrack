export type StorageLocation = "FRIDGE" | "FREEZER" | "PANTRY";

export type FoodItemStatus = "EXPIRED" | "EXPIRING_SOON" | "SAFE";

export type FoodItem = {
    id: number;
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: StorageLocation;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type FoodItemRequest = {
    name: string;
    category: string;
    quantity: string;
    expirationDate: string;
    storageLocation: StorageLocation;
    notes?: string;
}
