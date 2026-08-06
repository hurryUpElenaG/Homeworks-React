import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useReservationStore } from "../store/reservationStore";

import type { CreateReservation, Reservation } from "../types/reservation";

type ReservationProps = {
  reservation?: Reservation;
  onSuccess?: () => void;
  onClose?: () => void;
};

type FormValues = {
  guestName: string;
  partySize: number;
  arrivalTime: string;
  tableNumber: number;
  notes?: string;
};

function toFormValues(reservation?: Reservation): FormValues {
  return {
    guestName: reservation?.guestName ?? "",
    partySize: reservation?.partySize ?? 2,
    arrivalTime: reservation?.arrivalTime ?? "",
    tableNumber: reservation?.tableNumber ?? 4,
    notes: reservation?.notes ?? "",
  };
}

const ARRIVAL_TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const LABEL_CLASSES = "block text-sm font-medium text-slate-700";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const ERROR_FIELD_CLASSES = "mt-1 text-xs text-red-600";

export default function NewReservationForm({
  reservation,
  onSuccess,
  onClose,
}: ReservationProps) {
  const isEditing = !!reservation;

  // ============================
  // ZUSTAND
  // ============================

  const addReservation = useReservationStore((state) => state.addReservation);

  const updateReservation = useReservationStore(
    (state) => state.updateReservation,
  );

  const allReservations = useReservationStore((state) => state.allReservations);

  // ============================
  // FORM
  // ============================

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: toFormValues(reservation),
    mode: "onChange",
  });

  useEffect(() => {
    reset(toFormValues(reservation));
    trigger();
  }, [reservation, reset, trigger]);

  const party = watch("partySize");

  // ============================
  // SUBMIT
  // ============================

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CreateReservation = {
        guestName: data.guestName,
        partySize: data.partySize,
        arrivalTime: data.arrivalTime,
        tableNumber: data.tableNumber,
        notes: data.notes,
      };

      if (isEditing) {
        await updateReservation(reservation!.id, payload);

        onClose?.();
      } else {
        await addReservation(payload);
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border border-blue-300 p-6 rounded-xl shadow-sm mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-lg font-semibold text-blue-700 mb-6">
          {isEditing ? "Edit reservation" : "Add a reservation"}
        </h2>

        {/* Guest */}

        <div>
          <label className={LABEL_CLASSES}>Guest name *</label>

          <input
            placeholder="Guest name"
            className={INPUT_CLASSES}
            {...register("guestName", {
              required: "Guest name is required",

              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
          />

          <p className={ERROR_FIELD_CLASSES}>{errors.guestName?.message}</p>
        </div>

        {/* Party Size */}

        <div>
          <label className={LABEL_CLASSES}>Party size *</label>

          <input
            type="number"
            placeholder="Party size"
            className={INPUT_CLASSES}
            {...register("partySize", {
              required: "Party size required",

              min: {
                value: 1,
                message: "Minimum 1",
              },

              max: {
                value: 20,
                message: "Maximum 20",
              },

              valueAsNumber: true,
            })}
          />

          <p className="text-sm text-blue-600">
            {party ? `Table for ${party}` : ""}
          </p>

          <p className={ERROR_FIELD_CLASSES}>{errors.partySize?.message}</p>
        </div>

        {/* Arrival Time */}

        <div>
          <label className={LABEL_CLASSES}>Arrival time *</label>

          <input
            placeholder="19:30"
            className={INPUT_CLASSES}
            {...register("arrivalTime", {
              required: "Time required",

              pattern: {
                value: ARRIVAL_TIME_PATTERN,
                message: "Use HH:MM",
              },
            })}
          />

          <p className={ERROR_FIELD_CLASSES}>{errors.arrivalTime?.message}</p>
        </div>

        {/* Table Number */}

        <div>
          <label className={LABEL_CLASSES}>Table number *</label>

          <input
            type="number"
            placeholder="Table number"
            className={INPUT_CLASSES}
            {...register("tableNumber", {
              required: "Table required",

              min: {
                value: 1,
                message: "Minimum 1",
              },

              max: {
                value: 20,
                message: "Maximum 20",
              },

              valueAsNumber: true,

              validate: (value) =>
                !allReservations.some(
                  (r) =>
                    r.tableNumber === value &&
                    r.status !== "cancelled" &&
                    r.id !== reservation?.id,
                ) || "This table is already booked for the evening!",
            })}
          />

          <p className={ERROR_FIELD_CLASSES}>{errors.tableNumber?.message}</p>
        </div>

        {/* Notes */}

        <div>
          <label className={LABEL_CLASSES}>Notes</label>

          <textarea rows={3} className={INPUT_CLASSES} {...register("notes")} />
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-lg"
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save changes"
                : "Save reservation"}
          </button>
        </div>
      </form>
    </div>
  );
}
