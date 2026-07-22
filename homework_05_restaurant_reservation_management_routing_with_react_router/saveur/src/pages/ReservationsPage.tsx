import ReservationList from "../components/ReservationList";
import type { HttpStatus } from "../types/http-status";

import type {
  Reservation,
  SortDirection,
  SortBy,
} from "../types/reservation";

type Props = {
  reservations: Reservation[];
  allReservations: Reservation[];

  status: HttpStatus;
  error: string;

  deleteReservation: (id: number) => Promise<void>;
  confirmReservation: (id: number) => Promise<void>;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;

  sortBy: SortBy;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;

  sortOrder: SortDirection;
  setSortOrder: React.Dispatch<React.SetStateAction<SortDirection>>;

  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;

  totalPages: number;
};

export default function ReservationsPage({
  reservations,
  allReservations,
  status,
  error,
  deleteReservation,
  confirmReservation,
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

  if (status === "loading") {
    return (
      <main className="max-w-6xl mx-auto p-8">
        <p className="text-center text-slate-600">Loading reservations...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="max-w-6xl mx-auto p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">{error}</div>
      </main>
    );
  }

  return (
    <div className="space-y-6">
      <ReservationList
        reservations={reservations}
        allReservations={allReservations}
        deleteReservation={deleteReservation}
        confirmReservation={confirmReservation}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
