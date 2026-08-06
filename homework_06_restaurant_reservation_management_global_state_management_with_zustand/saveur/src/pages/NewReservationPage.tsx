import { useNavigate } from "react-router-dom";

import NewReservationForm from "../components/NewReservationForm";

export default function NewReservationPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">New Reservation</h2>

      <NewReservationForm onSuccess={() => navigate("/")} />
    </div>
  );
}
