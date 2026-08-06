import { useEffect } from "react";

import ReservationList from "../components/ReservationList";

import { useReservationStore } from "../store/reservationStore";

import {
  selectReservations,
  selectError,
  selectIsLoading,
  selectSearch,
  selectStatusFilter,
  selectSortBy,
  selectSortOrder,
  selectPage,
} from "../store/reservationSelectors";

export default function ReservationsPage() {
  const reservations = useReservationStore(selectReservations);

  const isLoading = useReservationStore(selectIsLoading);
  const error = useReservationStore(selectError);

  const search = useReservationStore(selectSearch);
  const statusFilter = useReservationStore(selectStatusFilter);
  const sortBy = useReservationStore(selectSortBy);
  const sortOrder = useReservationStore(selectSortOrder);
  const page = useReservationStore(selectPage);

  const fetchReservations = useReservationStore(
    (state) => state.fetchReservations,
  );

  const fetchAllReservations = useReservationStore(
    (state) => state.fetchAllReservations,
  );

  useEffect(() => {
    void fetchReservations();
  }, [fetchReservations, search, statusFilter, sortBy, sortOrder, page]);

  useEffect(() => {
    void fetchAllReservations();
  }, [fetchAllReservations]);

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">{error}</div>
      </main>
    );
  }

  if (isLoading && reservations.length === 0) {
    return (
      <main className="max-w-6xl mx-auto p-8">
        <p className="text-center text-slate-600">Loading reservations...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      {isLoading && reservations.length > 0 && (
        <div className="bg-blue-100 text-blue-700 p-4 rounded-xl mb-6">
          Refreshing reservations...
        </div>
      )}

      <ReservationList reservations={reservations} />
    </main>
  );
}
