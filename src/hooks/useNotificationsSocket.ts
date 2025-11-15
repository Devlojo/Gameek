import { useEffect } from "react";
import { socket } from "@/socket";
import { useNotificationCount } from "./useNotificationCount";

export const useNotificationsSocket = (
  userId: number,
  onNewNotif: (notif: any) => void,
) => {
  const { setNotifCount } = useNotificationCount();
  useEffect(() => {
    if (!userId) return;

    // Écoute du compteur initial
    socket.on("initialUnreadCount", (totalUnread: number) => {
      setNotifCount(totalUnread); // valeur initiale au login
    });

    //Le client écoute les notifications du serveur de sa room "notification:${userId}"
    socket.on(`notification:${userId}`, (notif) => {
      onNewNotif(notif);
      setNotifCount((prev) => prev + 1); // incrémente live
    });

    socket.emit("register", userId);

    return () => {
      socket.off("initialUnreadCount");
      socket.off(`notification:${userId}`);
    };
  }, [userId, onNewNotif, setNotifCount]);
};
