import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "@/api/genresApi";

export const useGenresQuery = () => {
  const {
    data: genres,
    isLoading: isLoadingGenres,
    isSuccess: isSuccessGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getAllGenres(),
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  return {
    genres,
    isLoadingGenres,
    isSuccessGenres,
  };
};
