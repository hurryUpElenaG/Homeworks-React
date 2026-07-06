import { useState } from "react";
import ReservationCard from "./ReservationCard";
import type { Reservation } from "../types/reservation";

type ReservationProps = {
  reservations: Reservation[];
  updateStatus: (id: number, status: "Confirmed" | "Cancelled") => void;
};

export default function ReservationList({
  reservations,
  updateStatus,
}: ReservationProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = reservations.filter((reservation) => {
    const matchStatus = filter === "All" || reservation.status === filter;
    const matchSearch = reservation.guestName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div>
      {/* Controls */}

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <div className="flex gap-3 justify-end">
          <input
            className="border rounded-lg px-2 py-1 text-sm"
            type="text"
            placeholder="Search guest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {["All", "Pending", "Confirmed", "Cancelled"].map((item) => {
            const count =
              item === "All"
                ? reservations.length
                : reservations.filter(
                    (reservation) => reservation.status === item,
                  ).length;

            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className="bg-blue-100 px-2 py-1 text-sm rounded-lg"
              >
                {item} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5">
        {filtered.length > 0 ? (
          filtered.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              updateStatus={updateStatus}
            />
          ))
        ) : (
          <div className="col-span-full rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <h2 className="text-lg font-semibold">No reservations found</h2>

            <p className="mt-2 text-gray-600">
              There are no reservations that match your current search or
              filter.
            </p>

            <p className="mt-1 text-gray-500">
              Try selecting another status or clear the search to see more
              reservations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
