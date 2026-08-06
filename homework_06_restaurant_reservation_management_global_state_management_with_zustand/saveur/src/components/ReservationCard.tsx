import { useNavigate } from "react-router-dom";

import type { Reservation } from "../types/reservation";
import { useReservationStore } from "../store/reservationStore";

type Props = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: Props) {
  const navigate = useNavigate();

  // ============================
  // ZUSTAND ACTIONS
  // ============================

  const updateReservation = useReservationStore(
    (state) => state.updateReservation,
  );

  const cancelReservation = useReservationStore(
    (state) => state.cancelReservation,
  );

  // ============================
  // STATUS COLORS
  // ============================

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  // ============================
  // CONFIRM RESERVATION
  // ============================

  async function handleConfirmReservation() {
    await updateReservation(reservation.id, {
      status: "confirmed",
    });
  }

  // ============================
  // CANCEL RESERVATION
  // ============================

  async function handleCancelReservation() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmed) {
      return;
    }

    await cancelReservation(reservation.id);
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6"
      onClick={() => navigate(`/reservations/${reservation.id}`)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">
          {reservation.guestName}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColor[reservation.status]
          }`}
        >
          {reservation.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-slate-600">
        <p>
          <strong>Party Size:</strong> {reservation.partySize}
        </p>

        <p>
          <strong>Arrival:</strong> {reservation.arrivalTime}
        </p>

        <p>
          <strong>Table:</strong> {reservation.tableNumber}
        </p>

        <p>
          <strong>Notes:</strong> {reservation.notes || "-"}
        </p>
      </div>

      <div className="flex gap-2 mt-6">
        {/* Confirm */}

        {reservation.status === "pending" && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              void handleConfirmReservation();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        )}

        {/* Edit */}

        <button
          onClick={(event) => {
            event.stopPropagation();

            navigate(`/reservations/${reservation.id}/edit`);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
        >
          Edit
        </button>

        {/* Cancel */}

        <button
          onClick={(event) => {
            event.stopPropagation();
            void handleCancelReservation();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
