import type { Reservation } from "../types/reservation";

type ReservationProps = {
  reservation: Reservation;
  updateStatus: (id: string, status: "Confirmed" | "Cancelled") => void;
};

export default function ReservationCard({ reservation, updateStatus }: ReservationProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">
        <h2 className="text-l font-bold text-blue-900">{reservation.guestName}</h2>
        <span className="bg-blue-100 text-sm font-medium  px-3 rounded">{reservation.status}</span>
      </div>

      <div className="mt-4">
        <p>Guests: {reservation.partySize}</p>
        <p>Time: {reservation.arrivalTime}</p>
        <p>Table: {reservation.assignedTable}</p>
      </div>

      {reservation.notes && (
        <p className="mt-3 text-gray-500">{reservation.notes}</p>
      )}

      {reservation.status === "Pending" && (
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => updateStatus(reservation.id, "Confirmed")}
            className="bg-green-400 text-white text-sm font-medium  px-3 py-1 rounded-xl"
          >
            Confirm
          </button>

          <button
            onClick={() => updateStatus(reservation.id, "Cancelled")}
            className="bg-red-400 text-white text-sm font-medium  px-3 py-1 rounded-xl"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
