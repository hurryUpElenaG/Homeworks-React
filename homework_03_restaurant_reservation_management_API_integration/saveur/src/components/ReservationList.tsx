import { useState } from "react";
import ReservationCard from "./ReservationCard";
import type { Reservation } from "../types/reservation";

type Props = {
  reservations: Reservation[];
  deleteReservation: (id: number) => Promise<void>;
  confirmReservation: (id: number) => Promise<void>;
};

export default function ReservationList({
  reservations,
  deleteReservation,
  confirmReservation,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = reservation.guestName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || reservation.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = reservations.filter(
    (reservation) => reservation.status === "pending"
  ).length;

  const confirmedCount = reservations.filter(
    (reservation) => reservation.status === "confirmed"
  ).length;

  const cancelledCount = reservations.filter(
    (reservation) => reservation.status === "cancelled"
  ).length;

  return (
     <div>
      {/* Search & Filter */}

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">

        <div className="flex gap-3 justify-end">

          <input
            type="text"
            placeholder="Search guest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 w-full lg:w-72"
          />

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition
                ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              All ({reservations.length})
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition
                ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              Pending ({pendingCount})
            </button>

            <button
              onClick={() => setFilter("confirmed")}
              className={`px-4 py-2 rounded-lg transition
                ${
                  filter === "confirmed"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700"
                }`}
            >
              Confirmed ({confirmedCount})
            </button>

            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-lg transition
                ${
                  filter === "cancelled"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-700"
                }`}
            >
              Cancelled ({cancelledCount})
            </button>

          </div>

        </div>

      </div>

      {/* Empty State */}

      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No reservations found
          </h2>

          <p className="text-slate-500 mt-2">
            Try changing the search or filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">

          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              deleteReservation={deleteReservation}
              confirmReservation={confirmReservation}
            />
          ))}

        </div>
      )}
    </div>
  );
}