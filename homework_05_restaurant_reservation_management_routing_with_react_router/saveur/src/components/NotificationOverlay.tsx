import { useNotifications } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationOverlay() {
  const { notifications } = useNotifications();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id} notification={notification}
        />
      ))}
    </div>
  );
}