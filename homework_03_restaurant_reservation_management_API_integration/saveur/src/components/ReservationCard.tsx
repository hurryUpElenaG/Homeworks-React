import type { Reservation } from "../types/reservation";

type Props = {
  reservation: Reservation;
  confirmReservation: (id: number) => Promise<void>;
  deleteReservation: (id: number) => Promise<void>;
};

export default function ReservationCard({
  reservation,
  confirmReservation,
  deleteReservation,
}: Props) {
  
  function getStatusColor() {
    switch (reservation.status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "";
    }
  }

  function getStatusText() {
    switch (reservation.status) {
      case "confirmed":
        return "Confirmed";

      case "pending":
        return "Pending";

      case "cancelled":
        return "Cancelled";

      default:
        return reservation.status;
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition">

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold text-slate-800">
          {reservation.guestName}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>

      </div>

      {/* Reservation Details */}

      <div className="space-y-3 text-slate-600">

        <p>
          <span className="font-semibold">👥 Party Size:</span>{" "}
          {reservation.partySize}
        </p>

        <p>
          <span className="font-semibold">🕒 Arrival:</span>{" "}
          {reservation.arrivalTime}
        </p>

        <p>
          <span className="font-semibold">🪑 Table:</span>{" "}
          {reservation.tableNumber}
        </p>

        {reservation.notes && (
          <p>
            <span className="font-semibold">📝 Notes:</span>{" "}
            {reservation.notes}
          </p>
        )}

      </div>

      {/* Buttons */}

      {reservation.status === "pending" && (
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => confirmReservation(reservation.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Confirm
          </button>

          <button
            onClick={() => deleteReservation(reservation.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>

        </div>
      )}

    </div>
  );
}