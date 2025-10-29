import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLikeById } from "@/api/likesApi";
import { TLike } from "@/types/like";

export const useAddLike = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newLike: TLike) => addLike(newLike),
    onSuccess: () => {
      // Rafraîchit automatiquement les commentaires après ajout
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", gameSlug, userName],
      });
    },
  });
  return mutation;
};

export const useRemoveLikeById = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => removeLikeById(id),
    onSuccess: () => {
      // Rafraîchit automatiquement les commentaires après ajout
      queryClient.invalidateQueries({
        queryKey: ["comments", gameSlug, userName],
      });
    },
  });
  return mutation;
};
