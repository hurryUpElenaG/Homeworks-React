export type ReservationStatus = "Pending" | "Confirmed" | "Cancelled";

export type Reservation = {
  id: string;
  guestName: string;
  partySize: number;
  arrivalTime: string;
  assignedTable: number;
  status: ReservationStatus;
  notes?: string;
};
