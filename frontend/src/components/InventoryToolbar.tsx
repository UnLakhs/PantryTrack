import type { FormEvent } from "react";

interface InventoryToolbarProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearchSubmit: () => void;
    onClearSearch: () => void;
}

const InventoryToolbar = ({
    searchTerm,
    onSearchTermChange,
    onSearchSubmit,
    onClearSearch,
}: InventoryToolbarProps) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchSubmit();
    }

    return (
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h2 className="text-lg font-semibold text-slate-950">Inventory</h2>
                <p className="mt-1 text-sm text-slate-500">Search and filter stored food items.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onSearchTermChange(event.target.value)}
                    placeholder="Search food..."
                    className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-56"
                />

                <button
                    type="submit"
                    className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                    Search
                </button>

                {searchTerm && (
                    <button
                        type="button"
                        onClick={onClearSearch}
                        className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        Clear
                    </button>
                )}

                <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                    <option>All locations</option>
                    <option>Fridge</option>
                    <option>Freezer</option>
                    <option>Pantry</option>
                </select>

                <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                    <option>All statuses</option>
                    <option>Expired</option>
                    <option>Expiring soon</option>
                    <option>Safe</option>
                </select>
            </form>
        </div>
    )
}

export default InventoryToolbar;
