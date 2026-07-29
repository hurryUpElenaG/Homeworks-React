import { useNavigate, useParams } from "react-router-dom";
import NewReservationForm from "../components/NewReservationForm";
import { useReservation } from "../hooks/useReservation";

import type { Reservation, UpdateReservation } from "../types/reservation";

type Props = {
  reservations: Reservation[];
  updateReservation: (
    id: number,
    reservation: UpdateReservation,
  ) => Promise<Reservation>;
};

export default function EditReservationPage({
  reservations,
  updateReservation,
}: Props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const { reservation, isLoading } = useReservation(id);

  if (isLoading) {
    return <div className="text-center text-slate-500">Loading...</div>;
  }

  if (!reservation) {
    return (
      <div className="text-center text-slate-500">Reservation not found.</div>
    );
  }

  return (
    <div className="mx-auto mt-5 max-w-2xl space-y-4">

      <NewReservationForm
        reservations={reservations}
        reservation={reservation}
        updateReservation={updateReservation}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
}
