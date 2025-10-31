import { useQuery } from "@tanstack/react-query";
import { getNotificationsByUser } from "@/api/notificationApi";

export const useNotificationsQuery = () => {
  const {
    data: notifications,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotificationsByUser(),
  });
  return {
    notifications,
    isLoading,
    isSuccess,
  };
};
