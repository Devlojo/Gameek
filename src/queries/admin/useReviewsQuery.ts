import { useQuery } from "@tanstack/react-query";

import { getAllReviews } from "../../api/admin/reviewsApi";

export const useGetAllReviewsQuery = () => {
  const {
    data: reviews,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReviews(),
    retry: false,
  });
  return {
    reviews,
    isLoading,
    isSuccess,
  };
};
