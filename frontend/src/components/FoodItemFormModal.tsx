const FoodItemFormModal = () => {
    return (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-950">Add food item</h2>
                    <p className="mt-1 text-sm text-slate-500">Form layout preview for creating or editing an item.</p>
                </div>

                <button
                    type="button"
                    className="self-start rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                    Close
                </button>
            </div>

            <form className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Name</span>
                    <input
                        type="text"
                        placeholder="Milk"
                        className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Category</span>
                    <input
                        type="text"
                        placeholder="Dairy"
                        className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Quantity</span>
                    <input
                        type="text"
                        placeholder="1 bottle"
                        className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Expiration date</span>
                    <input
                        type="date"
                        className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Storage location</span>
                    <select className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                        <option>Fridge</option>
                        <option>Freezer</option>
                        <option>Pantry</option>
                    </select>
                </label>

                <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Notes</span>
                    <textarea
                        rows={4}
                        placeholder="Optional notes..."
                        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </label>

                <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                        Save item
                    </button>
                </div>
            </form>
        </section>
    )
}

export default FoodItemFormModal;
