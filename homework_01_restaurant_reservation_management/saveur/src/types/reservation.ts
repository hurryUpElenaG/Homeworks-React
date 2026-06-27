export type ReservationStatus = "Pending" | "Confirmed" | "Cancelled";

export type Reservation = {
  id: number;
  guestName: string;
  partySize: number;
  arrivalTime: string;
  assignedTable: number;
  status: ReservationStatus;
  notes?: string;
};
