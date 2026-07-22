import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";

import ReservationsPage from "./pages/ReservationsPage";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";
import NewReservationPage from "./pages/NewReservationPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import EditReservationPage from "./pages/EditReservationPage";

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

export default function App() {
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
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <ReservationsPage
              reservations={reservations}
              allReservations={allReservations}
              status={status}
              error={error}
              deleteReservation={handleDeleteReservation}
              confirmReservation={handleConfirmReservation}
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
          }
        />

        <Route
          path="dashboard"
          element={<DashboardPage reservations={allReservations} />}
        />

        <Route
          path="reservations/new"
          element={
            <NewReservationPage
              reservations={allReservations}
              createReservation={addReservation}
            />
          }
        />

        <Route path="reservations/:id" element={<ReservationDetailsPage />} />
      </Route>

      <Route
        path="reservations/:id/edit"
        element={
          <EditReservationPage
            reservations={allReservations}
            updateReservation={handleUpdateReservation}
          />
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
