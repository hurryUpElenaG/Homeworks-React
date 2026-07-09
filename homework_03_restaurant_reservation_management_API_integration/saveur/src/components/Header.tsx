type HeaderProps = {
  activePage: "list" | "form" | "dashboard";
  setActivePage: (
    page: "list" | "form" | "dashboard"
  ) => void;
};

export default function Header({
  activePage,
  setActivePage,
}: HeaderProps) {
  return (
    <header className="bg-white rounded-xl shadow-md border-b border-blue-100">
      {/* <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between"> */}
      <div className="w-full px-8 py-5 flex items-center justify-between">

        {/* Logo */}

        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            Saveur
          </h1>

          <p className="text-sm text-slate-500">
            Restaurant Reservation System
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex gap-3">

          <button
            onClick={() => setActivePage("list")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition
              ${
                activePage === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            Reservation List
          </button>

          <button
            onClick={() => setActivePage("form")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition
              ${
                activePage === "form"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            Add Reservation
          </button>

          <button
            onClick={() => setActivePage("dashboard")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition
              ${
                activePage === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            Dashboard
          </button>

        </nav>

      </div>
    </header>
  );
}