import axios from "axios";
import { reviewListBackSchema } from "@/types/review";
import { apiUrl } from "@/config";

export const getAllReviews = async () => {
  try {
    const { data: reviews } = await axios.get(`${apiUrl}/back/reviews/`, {
      timeout: 5000,
      withCredentials: true,
    });
    const reviewsParsed = reviewListBackSchema.parse(reviews);
    return reviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
