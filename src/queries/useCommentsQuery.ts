import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  deleteCommentById,
  getAllCommentsByReview,
  reportCommentById,
} from "@/api/commentsApi";
import { TCommentForm } from "@/types/comment";

export const useCommentsByReview = (gameSlug: string, userName: string) => {
  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["comments", gameSlug, userName],
    queryFn: () => getAllCommentsByReview(gameSlug, userName),
    retry: false,
  });
  return {
    comments,
    isLoading,
    isSuccess,
  };
};

export const useAddComment = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newComment: TCommentForm) => addComment(newComment),
    onSuccess: () => {
      // Rafraîchit automatiquement les commentaires après ajout
      queryClient.invalidateQueries({
        queryKey: ["comments", gameSlug, userName],
      });
    },
  });
  return mutation;
};

export const useDeleteCommentById = (gameSlug: string, userName: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteCommentById(id),
    onSuccess: () => {
      // Rafraîchit automatiquement les commentaires après ajout
      queryClient.invalidateQueries({
        queryKey: ["comments", gameSlug, userName],
      });
    },
  });
  return mutation;
};

export const useReportCommentById = () => {
  return useMutation({
    mutationFn: (id: number) => reportCommentById(id),
  });
};
