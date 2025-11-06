// Custom hooks
import { useContext } from "react";
import { NotificationCountContext } from "@/context/NotificationCountContext";

export const useNotificationCount = () => {
  const context = useContext(NotificationCountContext);
  if (!context) {
    throw new Error(
      "useNotificationCount doit être utilisé dans un <UserProvider>",
    );
  }
  return context;
};
