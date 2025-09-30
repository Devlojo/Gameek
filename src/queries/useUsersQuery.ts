import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/usersApi";

export const useGetAllUsersQuery = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    retry: false,
  });
  return {
    users,
    isLoading,
    isSuccess,
  };
};
