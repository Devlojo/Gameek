import axios from "axios";
import { TLike } from "@/types/like";
import { apiUrl } from "@/config";

export const toggleLike = async ({ review_id }: TLike) => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });

    const { data: like } = await axios.post<TLike>(
      `${apiUrl}/likes/toggle`,
      {
        review_id: review_id,
      },
      {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        },
      },
    );

    return like;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
