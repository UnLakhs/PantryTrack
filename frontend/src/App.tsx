import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import FoodItemFormModal from "./components/FoodItemFormModal";
import FoodItemTable from "./components/FoodItemTable";
import InventoryToolbar from "./components/InventoryToolbar";
import { useEffect, useState } from "react";
import type { FoodItem } from "./data/types";
import { getFoodItems } from "./api/food-items";

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadFoodItems() {
      try {
        const data = await getFoodItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setErrorMessage("Could not load inventory. Check that the backend is running.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFoodItems();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <DashboardStats />

        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <InventoryToolbar />
          <FoodItemTable
            foodItems={foodItems}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </section>

        <FoodItemFormModal />
      </div>
    </main>
  );
}

export default App;
