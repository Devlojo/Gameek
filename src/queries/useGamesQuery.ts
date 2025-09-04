import { useQuery } from "@tanstack/react-query";
import {
  getLatestReleasesGames,
  getBestGames,
  getAllGames,
  getAllReleases,
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
    staleTime: 1000 * 60 * 60,
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

export const useGamesQuery = (
  page: number,
  genres?: number,
  platforms?: number,
) => {
  const {
    data: games,
    isLoading: isLoadingGames,
    isSuccess: isSuccessGames,
  } = useQuery({
    queryKey: ["games", page, genres, platforms],
    queryFn: () => getAllGames(page, genres, platforms),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  return {
    games,
    isLoadingGames,
    isSuccessGames,
  };
};

export const useGamesReleasesQuery = (
  page: number,
  genres?: number,
  platforms?: number,
  dates?: string,
) => {
  const {
    data: games,
    isLoading: isLoadingGames,
    isSuccess: isSuccessGames,
  } = useQuery({
    queryKey: ["games", page, genres, platforms, dates],
    queryFn: () => getAllReleases(page, genres, platforms, dates),
    staleTime: 1000 * 60 * 60,
  });
  return {
    games,
    isLoadingGames,
    isSuccessGames,
  };
};
