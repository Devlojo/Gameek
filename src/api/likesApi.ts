import axios from "axios";
import { TLike } from "@/types/like";
import { apiUrl } from "@/config";

export const addLike = async ({ review_id }: TLike) => {
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

export const removeLikeById = async (id: number) => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });
    const { data: comment } = await axios.delete(`${apiUrl}/comments/${id}`, {
      withCredentials: true,
      headers: {
        "x-csrf-token": csrfRes.csrfToken,
      },
    });
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const reportCommentById = async (id: number) => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });
    const { data: comment } = await axios.patch(
      `${apiUrl}/comments/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        },
      },
    );
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
