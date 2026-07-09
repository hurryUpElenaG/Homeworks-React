import { useForm } from "react-hook-form";
import type { CreateReservation, Reservation } from "../types/reservation";

type ReservationProps = {
  reservations: Reservation[];
  addReservation: (reservation: CreateReservation) => Promise<Reservation>;
};

type FormValues = {
  guestName: string;
  partySize: number;
  arrivalTime: string;
  tableNumber: number;
  notes?: string;
};

const DEFAULT_VALUES: FormValues = {
  guestName: "",
  partySize: 2,
  arrivalTime: "",
  tableNumber: 4,
  notes: "",
};

const ARRIVAL_TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const LABEL_CLASSES = "block text-sm font-medium text-slate-700";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

const ERROR_FIELD_CLASSES = "mt-1 text-xs text-red-600";

export default function NewReservationForm({
  reservations,
  addReservation,
}: ReservationProps) {
  //const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateReservation>({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const party = watch("partySize");

  async function onSubmit(data: CreateReservation) {
    await addReservation(data);
    reset(DEFAULT_VALUES);
  }

  return (
    <div className="bg-white border border-blue-300 p-6 rounded-xl shadow-sm mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-lg font-semibold text-blue-700 mb-6">
          Add a reservation
        </h2>

        {/* Guest */}

        <div>
          <label className={LABEL_CLASSES}>Guest name *</label>
          <input
            placeholder="Guest name"
            className={INPUT_CLASSES}
            {...register(
              "guestName",

              {
                required: "Guest name is required",

                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
              },
            )}
          />

          <p className={ERROR_FIELD_CLASSES}>{errors.guestName?.message}</p>
        </div>

        {/* Party */}

        <div>
          <label className={LABEL_CLASSES}>Party size *</label>
          <input
            type="number"
            placeholder="Party size"
            className={INPUT_CLASSES}
            {...register(
              "partySize",

              {
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
              },
            )}
          />

          <p className="text-sm text-blue-600">
            {party ? `Table for ${party}` : ""}
          </p>

          <p className={ERROR_FIELD_CLASSES}>{errors.partySize?.message}</p>
        </div>

        {/* Time */}

        <div>
          <label className={LABEL_CLASSES}>Arrival time *</label>
          <input
            placeholder="19:30"
            className={INPUT_CLASSES}
            {...register(
              "arrivalTime",

              {
                required: "Time required",
                pattern: {
                  value: ARRIVAL_TIME_PATTERN,
                  message: "Use HH:MM",
                },
              },
            )}
          />

          {errors.arrivalTime && (
            <p className={ERROR_FIELD_CLASSES}>{errors.arrivalTime?.message}</p>
          )}
        </div>

        {/* Table */}

        <div>
          <label className={LABEL_CLASSES}>Table number *</label>
          <input
            type="number"
            placeholder="Table number"
            className={INPUT_CLASSES}
            {...register(
              "tableNumber",

              {
                required: "Table required",

                min: {
                  value: 1,
                  message: "Min 1",
                },

                max: {
                  value: 20,
                  message: "Max 20",
                },

                validate: (value) =>
                  !reservations.find(
                    (reservation) =>
                      reservation.tableNumber === value &&
                      reservation.status !== "cancelled",
                  ) || "This table is already booked for the evening!",

                valueAsNumber: true,
              },
            )}
          />

          <p className={ERROR_FIELD_CLASSES}>{errors.tableNumber?.message}</p>
        </div>

        {/* Notes */}

        <div>
          <label className={LABEL_CLASSES}>Notes</label>
          <textarea rows={3} className={INPUT_CLASSES} {...register("notes")} />
        </div>

       <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
          >
            {isSubmitting
              ? "Adding..."
              : "Add Reservation"}
        </button>
      </form>
    </div>
  );
}
