import { useEffect } from "react";
import { socket } from "@/socket";

export const useNotificationsSocket = (
  userId: number,
  onNewNotif: (notif: any) => void,
) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit("register", userId); // on envois un evenement register au serveur avec l'id de l'utilisateur

    //Le client écoute les notifications du serveur de l'évènement "notification:${userId}" si le user connecté est bien le destinataire de la notif
    socket.on(`notification:${userId}`, (notif) => {
      onNewNotif(notif);
    });

    return () => {
      socket.off(`notification:${userId}`);
    };
  }, [userId, onNewNotif]);
};
