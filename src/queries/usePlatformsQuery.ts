import { useQuery } from "@tanstack/react-query";
import { getAllPlatforms } from "@/api/platformsApi";

export const usePlatformsQuery = () => {
  const {
    data: platforms,
    isLoading: isLoadingPlatforms,
    isSuccess,
  } = useQuery({
    queryKey: ["platforms"],
    queryFn: () => getAllPlatforms(),
    retry: false,
  });
  return {
    platforms,
    isLoadingPlatforms,
    isSuccess,
  };
};
