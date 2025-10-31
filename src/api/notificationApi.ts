import axios from "axios";
import {
  TNotificationFull,
  notificationFullSchema,
} from "@/types/notification";
import { apiUrl } from "@/config";

export const getNotificationsByUser = async () => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });

    const { data: notifications } = await axios.get<TNotificationFull>(
      `${apiUrl}/notifications`,
      {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        },
      },
    );

    const notificationsParsed = notificationFullSchema.parse(notifications);
    return notificationsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
