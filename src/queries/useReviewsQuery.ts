import { useQuery } from "@tanstack/react-query";
import {
  getLatestReviews,
  getReviewDetail,
  getReviewsByGame,
  getAllReviews,
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
    isError,
  } = useQuery({
    queryKey: ["reviewDetail", gameSlug, userName],
    queryFn: () => getReviewDetail(gameSlug, userName),
    retry: false,
  });
  return {
    reviewDetail,
    isLoading,
    isSuccess,
    isError,
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

export const useReviewsByFilter = (
  page: number,
  reviewer?: string,
  genres?: number,
  platforms?: number,
  grade?: number,
) => {
  const {
    data: reviewsFiltered,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["reviewsFiltered", page, reviewer, genres, platforms, grade],
    queryFn: () => getAllReviews(page, reviewer, genres, platforms, grade),
    retry: false,
  });
  return {
    reviewsFiltered,
    isLoading,
    isSuccess,
    isError,
  };
};
