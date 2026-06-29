import type { Reservation } from "../types/reservation";

type ReservationProps = {
  reservations: Reservation[];
};

export default function Dashboard({ reservations }: ReservationProps) {
  const confirmed = reservations.filter(
    (reservation) => reservation.status === "Confirmed",
  );

  const totalGuests = confirmed.reduce(
    (total, reservation) => total + reservation.partySize,
    0,
  );

  const pending = reservations.filter(
    (reservation) => reservation.status === "Pending",
  ).length;

  const tables = confirmed.length;

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Guests */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Expected Guests</p>

          <h3 className="text-4xl font-bold text-blue-700 mt-2">
            {totalGuests}
          </h3>
        </div>

        {/* Tables */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Confirmed Tables</p>

          <h3 className="text-4xl font-bold text-blue-700 mt-2">{tables}</h3>
        </div>

        {/* Pending */}

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending Reservations</p>

          <h3 className="text-4xl font-bold text-orange-500 mt-2">{pending}</h3>
        </div>
      </div>
    </div>
  );
}
