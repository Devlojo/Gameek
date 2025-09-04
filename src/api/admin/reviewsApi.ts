import axios from "axios";
import { reviewListBackSchema } from "@/types/review";
const apiUrl = import.meta.env.VITE_API_URL;

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
