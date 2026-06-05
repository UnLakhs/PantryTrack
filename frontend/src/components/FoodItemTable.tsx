import { deleteFoodItem } from "../api/food-items";
import type { FoodItem } from "../data/types";
import {
  foodItemStatusLabels,
  foodItemStatusStyles,
  getFoodItemStatus,
} from "../utils/food-item-status";

interface FoodItemTableProps {
  foodItems: FoodItem[];
  isLoading: boolean;
  errorMessage: string;
  hasItems: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

function formatLocation(storageLocation: FoodItem["storageLocation"]) {
  return storageLocation.charAt(0) + storageLocation.slice(1).toLowerCase();
}

const FoodItemTable = ({
  foodItems,
  isLoading,
  errorMessage,
  hasItems,
  hasActiveFilters,
  onClearFilters,
}: FoodItemTableProps) => {
  const deleteButton = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteFoodItem(id);
        // Refresh the list after deletion. In a real app, consider using state management or SWR for this.
        window.location.reload();
      } catch (error) {
        alert("Failed to delete item: " + error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-medium text-slate-700">
          Loading inventory...
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Fetching items from the backend.
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
        <p className="mt-1 text-sm text-slate-500">
          The table will appear here once data is available.
        </p>
      </div>
    );
  }

  if (foodItems.length === 0) {
    if (hasItems && hasActiveFilters) {
      // There are items in the system, but the active search/filter combination hides them.
      return (
        <div className="px-4 py-12 text-center">
          <p className="text-sm font-semibold text-slate-900">
            No items match your current filters
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try changing the search, location, or status filters.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Clear filters
          </button>
        </div>
      );
    }

    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-slate-900">
          No food items yet
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Add your first item to start tracking your pantry.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Item
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Location
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Expires
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {foodItems.map((item) => {
            const status = getFoodItemStatus(item.expirationDate);

            return (
              <tr key={item.id} className="transition hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4">
                  <p className="font-medium text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.category}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                  {item.quantity}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                  {formatLocation(item.storageLocation)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                  {item.expirationDate}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${foodItemStatusStyles[status]}`}
                  >
                    {foodItemStatusLabels[status]}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                  <button
                    type="button"
                    className="font-medium text-emerald-700 hover:text-emerald-900 hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteButton(item.id)}
                    type="button"
                    className="ml-4 font-medium text-red-600 hover:text-red-800 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemTable;
