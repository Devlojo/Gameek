import { useQuery } from "@tanstack/react-query";
import { getAllPlatforms } from "@/api/platformsApi";

export const usePlatformsQuery = () => {
  const {
    data: platforms,
    isLoading: isLoadingPlatforms,
    isSuccess: isSuccessPlatforms,
  } = useQuery({
    queryKey: ["platforms"],
    queryFn: () => getAllPlatforms(),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  return {
    platforms,
    isLoadingPlatforms,
    isSuccessPlatforms,
  };
};
