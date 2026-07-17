import { createContext } from "react";

export type NotificationType = "success" | "error" | "info";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notifications: Notification[];
  notify: (
    message: string,
    type: NotificationType,
  ) => void;
  dismiss: (id: string) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
