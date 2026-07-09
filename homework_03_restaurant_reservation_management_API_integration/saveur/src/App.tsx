import { useEffect, useState } from "react";
import Header from "./components/Header";
import ReservationList from "./components/ReservationList";
import Dashboard from "./components/Dashboard";
import NewReservationForm from "./components/NewReservationForm";
import type { HttpStatus } from "./types/http-status";

import {fetchReservations, createReservation, deleteReservation, updateReservation } from "./lib/api";
import type { Reservation, CreateReservation } from "./types/reservation";

type ActivePage = "list" | "dashboard" | "form";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("list");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [status, setStatus] = useState<HttpStatus>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
		setStatus('loading'); 
		fetchReservations()
			.then(payload => {
				setReservations(payload.data);
				setStatus('success'); 
			})
			.catch(err => {
				setStatus('error');
				setError(err.message); 
			});

	}, []);

  async function addReservation(reservation: CreateReservation) {
    try {
      const newReservation = await createReservation(reservation);

      setReservations((previous) => [...previous, newReservation]);

      setActivePage("list");
    } catch (error) {
      console.error(error);

      alert("Failed to create reservation.");
    }
  }

  async function handleDeleteReservation(id: number) {
    const confirmed = window.confirm("Are you sure to cancel this reservation?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteReservation(id);

      setReservations((previous) =>
        previous.filter((reservation) => reservation.id !== id),
      );
    } catch (error) {
      console.error(error);

      alert("Failed to delete reservation.");
    }
  }

  async function handleConfirmReservation(id: number) {
    try {
      const updatedReservation = await updateReservation(id, {
        status: "confirmed",
      });

      setReservations((previous) =>
        previous.map((reservation) =>
          reservation.id === id ? updatedReservation : reservation,
        ),
      );
    } catch (error) {
      console.error(error);

      alert("Failed to confirm reservation.");
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto p-8">
        <Header activePage={activePage} setActivePage={setActivePage} />

        <main className="max-w-6xl mx-auto p-8">
          {status === "loading" && (
            <p className="text-center text-slate-600">
              Loading reservations...
            </p>
          )}

          {status === "error" && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}

          {status === "success" && (
            <>
              {activePage === "list" && (
                <ReservationList
                  reservations={reservations}
                  deleteReservation={handleDeleteReservation}
                  confirmReservation={handleConfirmReservation}
                />
              )}

              {activePage === "form" && (
                <NewReservationForm
                  reservations={reservations}
                  addReservation={addReservation}
                />
              )}

              {activePage === "dashboard" && (
                <Dashboard reservations={reservations} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
