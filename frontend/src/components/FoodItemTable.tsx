import type { FoodItem } from "../data/types";

interface FoodItemTableProps {
  foodItems: FoodItem[];
  isLoading: boolean;
  errorMessage: string;
}

const statusStyles = {
  expired: "bg-red-100 text-red-800",
  expiringSoon: "bg-amber-100 text-amber-800",
  safe: "bg-emerald-100 text-emerald-800",
};

function getExpirationStatus(expirationDate: string) {
  const today = new Date();
  const expiresAt = new Date(`${expirationDate}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  const daysUntilExpiration = Math.ceil(
    (expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilExpiration < 0) {
    return { label: "Expired", className: statusStyles.expired };
  }

  if (daysUntilExpiration <= 7) {
    return { label: "Expiring soon", className: statusStyles.expiringSoon };
  }

  return { label: "Safe", className: statusStyles.safe };
}

function formatLocation(storageLocation: FoodItem["storageLocation"]) {
  return storageLocation.charAt(0) + storageLocation.slice(1).toLowerCase();
}

const FoodItemTable = ({
  foodItems,
  isLoading,
  errorMessage,
}: FoodItemTableProps) => {
  if (isLoading) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-medium text-slate-700">Loading inventory...</p>
        <p className="mt-1 text-sm text-slate-500">Fetching items from the backend.</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
        <p className="mt-1 text-sm text-slate-500">The table will appear here once data is available.</p>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-slate-900">No food items yet</p>
        <p className="mt-1 text-sm text-slate-500">Add your first item to start tracking your pantry.</p>
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
            const status = getExpirationStatus(item.expirationDate);

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
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                    {status.label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                  <button
                    type="button"
                    className="font-medium text-emerald-700 hover:text-emerald-900"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ml-4 font-medium text-red-600 hover:text-red-800"
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
