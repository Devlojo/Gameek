import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserByName } from "@/api/admin/usersApi";

export const useGetAllUsersQuery = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["backUsers"],
    queryFn: () => getAllUsers(),
    retry: false,
  });
  return {
    users,
    isLoading,
    isSuccess,
  };
};

export const useGetUserByNameQuery = (username: string) => {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["backUser", username],
    queryFn: () => getUserByName(username),
    retry: false,
  });
  return {
    user,
    isLoading,
    isSuccess,
  };
};
