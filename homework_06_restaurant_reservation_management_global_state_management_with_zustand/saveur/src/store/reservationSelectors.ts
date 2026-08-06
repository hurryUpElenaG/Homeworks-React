import type { ReservationStatus } from "../types/reservation";
import type { ReservationStore } from "./reservationStore";

/**
 * Current page reservations
 */
export const selectReservations = (state: ReservationStore) =>
  state.reservations;

/**
 * All reservations (used by Dashboard)
 */
export const selectAllReservations = (state: ReservationStore) =>
  state.allReservations;

/**
 * Select Reservation (used by ReservationDetailsPage)
 */
export const selectSelectedReservation = (state: ReservationStore) =>
  state.selectedReservation;

/**
 * Loading state
 */
export const selectIsLoading = (state: ReservationStore) => state.isLoading;

/**
 * Error message
 */
export const selectError = (state: ReservationStore) => state.error;

/**
 * Search text
 */
export const selectSearch = (state: ReservationStore) => state.search;

/**
 * Current filter
 */
export const selectStatusFilter = (state: ReservationStore) =>
  state.statusFilter;

/**
 * Current page
 */
export const selectPage = (state: ReservationStore) => state.page;

/**
 * Total pages
 */
export const selectTotalPages = (state: ReservationStore) => state.totalPages;

/**
 * Sort field
 */
export const selectSortBy = (state: ReservationStore) => state.sortBy;

/**
 * Sort direction
 */
export const selectSortOrder = (state: ReservationStore) => state.sortOrder;

/**
 * Returns reservations already filtered.
 */
export const selectFilteredReservations = (state: ReservationStore) =>
  state.reservations;

/**
 * Reservations by status.
 */
export const selectByStatus =
  (status: ReservationStatus) => (state: ReservationStore) =>
    state.allReservations.filter(
      (reservation) => reservation.status === status,
    );

/**
 * Sum of confirmed guests.
 */
export const selectTotalConfirmedGuests = (state: ReservationStore) =>
  state.allReservations
    .filter((reservation) => reservation.status === "confirmed")
    .reduce((total, reservation) => total + reservation.partySize, 0);

/**
 * Dashboard
 */
export const selectPendingCount = (state: ReservationStore) =>
  state.allReservations.filter(
    (reservation) => reservation.status === "pending",
  ).length;

export const selectConfirmedCount = (state: ReservationStore) =>
  state.allReservations.filter(
    (reservation) => reservation.status === "confirmed",
  ).length;

export const selectCancelledCount = (state: ReservationStore) =>
  state.allReservations.filter(
    (reservation) => reservation.status === "cancelled",
  ).length;

export const selectTotalReservations = (state: ReservationStore) =>
  state.allReservations.length;
