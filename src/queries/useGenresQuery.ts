import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "@/api/genresApi";

export const useGenresQuery = () => {
  const {
    data: genres,
    isLoading: isLoadingGenres,
    isSuccess,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getAllGenres(),
    retry: false,
  });
  return {
    genres,
    isLoadingGenres,
    isSuccess,
  };
};
