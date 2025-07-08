import { useQuery } from "@tanstack/react-query";
import { getGameDetail } from "@/api/gamesApi";

export const useGameDetailQuery = (game: string | undefined) => {
  const {
    data: gameDetail,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["game", game],
    queryFn: () => getGameDetail(game as string),
    retry: false,
    enabled: !!game,
  });
  return { gameDetail, isLoading, isSuccess };
};
