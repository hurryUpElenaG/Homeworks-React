import { useEffect } from "react";
import { type Notification} from "../context/NotificationContext";
import { useNotifications } from "../hooks/useNotifications";

type Props = {
  notification: Notification;
};

export default function NotificationItem({notification}: Props) {
  const { dismiss } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss(notification.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [dismiss, notification.id]);

  const background =
    notification.type === "success"
      ? "bg-green-600"
      : notification.type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div
      className={`${background} pointer-events-auto text-white rounded-lg shadow-lg p-4 flex items-center justify-between gap-4 min-w-[320px]`}
    >
      <p>{notification.message}</p>

      <button
        onClick={() => dismiss(notification.id)} className="font-bold"
      >
        ✕
      </button>
    </div>
  );
}