import { useQuery } from "@tanstack/react-query";
import {
  getLatestReviews,
  getReviewDetail,
  getReviewsByGame,
} from "@/api/reviewsApi";

export const useLatestReviewsQuery = () => {
  const {
    data: latestReviews,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: () => getLatestReviews(),
    retry: false,
  });
  return {
    latestReviews,
    isLoading,
    isSuccess,
  };
};

export const useReviewDetailQuery = (gameSlug: string, userName: string) => {
  const {
    data: reviewDetail,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["reviewDetail", gameSlug, userName],
    queryFn: () => getReviewDetail(gameSlug, userName),
    retry: false,
  });
  return {
    reviewDetail,
    isLoading,
    isSuccess,
  };
};

export const useReviewsByGameQuery = (gameSlug: string) => {
  const {
    data: reviewsByGame,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["reviewsByGame", gameSlug],
    queryFn: () => getReviewsByGame(gameSlug),
    retry: false,
  });
  return {
    reviewsByGame,
    isLoading,
    isSuccess,
    isError,
  };
};
