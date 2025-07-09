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
  } = useQuery({
    queryKey: ["game", game],
    queryFn: () => getGameDetail(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameDetail, isLoading, isSuccessGameDetail };
};

export const useGameScreenshotsQuery = (game: string | undefined) => {
  const {
    data: gameScreenshots,
    isLoading,
    isSuccess: isSuccessGameScreenshots,
  } = useQuery({
    queryKey: ["screenshots", game],
    queryFn: () => getGameScreenshots(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameScreenshots, isLoading, isSuccessGameScreenshots };
};

export const useGameVideosQuery = (game: string | undefined) => {
  const {
    data: gameVideos,
    isLoading,
    isSuccess: isSuccessGameVideos,
  } = useQuery({
    queryKey: ["videos", game],
    queryFn: () => getGameVideos(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameVideos, isLoading, isSuccessGameVideos };
};
