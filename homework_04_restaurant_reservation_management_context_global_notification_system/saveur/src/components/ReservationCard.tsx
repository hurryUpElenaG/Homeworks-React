
import type {Reservation} from "../types/reservation";

type Props = {
  reservation: Reservation;
  confirmReservation: (id: number) => Promise<void>;
  deleteReservation: (id: number) => Promise<void>;
  onEdit: (reservation: Reservation) => void;
};

export default function ReservationCard({
  reservation,
  confirmReservation,
  deleteReservation,
  onEdit,
}: Props) {

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };


  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

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
          <strong>Party Size:</strong>{" "}
          {reservation.partySize}
        </p>

        <p>
          <strong>Arrival:</strong>{" "}
          {reservation.arrivalTime}
        </p>

        <p>
          <strong>Table:</strong>{" "}
          {reservation.tableNumber}
        </p>

        <p>
          <strong>Notes:</strong>{" "}
          {reservation.notes || "-"}
        </p>

      </div>

        <div className="flex gap-2 mt-6">

          {reservation.status === "pending" && (
            <button
              onClick={() => confirmReservation(reservation.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Confirm
            </button>
          )}

          <button
            onClick={() => onEdit(reservation)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => deleteReservation(reservation.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>

        </div>
      

    </div>
  );
}