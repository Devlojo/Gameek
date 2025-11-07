import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getNotificationsByUser,
  markAllNotificationsAsRead,
} from "@/api/notificationApi";

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

export const useMarkNotificationAsReadQuery = () => {
  const mutation = useMutation({
    mutationFn: (userId: number) => markAllNotificationsAsRead(userId),
  });
  return mutation;
};
