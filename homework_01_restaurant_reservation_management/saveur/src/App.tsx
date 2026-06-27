import { useState } from "react";
import Header from "./components/Header";
import ReservationList from "./components/ReservationList";
import Dashboard from "./components/Dashboard";
import { RESERVATIONS } from "./data/seedData";

function App() {
  const [activePage, setActivePage] = useState<"list" | "dashboard">("list");
  const [reservations, setReservations] = useState(RESERVATIONS);

  function updateStatus(id: number, status: "Confirmed" | "Cancelled") {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto p-8">

        <Header activePage={activePage} setActivePage={setActivePage} />

        <main>
          {activePage === "list" ? (
            <ReservationList reservations={reservations} updateStatus={updateStatus}/>
          ) : (
            <Dashboard reservations={reservations} />
          )}
        </main>
      </div>
    </div>
  );
}


export default App;
