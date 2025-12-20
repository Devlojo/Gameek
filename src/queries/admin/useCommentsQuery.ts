import { useQuery } from "@tanstack/react-query";
import { getReportedComments } from "@/api/admin/commentsApi";

export const useGetAllReportedComments = () => {
  const {
    data: reportedComments,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["backComments"],
    queryFn: () => getReportedComments(),
    retry: false,
  });
  return {
    reportedComments,
    isLoading,
    isSuccess,
  };
};
