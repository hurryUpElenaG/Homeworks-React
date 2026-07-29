import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
      : "text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg";

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Saveur
        </h1>

        <nav className="flex gap-3">

          <NavLink to="/" end className={linkClass}>
            Reservations
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/reservations/new" className={linkClass}>
            New Reservation
          </NavLink>

        </nav>
      </div>
    </header>
  );
}