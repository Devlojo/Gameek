import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/api/likesApi";
import { TLike } from "@/types/like";

export const useToggleLike = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newLike: TLike) => toggleLike(newLike),
    onSuccess: () => {
      // Rafraîchit automatiquement les commentaires après ajout
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", gameSlug, userName],
      });
    },
  });
  return mutation;
};
