import type { FoodItemStatus } from "../data/types";

export const foodItemStatusLabels: Record<FoodItemStatus, string> = {
    EXPIRED: "Expired",
    EXPIRING_SOON: "Expiring soon",
    SAFE: "Safe",
};

export const foodItemStatusStyles: Record<FoodItemStatus, string> = {
    EXPIRED: "bg-red-100 text-red-800",
    EXPIRING_SOON: "bg-amber-100 text-amber-800",
    SAFE: "bg-emerald-100 text-emerald-800",
};

export function getFoodItemStatus(expirationDate: string): FoodItemStatus {
    const today = new Date();
    const expiresAt = new Date(`${expirationDate}T00:00:00`);

    today.setHours(0, 0, 0, 0);

    const daysUntilExpiration = Math.ceil(
        (expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiration < 0) {
        return "EXPIRED";
    }

    if (daysUntilExpiration <= 7) {
        return "EXPIRING_SOON";
    }

    return "SAFE";
}
