export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type Reservation = {
  id: number;
  guestName: string;
  partySize: number;
  arrivalTime: string;
  tableNumber: number;
  status: ReservationStatus;
  notes?: string;
};

export type CreateReservation = {
  guestName: string;
  partySize: number;
  arrivalTime: string;
  tableNumber: number;
  notes?: string;
};


export type UpdateReservation = Partial<CreateReservation> & {
  status?: ReservationStatus;
};


