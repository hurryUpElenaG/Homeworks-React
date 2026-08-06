import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  fetchReservations as fetchReservationsApi,
  fetchAllReservations as fetchAllReservationsApi,
  fetchReservation as fetchReservationApi,
  createReservation,
  updateReservation as updateReservationApi,
  deleteReservation,
} from "../lib/api";

import type {
  Reservation,
  ReservationResponse,
  ReservationStatus,
  CreateReservation,
  UpdateReservation,
  SortBy,
  SortDirection,
} from "../types/reservation";

export type StatusFilter = "all" | ReservationStatus;

export type ReservationStore = {
  // ============================
  // STATE
  // ============================

  reservations: Reservation[];
  allReservations: Reservation[];

  selectedReservation: Reservation | null;

  isLoading: boolean;
  error: string | null;

  search: string;
  statusFilter: StatusFilter;

  sortBy: SortBy;
  sortOrder: SortDirection;

  page: number;
  totalPages: number;

  // ============================
  // ACTIONS
  // ============================

  fetchReservations: () => Promise<void>;
  fetchAllReservations: () => Promise<void>;
  fetchReservation: (id: number) => Promise<void>;
  refreshReservations: () => Promise<void>;

  addReservation: (
    reservation: CreateReservation,
  ) => Promise<Reservation | null>;

  updateReservation: (
    id: number,
    reservation: UpdateReservation,
  ) => Promise<Reservation | null>;

  cancelReservation: (id: number) => Promise<boolean>;

  // ============================
  // SETTERS
  // ============================

  setSearch: (search: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortDirection) => void;
  setPage: (page: number) => void;
};

export const useReservationStore = create<ReservationStore>()(
  devtools(
      (set, get) => ({
        // ============================
        // INITIAL STATE
        // ============================

        reservations: [],
        allReservations: [],
        selectedReservation: null,

        isLoading: false,
        error: null,

        search: "",
        statusFilter: "all",

        sortBy: "createdAt",
        sortOrder: "ASC",

        page: 1,
        totalPages: 1,

        // ============================
        // SETTERS
        // ============================

        setSearch: (search) =>
          set({
            search,
            page: 1,
          }),

        setStatusFilter: (statusFilter) =>
          set({
            statusFilter,
            page: 1,
          }),

        setSortBy: (sortBy) =>
          set({
            sortBy,
            page: 1,
          }),

        setSortOrder: (sortOrder) =>
          set({
            sortOrder,
            page: 1,
          }),

        setPage: (page) =>
          set({
            page,
          }),

        // ============================
        // FETCH PAGED RESERVATIONS
        // ============================

        fetchReservations: async () => {
          const { search, statusFilter, sortBy, sortOrder, page } = get();

          set({
            isLoading: true,
            error: null,
          });

          try {
            const response: ReservationResponse = await fetchReservationsApi(
              search,
              statusFilter,
              sortBy,
              sortOrder,
              page,
              10,
            );

            set({
              reservations: response.data,
              totalPages: response.totalPages,
              isLoading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to load reservations.",

              isLoading: false,
            });
          }
        },

        // ============================
        // FETCH ALL RESERVATIONS
        // ============================

        fetchAllReservations: async () => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const reservations = await fetchAllReservationsApi();

            set({
              allReservations: reservations,
              isLoading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to load reservations.",

              isLoading: false,
            });
          }
        },

        // ============================
        // FETCH SINGLE RESERVATION
        // ============================

        fetchReservation: async (id: number) => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const reservation = await fetchReservationApi(id.toString());

            set({
              selectedReservation: reservation,
              isLoading: false,
            });
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to load reservation.",

              selectedReservation: null,

              isLoading: false,
            });
          }
        },

        // ============================
        // REFRESH
        // ============================

        refreshReservations: async () => {
          await get().fetchReservations();
          await get().fetchAllReservations();
        },

        // ============================
        // CREATE
        // ============================

        addReservation: async (reservation) => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const created = await createReservation(reservation);

            set({
              selectedReservation: created,
            });

            // Reload paginated list and dashboard data
            await get().refreshReservations();

            set({
              isLoading: false,
            });

            return created;
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to create reservation.",

              isLoading: false,
            });

            return null;
          }
        },

        // ============================
        // UPDATE
        // ============================

        updateReservation: async (id, reservation) => {
          set({
            isLoading: true,
            error: null,
          });

          try {
            const updated = await updateReservationApi(id, reservation);

            set({
              selectedReservation: updated,
            });

            // Reload paginated list and dashboard data
            await get().refreshReservations();

            set({
              isLoading: false,
            });

            return updated;
          } catch (error) {
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to update reservation.",

              isLoading: false,
            });

            return null;
          }
        },

        // ============================
        // DELETE (Optimistic Update)
        // ============================

        cancelReservation: async (id) => {
          const previousReservations = get().reservations;
          const previousAllReservations = get().allReservations;
          const previousSelectedReservation = get().selectedReservation;

          set({
            isLoading: true,
            error: null,
          });

          // Optimistic update
          set((state) => ({
            reservations: state.reservations.filter(
              (reservation) => reservation.id !== id,
            ),

            allReservations: state.allReservations.filter(
              (reservation) => reservation.id !== id,
            ),

            selectedReservation:
              state.selectedReservation?.id === id
                ? null
                : state.selectedReservation,
          }));

          try {
            await deleteReservation(id);

            // Reload paginated list and dashboard data
            await get().refreshReservations();

            set({
              isLoading: false,
            });

            return true;
          } catch (error) {
            // Rollback
            set({
              reservations: previousReservations,
              allReservations: previousAllReservations,
              selectedReservation: previousSelectedReservation,

              isLoading: false,

              error:
                error instanceof Error
                  ? error.message
                  : "Failed to delete reservation.",
            });

            return false;
          }
        },
      }),
      {
        name: "Reservation Store",
      },
    ),
);
