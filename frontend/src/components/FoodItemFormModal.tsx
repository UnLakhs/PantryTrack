import { addFoodItem } from "../api/food-items";
import type { FoodItemRequest } from "../data/types";
import { useState, type FormEvent } from "react";

interface FoodItemFormModalProps {
    onClose: () => void;
    onItemAdded: () => Promise<void>;
}

const FoodItemFormModal = ({ onClose, onItemAdded }: FoodItemFormModalProps) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // This form is simple enough to read as FormData instead of controlling every input.
        const foodItem: FoodItemRequest = {
            name: String(formData.get("name")),
            category: String(formData.get("category")),
            quantity: String(formData.get("quantity")),
            expirationDate: String(formData.get("expirationDate")),
            storageLocation: formData.get("storageLocation") as FoodItemRequest["storageLocation"],
            notes: String(formData.get("notes")),
        };

        try {
            await addFoodItem(foodItem);
            await onItemAdded();
            form.reset();
            setSuccessMessage("Food item added successfully.");
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("Could not add food item. Check the fields and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/40 px-4 py-8 sm:items-center">
            <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-950">Add food item</h2>
                        <p className="mt-1 text-sm text-slate-500">Create a new item in your pantry inventory.</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="self-start rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                    {successMessage && (
                        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 sm:col-span-2">
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 sm:col-span-2">
                            {errorMessage}
                        </p>
                    )}

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Name</span>
                        <input
                            name="name"
                            type="text"
                            placeholder="Milk"
                            required
                            className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Category</span>
                        <input
                            name="category"
                            type="text"
                            placeholder="Dairy"
                            required
                            className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Quantity</span>
                        <input
                            name="quantity"
                            type="text"
                            placeholder="1 bottle"
                            required
                            className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Expiration date</span>
                        <input
                            name="expirationDate"
                            type="date"
                            required
                            className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Storage location</span>
                        <select name="storageLocation" className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                            <option value="FRIDGE">Fridge</option>
                            <option value="FREEZER">Freezer</option>
                            <option value="PANTRY">Pantry</option>
                        </select>
                    </label>

                    <label className="block sm:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Notes</span>
                        <textarea
                            name="notes"
                            rows={4}
                            placeholder="Optional notes..."
                            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </label>

                    <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                        >
                            {isSubmitting ? "Saving..." : "Save item"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default FoodItemFormModal;
