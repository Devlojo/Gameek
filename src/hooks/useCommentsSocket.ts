import { useEffect } from "react";
import { socket } from "@/socket";
import { TCommentFull } from "@/types/comment";

export const useCommentsSocket = (
  onUpdateComment: (review_id: number, commentChange: number) => void,
  onAddNewComment?: (fullcomment: TCommentFull) => void,
) => {
  useEffect(() => {
    // Fonction qui sera appelée quand l'événement 'updateCommentsCount' est reçu
    const handleUpdateCount = ({
      review_id,
      commentChange,
    }: {
      review_id: number;
      commentChange: number;
    }) => {
      // On appelle le callback fourni par le composant pour mettre à jour le state local ou la query
      onUpdateComment(review_id, commentChange);
    };

    const handleNewComment = (fullComment: TCommentFull) => {
      // ici tu peux ajouter fullComment au cache ou à la liste
      if (onAddNewComment) onAddNewComment(fullComment);
    };

    // Abonnement à l'événement 'updateCommentsCount' envoyé par le serveur
    socket.on("updateCommentsCount", handleUpdateCount);
    socket.on("newComment", handleNewComment);

    // Nettoyage : on désabonne l'événement quand le composant se démonte
    return () => {
      socket.off("updateCommentsCount", handleUpdateCount);
      socket.off("newComment", handleNewComment);
    };
  }, [onUpdateComment, onAddNewComment]); // Le useEffect se réexécutera uniquement si la fonction onUpdateComment change
};
