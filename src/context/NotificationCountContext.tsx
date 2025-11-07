import { ReactNode, createContext, useState } from "react";

type TNotificationCountContext = {
  notifCount: number;
  setNotifCount: React.Dispatch<React.SetStateAction<number>>;
};

type TNotificationCountProviderProps = {
  children: ReactNode;
};

export const NotificationCountContext =
  createContext<TNotificationCountContext | null>(null);

export const NotificationCountProvider = ({
  children,
}: TNotificationCountProviderProps) => {
  const [notifCount, setNotifCount] = useState(0);

  return (
    <NotificationCountContext.Provider value={{ notifCount, setNotifCount }}>
      {children}
    </NotificationCountContext.Provider>
  );
};
