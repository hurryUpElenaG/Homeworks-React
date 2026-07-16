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

export type ReservationResponse = {
  data: Reservation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

export type SortBy = 'createdAt' | 'arrivalTime' | 'gusetName' | 'partySize';
export type SortDirection = 'ASC' | 'DESC';

export type ReservationsQueryParams = {
  search?: string;
  status: ReservationStatus;
  sortBy?: SortBy;
  sortOrder?: SortDirection;
	page?: number;
	limit?: number;
};


  