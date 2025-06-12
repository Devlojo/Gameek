import { useQuery } from "@tanstack/react-query";
import {
  getLatestReleasesGames,
  getBestGames,
  getLatestReviews,
} from "@/api/gamesApi";

export const useLatestGamesQuery = () => {
  const {
    data: latestGames,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["latestGames"],
    queryFn: () => getLatestReleasesGames(),
    retry: false,
  });
  return {
    latestGames,
    isLoading,
    isSuccess,
  };
};

export const useBestGamesQuery = () => {
  const {
    data: bestGames,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["bestGames"],
    queryFn: () => getBestGames(),
    retry: false,
  });
  return {
    bestGames,
    isLoading,
    isSuccess,
  };
};

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
