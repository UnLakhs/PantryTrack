import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import FoodItemFormModal from "./components/FoodItemFormModal";
import FoodItemTable from "./components/FoodItemTable";
import InventoryToolbar from "./components/InventoryToolbar";

function App() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <DashboardStats />

        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <InventoryToolbar />
          <FoodItemTable />
        </section>

        <FoodItemFormModal />
      </div>
    </main>
  );
}

export default App;
