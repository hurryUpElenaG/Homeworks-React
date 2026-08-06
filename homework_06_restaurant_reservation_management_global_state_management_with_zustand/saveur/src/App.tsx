import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import ReservationsPage from "./pages/ReservationsPage";
import DashboardPage from "./pages/DashboardPage";
import NewReservationPage from "./pages/NewReservationPage";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";
import EditReservationPage from "./pages/EditReservationPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ReservationsPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="reservations/new" element={<NewReservationPage />} />
        <Route path="reservations/:id" element={<ReservationDetailsPage />} />
        <Route path="reservations/:id/edit" element={<EditReservationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
