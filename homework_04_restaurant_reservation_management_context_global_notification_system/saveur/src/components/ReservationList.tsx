import { useState } from "react";
import ReservationCard from "./ReservationCard";
import EditReservationDialog from "./EditReservationDialog";

import type {
  Reservation,
  SortDirection,
  UpdateReservation,
} from "../types/reservation";

type Props = {
  reservations: Reservation[];
  allReservations: Reservation[];

  deleteReservation: (id: number) => Promise<void>;

  confirmReservation: (id: number) => Promise<void>;

  updateReservation: (
    id: number,
    data: UpdateReservation
  ) => Promise<Reservation>;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;

  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;

  sortOrder: SortDirection;
  setSortOrder: React.Dispatch<
    React.SetStateAction<SortDirection>
  >;

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;

  totalPages: number;
};

export default function ReservationList({
  reservations,
  allReservations,
  deleteReservation,
  confirmReservation,
  updateReservation,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  page,
  setPage,
  totalPages,
}: Props) {
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  async function handleUpdateReservation(
    id: number,
    data: UpdateReservation
  ): Promise<Reservation> {
    const result = await updateReservation(id, data);

    setEditingReservation(null);

    return result;
  }

  const pendingCount = allReservations.filter(
  (r) => r.status === "pending"
).length;

const confirmedCount = allReservations.filter(
  (r) => r.status === "confirmed"
).length;

const cancelledCount = allReservations.filter(
  (r) => r.status === "cancelled"
).length;

const allCount = allReservations.length;

  return (
    <div>
      {/* Controls */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Search */}

          <input
            type="text"
            placeholder="Search guest..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          />

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All ({allCount})</option>
            <option value="pending" className = "bg-yellow-100 text-yellow-700">Pending ({pendingCount})</option>
            <option value="confirmed" className = "bg-green-100 text-green-700">Confirmed ({confirmedCount})</option>
            <option value="cancelled" className = "bg-red-100 text-red-700">Cancelled ({cancelledCount})</option>
          </select>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value="createdAt">Created</option>
            <option value="arrivalTime">Arrival Time</option>
            <option value="guestName">Guest Name</option>
            <option value="partySize">Party Size</option>
          </select>

          {/* Sort Direction */}

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(
                e.target.value as SortDirection
              );
              setPage(1);
            }}
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
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            confirmReservation={confirmReservation}
            deleteReservation={deleteReservation}
            onEdit={setEditingReservation}
          />
        ))}
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((current) => current - 1)}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((current) => current + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Edit Reservation Dialog */}

      {editingReservation && (
        <EditReservationDialog
          reservation={editingReservation}
          reservations={reservations}
          updateReservation={handleUpdateReservation}
          onClose={() => setEditingReservation(null)}
          onSuccess={() => handleUpdateReservation}
        />
      )}
    </div>
  );
}
