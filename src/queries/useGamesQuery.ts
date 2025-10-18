import { useQuery } from "@tanstack/react-query";
import {
  getLatestReleasesGames,
  getBestGames,
  getAllGames,
  getAllReleases,
  getAllGamesFromSeries,
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
  genres?: string,
  platforms?: string,
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
  year: string,
  month: string,
  genres?: string,
  platforms?: string,
) => {
  const {
    data: games,
    isLoading: isLoadingGames,
    isSuccess: isSuccessGames,
  } = useQuery({
    queryKey: ["games", page, year, month, genres, platforms],
    queryFn: () => getAllReleases(page, year, month, genres, platforms),
    staleTime: 1000 * 60 * 60,
  });
  return {
    games,
    isLoadingGames,
    isSuccessGames,
  };
};

export const useAllGamesFromSeriesQuery = (game: string) => {
  const {
    data: seriesGames,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["seriesGames", game],
    queryFn: () => getAllGamesFromSeries(game),
    enabled: !!game,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  return {
    seriesGames,
    isLoading,
    isSuccess,
  };
};
