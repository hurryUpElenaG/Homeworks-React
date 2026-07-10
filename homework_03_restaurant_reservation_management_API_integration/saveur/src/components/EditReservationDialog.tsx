import type { Reservation, UpdateReservation } from "../types/reservation";
import NewReservationForm from "./NewReservationForm";
import { Dialog, DialogContent } from "./ui/dialog";

type Props = {
  reservation: Reservation;
  reservations: Reservation[];

  updateReservation: (
    id: number,
    data: UpdateReservation,
  ) => Promise<Reservation>;

  onClose: () => void;
  onSuccess: () => void;
};

export default function EditReservationDialog({
  reservation,
  reservations,
  updateReservation,
  onClose,
  onSuccess,
}: Props) {
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Edit Reservation
        </h2>

        <NewReservationForm
          reservations={reservations}
          reservation={reservation}
          updateReservation={updateReservation}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
