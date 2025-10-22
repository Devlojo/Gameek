import { useQuery } from "@tanstack/react-query";
import { getAllCommentsByReview } from "@/api/commentsApi";

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
