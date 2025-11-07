import { useEffect } from "react";
import { socket } from "@/socket";

export const useNotificationsSocket = (
  userId: number,
  onNewNotif: (notif: any) => void,
  onUpdateNotifCount: (count: number) => void,
) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit("register", userId); // on envois un evenement register au serveur avec l'id de l'utilisateur
    // Fonction qui sera appelée quand l'événement 'updateNotificationCount' est reçu
    const handleUpdateCount = ({ totalUnread }: { totalUnread: number }) => {
      // On appelle le callback fourni par le composant pour mettre à jour le state local ou la query
      onUpdateNotifCount(totalUnread);
    };
    //Le client écoute les notifications du serveur de sa room "notification:${userId}"
    socket.on(`notification:${userId}`, (notif) => {
      onNewNotif(notif);
    });

    socket.on(`updateNotificationCount`, handleUpdateCount);

    return () => {
      socket.off(`notification:${userId}`);
      socket.off(`updateNotificationCount`, handleUpdateCount);
    };
  }, [userId, onNewNotif, onUpdateNotifCount]);
};
