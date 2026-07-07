import { useState } from "react";
import Header from "./components/Header";
import ReservationList from "./components/ReservationList";
import Dashboard from "./components/Dashboard";
import { RESERVATIONS } from "./data/seedData";
import type { Reservation } from "./types/reservation";
import NewReservationForm from "./components/NewReservationForm";

function App() {
  const [activePage, setActivePage] = useState<"list" | "dashboard">("list");
  const [reservations, setReservations] = useState(RESERVATIONS);

  function updateStatus(id: string, status: "Confirmed" | "Cancelled") {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation,
      ),
    );
  }

  function addReservation(reservation: Reservation) {
    setReservations((previous) => [reservation, ...previous]);
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto p-8">
        <Header activePage={activePage} setActivePage={setActivePage} />

        <main>
          {activePage === "list" ? (
            <>
            <NewReservationForm
              reservations={reservations}
              addReservation={addReservation}
/>
            <ReservationList
              reservations={reservations}
              updateStatus={updateStatus}
            />
            </>
            
          ) : (
            <Dashboard reservations={reservations} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
