const Header = () => {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                <div>
                    <p className="text-sm font-medium text-emerald-700">PantryTrack</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">
                        Home food inventory
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track quantities, locations, and expiration dates.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                    Add item
                </button>
            </div>
        </header>
    )
}

export default Header;
