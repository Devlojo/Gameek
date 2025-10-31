import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { apiUrl } from "../config";

export const useNotificationsSocket = (
  userId: number,
  onNewNotif: (notif: any) => void,
) => {
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io(apiUrl);
    socket.emit("register", userId); // on dit au serveur "voici mon id"
    //Envois une notification avec l'id de l'user connecté au serveur
    socket.on(`notification:${userId}`, (notif) => {
      console.log("🔔 Nouvelle notification :", notif);
      onNewNotif(notif);
    });

    return () => {
      socket.off(`notification:${userId}`);
    };
  }, [userId, onNewNotif]);
};
