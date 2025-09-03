import axios from "axios";
import {
  reviewListResponseSchema,
  reviewDetailSchema,
  reviewListByGameSchema,
} from "@/types/review";
const apiUrl = import.meta.env.VITE_API_URL;

export const getLatestReviews = async () => {
  try {
    const { data: latestReviews } = await axios.get(
      `${apiUrl}/reviews/latest`,
      { timeout: 5000 },
    );
    const latestReviewsParsed = reviewListResponseSchema.parse(latestReviews);
    return latestReviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviewDetail = async (gameSlug: string, userName: string) => {
  try {
    const { data: reviewDetail } = await axios.get(
      `${apiUrl}/reviews/${gameSlug}/${userName}`,
      { timeout: 5000 },
    );
    const reviewDetailParsed = reviewDetailSchema.parse(reviewDetail);
    return reviewDetailParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReviewsByGame = async (gameSlug: string) => {
  try {
    const { data: reviewsByGame } = await axios.get(
      `${apiUrl}/reviews/${gameSlug}`,
      { timeout: 5000 },
    );
    const reviewByGameParsed = reviewListByGameSchema.parse(reviewsByGame);
    return reviewByGameParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
