import { useEffect, useState } from "react";
import Header from "./components/Header";
import ReservationList from "./components/ReservationList";
import Dashboard from "./components/Dashboard";
import NewReservationForm from "./components/NewReservationForm";
import type { HttpStatus } from "./types/http-status";
import { useDebounce } from "./hooks/useDebounce";
import { useNotifications } from "./hooks/useNotifications";

import {
  fetchReservations,
  fetchAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
} from "./lib/api";

import type {
  Reservation,
  CreateReservation,
  UpdateReservation,
  SortDirection,
  SortBy,
} from "./types/reservation";

type ActivePage = "list" | "dashboard" | "form";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("list");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [status, setStatus] = useState<HttpStatus>("loading");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortDirection>("ASC");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const { notify } = useNotifications();

  async function loadReservations() {
    try {
      setStatus("loading");

      const response = await fetchReservations(
        debouncedSearch,
        statusFilter,
        sortBy,
        sortOrder,
        page,
        10, //limit
      );

      setReservations(response.data);
      setTotalPages(response.totalPages);
      setStatus("success");
    } catch (error) {
      console.error(error);

      setError("Failed to load reservations.");
      setStatus("error");
    }
  }

  useEffect(() => {
    loadReservations();
  }, [debouncedSearch, statusFilter, sortBy, sortOrder, page]);

  //used for counting status reservations in reservationsList and Dashboard
  async function loadAllReservations() {
    try {
      const response = await fetchAllReservations();
      setAllReservations(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAllReservations();
  }, []);

  async function addReservation(
    reservation: CreateReservation,
  ): Promise<Reservation> {
    try {
      const newReservation = await createReservation(reservation);

      setReservations((previous) => [...previous, newReservation]);
      setAllReservations((previous) => [...previous, newReservation]);

      notify(
        `Reservation for ${newReservation.guestName} has been created.`,
        "success",
      );

      setActivePage("list");

      return newReservation;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create reservation.";

      notify(message, "error");

      throw error;
    }
  }

  async function handleDeleteReservation(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReservation(id);

      notify("Reservation has been cancelled.", "success");

      await loadReservations();
      await loadAllReservations();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete reservation.";

      notify(message, "error");
    }
  }

  async function handleConfirmReservation(id: number) {
    try {
      await updateReservation(id, {
        status: "confirmed",
      });

      notify("Reservation confirmed successfully.", "success");

      await loadReservations();
      await loadAllReservations();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update reservation.";

      notify(message, "error");
    }
  }

  async function handleUpdateReservation(
    id: number,
    data: UpdateReservation,
  ): Promise<Reservation> {
    try {
      const updatedReservation = await updateReservation(id, data);

      await loadReservations();
      await loadAllReservations();

      notify("Reservation updated successfully.", "success");

      return updatedReservation;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update reservation.";

      notify(message, "error");

      throw error;
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
                  allReservations={allReservations}
                  deleteReservation={handleDeleteReservation}
                  confirmReservation={handleConfirmReservation}
                  updateReservation={handleUpdateReservation}
                  search={search}
                  setSearch={setSearch}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              )}

              {activePage === "form" && (
                <NewReservationForm
                  reservations={reservations}
                  createReservation={addReservation}
                  onSuccess={() => setActivePage("list")}
                />
              )}

              {activePage === "dashboard" && (
                <Dashboard reservations={allReservations} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
