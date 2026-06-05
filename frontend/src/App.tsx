import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import FoodItemFormModal from "./components/FoodItemFormModal";
import FoodItemTable from "./components/FoodItemTable";
import InventoryToolbar from "./components/InventoryToolbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FoodItem, FoodItemStatus, StorageLocation } from "./data/types";
import { deleteFoodItem, getFoodItems, searchFoodItems } from "./api/food-items";
import { getFoodItemStatus } from "./utils/food-item-status";

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<"ALL" | StorageLocation>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | FoodItemStatus>("ALL");

  // This is the single inventory refresh path used by search and by the add-item modal.
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

    // Avoid setting state if the component unmounts before the request finishes.
    return () => {
      ignore = true;
    };
  }, []);

  // Location and status filters are derived from the loaded/search result set.
  const filteredFoodItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesLocation =
        locationFilter === "ALL" || item.storageLocation === locationFilter;
      const matchesStatus =
        statusFilter === "ALL" || getFoodItemStatus(item.expirationDate) === statusFilter;

      return matchesLocation && matchesStatus;
    });
  }, [foodItems, locationFilter, statusFilter]);

  const hasActiveFilters =
    searchTerm.trim() !== "" || locationFilter !== "ALL" || statusFilter !== "ALL";

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("ALL");
    setStatusFilter("ALL");
    void loadFoodItems();
  };

  const handleDeleteItem = async (id: number) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this item?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteFoodItem(id);
      await loadFoodItems(searchTerm);
    } catch (error) {
      console.error("Error deleting food item:", error);
      setErrorMessage("Could not delete item. Please try again.");
    }
  };

  const openAddItemModal = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onAddItem={openAddItemModal} />
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <DashboardStats foodItems={filteredFoodItems} />

        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <InventoryToolbar
            searchTerm={searchTerm}
            locationFilter={locationFilter}
            statusFilter={statusFilter}
            onSearchTermChange={setSearchTerm}
            onLocationFilterChange={setLocationFilter}
            onStatusFilterChange={setStatusFilter}
            onSearchSubmit={() => loadFoodItems(searchTerm)}
            onClearSearch={() => {
              setSearchTerm("");
              void loadFoodItems();
            }}
            onClearFilters={clearFilters}
          />
          <FoodItemTable
            foodItems={filteredFoodItems}
            isLoading={isLoading}
            errorMessage={errorMessage}
            hasItems={foodItems.length > 0}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onDeleteItem={(id) => void handleDeleteItem(id)}
            onEditItem={handleEditItem}
          />
        </section>

        {isFormOpen && (
          <FoodItemFormModal
            itemToEdit={editingItem}
            onClose={closeFormModal}
            onItemSaved={() => loadFoodItems(searchTerm)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
