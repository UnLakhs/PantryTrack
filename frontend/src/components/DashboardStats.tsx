import type { FoodItem } from "../data/types";
import { getFoodItemStatus } from "../utils/food-item-status";

interface DashboardStatsProps {
  foodItems: FoodItem[];
}

const DashboardStats = ({ foodItems }: DashboardStatsProps) => {
  const totalItems = foodItems.length;
  const expiredItems = foodItems.filter((item) => getFoodItemStatus(item.expirationDate) === "EXPIRED").length;
  const expiringSoonItems = foodItems.filter((item) => getFoodItemStatus(item.expirationDate) === "EXPIRING_SOON").length;
  const safeItems = foodItems.filter((item) => getFoodItemStatus(item.expirationDate) === "SAFE").length;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total items</p>
        <p className="mt-3 text-3xl font-semibold text-slate-950">
          {totalItems}
        </p>
        <p className="mt-2 text-sm text-slate-500">Across all storage areas</p>
      </article>

      <article className="rounded-lg border border-red-100 bg-red-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-red-700">Expired</p>
        <p className="mt-3 text-3xl font-semibold text-red-950">
          {expiredItems}
        </p>
        <p className="mt-2 text-sm text-red-700">Needs attention</p>
      </article>

      <article className="rounded-lg border border-amber-100 bg-amber-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-amber-700">Expiring soon</p>
        <p className="mt-3 text-3xl font-semibold text-amber-950">
          {expiringSoonItems}
        </p>
        <p className="mt-2 text-sm text-amber-700">Within the next week</p>
      </article>

      <article className="rounded-lg border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">Safe</p>
        <p className="mt-3 text-3xl font-semibold text-emerald-950">
          {safeItems}
        </p>
        <p className="mt-2 text-sm text-emerald-700">Fresh and organized</p>
      </article>
    </section>
  );
};

export default DashboardStats;
