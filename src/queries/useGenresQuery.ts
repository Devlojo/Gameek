import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "@/api/genresApi";

export const useGenresQuery = () => {
  const {
    data: genres,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getAllGenres(),
    retry: false,
  });
  return {
    genres,
    isLoading,
    isSuccess,
  };
};
