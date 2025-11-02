import { useQuery } from "@tanstack/react-query";
import { getNotificationsByUser } from "@/api/notificationApi";

export const useNotificationsQuery = (userId: number) => {
  const {
    data: notifications,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotificationsByUser(userId),
  });
  return {
    notifications,
    isLoading,
    isSuccess,
  };
};
