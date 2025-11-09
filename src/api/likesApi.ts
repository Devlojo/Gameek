import axios from "axios";
import { TLike, TLikedReview, likedReviewSchema } from "@/types/like";
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

export const getLikedReviewsByUser = async () => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });

    const { data: likedReviews } = await axios.get<TLikedReview>(
      `${apiUrl}/likes/my-liked-reviews`,
      {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        },
      },
    );

    const likedReviewsParsed = likedReviewSchema.parse(likedReviews);
    return likedReviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
