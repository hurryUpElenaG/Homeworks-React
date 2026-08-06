import ReservationCard from "./ReservationCard";

import type { Reservation, SortBy, SortDirection } from "../types/reservation";

import { useReservationStore } from "../store/reservationStore";
import {
  selectPage,
  selectStatusFilter,
  selectSearch,
  selectSortBy,
  selectSortOrder,
  selectTotalPages,
  selectPendingCount,
  selectConfirmedCount,
  selectCancelledCount,
  selectTotalReservations,
} from "../store/reservationSelectors";

type Props = {
  reservations: Reservation[];
};

export default function ReservationList({ reservations }: Props) {

  const search = useReservationStore(selectSearch);
  const statusFilter = useReservationStore(selectStatusFilter);
  const sortBy = useReservationStore(selectSortBy);
  const sortOrder = useReservationStore(selectSortOrder);

  const page = useReservationStore(selectPage);
  const totalPages = useReservationStore(selectTotalPages);

  const setSearch = useReservationStore((state) => state.setSearch);
  const setStatusFilter = useReservationStore((state) => state.setStatusFilter);
  const setSortBy = useReservationStore((state) => state.setSortBy);
  const setSortOrder = useReservationStore((state) => state.setSortOrder);
  const setPage = useReservationStore((state) => state.setPage);

  const pendingCount = useReservationStore(selectPendingCount);
  const confirmedCount = useReservationStore(selectConfirmedCount);
  const cancelledCount = useReservationStore(selectCancelledCount);
  const allCount = useReservationStore(selectTotalReservations);

  return (
    <div>
      {/* Controls */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "pending" | "confirmed" | "cancelled",
              )
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All ({allCount})</option>

            <option value="pending">Pending ({pendingCount})</option>

            <option value="confirmed">Confirmed ({confirmedCount})</option>

            <option value="cancelled">Cancelled ({cancelledCount})</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="createdAt">Created</option>
            <option value="arrivalTime">Arrival Time</option>
            <option value="guestName">Guest Name</option>
            <option value="partySize">Party Size</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortDirection)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>

      {/* Reservation Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
