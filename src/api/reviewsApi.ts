import axios from "axios";
import {
  reviewListResponseSchema,
  reviewDetailSchema,
  reviewListByGameSchema,
  reviewListFilteredSchema,
  TReviewDetail,
} from "@/types/review";
import { apiUrl } from "@/config";

export const getLatestReviews = async () => {
  try {
    const { data: latestReviews } = await axios.get(
      `${apiUrl}/reviews/latest`,
      { withCredentials: true, timeout: 5000 },
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
    const { data: reviewDetail } = await axios.get<TReviewDetail>(
      `${apiUrl}/reviews/${gameSlug}/${userName}`,
      { withCredentials: true, timeout: 5000 },
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
      { withCredentials: true, timeout: 5000 },
    );
    const reviewByGameParsed = reviewListByGameSchema.parse(reviewsByGame);
    return reviewByGameParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllReviews = async (
  page: number,
  reviewer?: string,
  genres?: string,
  platforms?: string,
  grade?: number,
) => {
  try {
    const { data: reviewsFiltered } = await axios.get(
      `${apiUrl}/reviews?page=${page}${reviewer ? `&reviewer=${reviewer}` : ""}${
        platforms ? `&platforms=${platforms}` : ""
      }${genres ? `&genres=${genres}` : ""}${grade !== undefined && grade !== null ? `&grade=${grade}` : ""}`,
      {
        withCredentials: true,
        timeout: 5000,
      },
    );
    const reviewsFilteredParsed =
      reviewListFilteredSchema.parse(reviewsFiltered);
    return reviewsFilteredParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
