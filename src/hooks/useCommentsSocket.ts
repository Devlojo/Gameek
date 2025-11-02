import { useEffect } from "react";
import { socket } from "@/socket";

export const useCommentsSocket = (
  onUpdateComment: (commentId: number, CommentChange: number) => void,
) => {
  useEffect(() => {
    // Fonction qui sera appelée quand l'événement 'updateCommentsCount' est reçu
    const handleUpdate = ({
      commentId,
      CommentChange,
    }: {
      commentId: number;
      CommentChange: number;
    }) => {
      // On appelle le callback fourni par le composant pour mettre à jour le state local ou la query
      onUpdateComment(commentId, CommentChange);
    };

    // Abonnement à l'événement 'updateCommentsCount' envoyé par le serveur
    socket.on("updateCommentsCount", handleUpdate);

    // Nettoyage : on désabonne l'événement quand le composant se démonte
    return () => {
      socket.off("updateCommentsCount", handleUpdate);
    };
  }, [onUpdateComment]); // Le useEffect se réexécutera uniquement si la fonction onUpdateComment change
};
