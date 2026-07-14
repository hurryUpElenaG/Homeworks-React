import {createContext, useReducer, type ReactNode} from "react";
import NotificationOverlay from "../components/NotificationOverlay";

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