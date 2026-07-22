import Dashboard from "../components/Dashboard";
import type { Reservation } from "../types/reservation";

type Props = {
  reservations: Reservation[];
};

export default function DashboardPage({ reservations }: Props) {
  return <Dashboard reservations={reservations} />;
}
