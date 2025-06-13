import axios from "axios";
import { gameSchema } from "@/types/index";

export const getLatestReleasesGames = async () => {
  try {
    const { data: latestGames } = await axios.get(
      /*`https://site--gameek-backend--bf7zj7wtgltq.code.run/games/latest-releases`,
      { timeout: 5000 },*/
      "http://localhost:8000/games/latest-releases",
    );

    const latestGamesParsed = gameSchema.parse(latestGames);

    return latestGamesParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBestGames = async () => {
  try {
    const { data: bestGames } = await axios.get(
      /*`https://site--gameek-backend--bf7zj7wtgltq.code.run/games/best`,
      { timeout: 5000 },*/
      "http://localhost:8000/games/best",
    );
    const bestGamesParsed = gameSchema.parse(bestGames);
    return bestGamesParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLatestReviews = async () => {
  try {
    const { data: latestReviews } = await axios.get(
      /*`https://site--gameek-backend--bf7zj7wtgltq.code.run/games/latest-reviews`,
      { timeout: 5000 },*/
      "http://localhost:8000/games/latest-reviews",
    );
    const latestReviewsParsed = gameSchema.parse(latestReviews);
    return latestReviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
