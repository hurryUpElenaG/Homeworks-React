import { useReducer, type ReactNode } from "react";
import NotificationOverlay from "../components/NotificationOverlay";
import {
  NotificationContext,
  type Notification,
  type NotificationType,
} from "./NotificationContextType";

export type { Notification, NotificationType };

type Action =
  | {
      type: "ADD";
      payload: Notification;
    }
  | {
      type: "REMOVE";
      payload: string;
    };

function reducer(
  state: Notification[],
  action: Action,
): Notification[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "REMOVE":
      return state.filter(
        (notification) =>
          notification.id !== action.payload,
      );

    default:
      return state;
  }
}

type Props = {
  children: ReactNode;
};

export function NotificationProvider({children}: Props) {
  const [notifications, dispatch] = useReducer(reducer, []);

  function notify(
    message: string,
    type: NotificationType,
  ) {
    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        message,
        type,
      },
    });
  }

  function dismiss(id: string) {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  }

  return (
    <NotificationContext.Provider
      value={{notifications, notify, dismiss}}>
      {children}

      <NotificationOverlay />
    </NotificationContext.Provider>
  );
}