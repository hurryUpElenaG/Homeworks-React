import { useEffect } from "react";

type NavigationProps = {
  activePage: "list" | "dashboard";
  setActivePage: (page: "list" | "dashboard") => void;
};

export default function Header({ activePage, setActivePage }: NavigationProps) {
  useEffect(() => {}, []);

  useEffect(() => {}, [activePage]);

  return (
    <header className="mb-5 rounded-xl bg-white-100 p-5 shadow-xl">
      <h1 className="text-3xl font-bold text-blue-500 text-right">Saveur</h1>

      <p className="text-blue-300 mt-2 text-lg text-right">
        Restaurant Reservation System
      </p>

      <nav className="mt-8">
        <ul className="flex gap-4">
          <li>
            <button
              onClick={() => setActivePage("list")}
              className={`text-sm font-medium px-4 py-1 rounded-xl transition-all duration-300 transform hover:scale-105
                ${
                  activePage === "list"
                    ? "bg-white text-blue-700 shadow-xl"
                    : "bg-white/20 text-blue-200 hover:bg-white/30"
                }
              `}
            >
              Reservations
            </button>
          </li>

          <li>
            <button
              onClick={() => setActivePage("dashboard")}
              className={`text-sm font-medium px-4 py-1 rounded-xl transition-all duration-300 transform hover:scale-105
                ${
                  activePage === "dashboard"
                    ? "bg-white text-blue-700 shadow-xl"
                    : "bg-white/20 text-blue-200 hover:bg-white/30"
                }
              `}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
