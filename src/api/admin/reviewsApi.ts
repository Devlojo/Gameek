import axios from "axios";
import { reviewListBackSchema } from "@/types/review";
import { apiUrl } from "@/config";

export const getAllReviews = async () => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });
    const { data: reviews } = await axios.get(`${apiUrl}/back/reviews/`, {
      timeout: 5000,
      withCredentials: true,
      headers: {
        "x-csrf-token": csrfRes.csrfToken,
      },
    });
    const reviewsParsed = reviewListBackSchema.parse(reviews);
    return reviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
