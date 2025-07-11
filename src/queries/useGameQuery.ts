import { useQuery } from "@tanstack/react-query";
import {
  getGameDetail,
  getGameScreenshots,
  getGameVideos,
} from "@/api/gamesApi";

export const useGameDetailQuery = (game: string | undefined) => {
  const {
    data: gameDetail,
    isLoading,
    isSuccess: isSuccessGameDetail,
    isError,
  } = useQuery({
    queryKey: ["game", game],
    queryFn: () => getGameDetail(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameDetail, isLoading, isSuccessGameDetail, isError };
};

export const useGameScreenshotsQuery = (game: string | undefined) => {
  const {
    data: gameScreenshots,
    isLoading: isLoadingGameScreenshots,
    isSuccess: isSuccessGameScreenshots,
    isError,
  } = useQuery({
    queryKey: ["screenshots", game],
    queryFn: () => getGameScreenshots(game as string),
    retry: false,
    enabled: !!game,
  });
  return {
    gameScreenshots,
    isLoadingGameScreenshots,
    isSuccessGameScreenshots,
    isError,
  };
};

export const useGameVideosQuery = (game: string | undefined) => {
  const {
    data: gameVideos,
    isLoading: isLoadingGameVideos,
    isSuccess: isSuccessGameVideos,
    isError,
  } = useQuery({
    queryKey: ["videos", game],
    queryFn: () => getGameVideos(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameVideos, isLoadingGameVideos, isSuccessGameVideos, isError };
};
