import { Link, useParams } from "react-router-dom";
import { useReservation } from '../hooks/useReservation';


export default function ReservationDetailsPage( ) {
  const { id } = useParams();

  const { reservation, isLoading } = useReservation(id);

	if (isLoading) {
		return <div className='text-center text-slate-500'>Loading...</div>;
	}

	if (!reservation) {
		return <div>Reservation not found</div>;
	}


  return (
    <div className="bg-white rounded-xl shadow p-8">
      <Link
				to='/'
				className='text-sm text-brand-700 underline dark:text-emerald-300'>
				← Back to reservations
			</Link>

      <h1 className="text-3xl font-bold mb-6">{reservation.guestName}</h1>

      <p>Party Size: {reservation.partySize}</p>
      <p>Arrival: {reservation.arrivalTime}</p>
      <p>Table: {reservation.tableNumber}</p>
      <p>Status: {reservation.status}</p>
      <p>Notes: {reservation.notes}</p>
    </div>
  );
}
