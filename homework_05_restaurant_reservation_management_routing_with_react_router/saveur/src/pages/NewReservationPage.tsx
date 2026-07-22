import { useNavigate } from "react-router-dom";

import NewReservationForm from "../components/NewReservationForm";
import type { CreateReservation, Reservation } from "../types/reservation";

type Props = {
  reservations: Reservation[];
  createReservation: (reservation: CreateReservation) => Promise<Reservation>;
};

export default function NewReservationPage({
  reservations,
  createReservation,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">New Reservation</h2>

      <NewReservationForm
        reservations={reservations}
        createReservation={createReservation}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
}
