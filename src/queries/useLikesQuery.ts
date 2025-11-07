import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/api/likesApi";
import { TLike } from "@/types/like";
import { socket } from "@/socket";

export const useToggleLike = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    // lance la requete et retourne la réponse du serveur
    mutationFn: async (newLike: TLike) => {
      // 1️⃣ Appel de l'API pour toggle le like
      const res = await toggleLike(newLike);
      // ⚡ Notifie le serveur que le like a changé
      socket.emit("toggleLike", {
        reviewId: newLike.review_id,
      });
      return res;
    },

    // Fonction qui sera toujours exécutée
    onSettled: () => {
      // Rafraîchit la review pour synchroniser avec la base
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", gameSlug, userName],
      });

      // Rafraîchit aussi la liste des derniers reviews
      queryClient.invalidateQueries({
        queryKey: ["latestReviews"],
      });

      // Rafraîchit aussi la liste reviews par jeu
      queryClient.invalidateQueries({
        queryKey: ["reviewsByGame", gameSlug],
      });

      // Rafraîchit aussi la liste des reviews
      queryClient.invalidateQueries({
        queryKey: ["reviewsFiltered"],
      });
    },
  });

  return mutation;
};
