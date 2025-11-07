import { useEffect } from "react";
import { socket } from "@/socket";

export const useLikesSocket = (
  onUpdateLike: (reviewId: number, LikeChange: number) => void,
) => {
  useEffect(() => {
    // Fonction qui sera appelée quand l'événement 'updateLikes' est reçu
    const handleUpdate = ({
      reviewId,
      likeChange,
    }: {
      reviewId: number;
      likeChange: number;
    }) => {
      // On appelle le callback fourni par le composant pour mettre à jour le state local ou la query
      onUpdateLike(reviewId, likeChange);
    };

    // Abonnement à l'événement 'updateLikes' envoyé par le serveur
    socket.on("updateLikes", handleUpdate);

    // Nettoyage : on désabonne l'événement quand le composant se démonte
    return () => {
      socket.off("updateLikes", handleUpdate);
    };
  }, [onUpdateLike]); // Le useEffect se réexécutera uniquement si la fonction onUpdateLike change
};
