const FoodItemTable = () => {
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
                    <tr>
                        <td className="whitespace-nowrap px-4 py-4">
                            <p className="font-medium text-slate-950">Milk</p>
                            <p className="text-sm text-slate-500">Dairy</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">1 bottle</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">Fridge</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">2026-06-07</td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                                Expiring soon
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                            <button type="button" className="font-medium text-emerald-700 hover:text-emerald-900">
                                Edit
                            </button>
                            <button type="button" className="ml-4 font-medium text-red-600 hover:text-red-800">
                                Delete
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="whitespace-nowrap px-4 py-4">
                            <p className="font-medium text-slate-950">Rice</p>
                            <p className="text-sm text-slate-500">Grains</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">2 kg</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">Pantry</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">2027-01-10</td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                                Safe
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                            <button type="button" className="font-medium text-emerald-700 hover:text-emerald-900">
                                Edit
                            </button>
                            <button type="button" className="ml-4 font-medium text-red-600 hover:text-red-800">
                                Delete
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="whitespace-nowrap px-4 py-4">
                            <p className="font-medium text-slate-950">Eggs</p>
                            <p className="text-sm text-slate-500">Dairy</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">6</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">Fridge</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">2026-06-01</td>
                        <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-800">
                                Expired
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                            <button type="button" className="font-medium text-emerald-700 hover:text-emerald-900">
                                Edit
                            </button>
                            <button type="button" className="ml-4 font-medium text-red-600 hover:text-red-800">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemTable;
