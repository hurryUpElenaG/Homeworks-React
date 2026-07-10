import type { Reservation } from "../types/reservation";

type Props = {
  dashboardReservations: Reservation[];
};

export default function Dashboard({ dashboardReservations }: Props) {
  const confirmedReservations = dashboardReservations.filter(
    (reservation) => reservation.status === "confirmed"
  );

  const confirmedGuests = confirmedReservations.reduce(
    (total, reservation) => total + reservation.partySize,
    0
  );

  const confirmedTables = confirmedReservations.length;

  const pendingReservations = dashboardReservations.filter(
    (reservation) => reservation.status === "pending"
  ).length;

  const cancelledReservations = dashboardReservations.filter(
    (reservation) => reservation.status === "cancelled"
  ).length;

  return (
    <div>

      <h2 className="text-3xl font-bold text-blue-700 mb-8">
        Dashboard
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Guests */}

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-slate-500 text-sm">
            Confirmed Guests
          </p>

          <h3 className="text-4xl font-bold text-blue-700 mt-3">
            {confirmedGuests}
          </h3>

          <p className="text-slate-500 mt-2">
            Expected tonight
          </p>
        </div>

        {/* Tables */}

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600">
          <p className="text-slate-500 text-sm">
            Confirmed Tables
          </p>

          <h3 className="text-4xl font-bold text-green-700 mt-3">
            {confirmedTables}
          </h3>

          <p className="text-slate-500 mt-2">
            Ready to serve
          </p>
        </div>

        {/* Pending */}

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-slate-500 text-sm">
            Pending Reservations
          </p>

          <h3 className="text-4xl font-bold text-yellow-600 mt-3">
            {pendingReservations}
          </h3>

          <p className="text-slate-500 mt-2">
            Waiting for confirmation
          </p>
        </div>

        {/* Cancelled */}

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">
          <p className="text-slate-500 text-sm">
            Cancelled Reservations
          </p>

          <h3 className="text-4xl font-bold text-red-600 mt-3">
            {cancelledReservations}
          </h3>

          <p className="text-slate-500 mt-2">
            Cancelled today
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="bg-white rounded-2xl shadow-md mt-10 p-6">

        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Tonight's Summary
        </h3>

        <div className="space-y-3 text-slate-700">

          <div className="flex justify-between border-b pb-2">
            <span>Total Reservations</span>
            <span className="font-semibold">
              {dashboardReservations.length}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Confirmed Reservations</span>
            <span className="font-semibold">
              {confirmedReservations.length}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Pending Reservations</span>
            <span className="font-semibold">
              {pendingReservations}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Cancelled Reservations</span>
            <span className="font-semibold">
              {cancelledReservations}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}