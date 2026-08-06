import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NewReservationForm from "../components/NewReservationForm";

import { useReservationStore } from "../store/reservationStore";

export default function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reservation = useReservationStore((state) => state.selectedReservation);

  const isLoading = useReservationStore((state) => state.isLoading);

  const fetchReservation = useReservationStore(
    (state) => state.fetchReservation,
  );

  useEffect(() => {
    if (id) {
      void fetchReservation(Number(id));
    }
  }, [id, fetchReservation]);

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
        reservation={reservation}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
}
