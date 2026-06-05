import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import FoodItemFormModal from "./components/FoodItemFormModal";
import FoodItemTable from "./components/FoodItemTable";
import InventoryToolbar from "./components/InventoryToolbar";
import { useCallback, useEffect, useState } from "react";
import type { FoodItem } from "./data/types";
import { getFoodItems, searchFoodItems } from "./api/food-items";

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadFoodItems = useCallback(async (search = "") => {
    setIsLoading(true);

    try {
      const data = search.trim() ? await searchFoodItems(search) : await getFoodItems();
      setFoodItems(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching food items:", error);
      setErrorMessage("Could not load inventory. Check that the backend is running.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialFoodItems() {
      try {
        const data = await getFoodItems();

        if (!ignore) {
          setFoodItems(data);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);

        if (!ignore) {
          setErrorMessage("Could not load inventory. Check that the backend is running.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialFoodItems();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onAddItem={() => setIsFormOpen(true)} />
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <DashboardStats />

        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <InventoryToolbar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearchSubmit={() => loadFoodItems(searchTerm)}
            onClearSearch={() => {
              setSearchTerm("");
              void loadFoodItems();
            }}
          />
          <FoodItemTable
            foodItems={foodItems}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </section>

        {isFormOpen && (
          <FoodItemFormModal
            onClose={() => setIsFormOpen(false)}
            onItemAdded={() => loadFoodItems(searchTerm)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
