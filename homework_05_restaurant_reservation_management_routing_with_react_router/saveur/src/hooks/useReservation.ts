import { useEffect, useState } from "react";
import { fetchReservation } from "../lib/api";
import type { Reservation } from "../types/reservation";

export function useReservation(id: string | undefined) {
	const [reservation, setReservation] = useState<Reservation | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
	
		if (!id) {
			return;
		}
		
		setIsLoading(true);
		fetchReservation(id)
			.then(reservation => setReservation(reservation))
			.catch(() => {
				console.log('something is wrong!');
			})
			.finally(() => setIsLoading(false));
		
	}, [id]);

	return {
		reservation,
		isLoading,
	};
}
