import axios from "axios";
import {
  gameDetailsSchema,
  gameSchema,
  gameScreenshotsSchema,
  gameVideosSchema,
} from "@/types/index";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGames = async (
  page: number,
  genres?: number,
  platforms?: number,
) => {
  try {
    const { data: games } = await axios.get(
      `${apiUrl}/games?page=${page}${genres ? `&genres=${genres}` : ""}${
        platforms ? `&platforms=${platforms}` : ""
      }`,
      {
        timeout: 5000,
      },
    );

    const gamesParsed = gameSchema.parse(games);

    return gamesParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllReleases = async (
  page: number,
  genres?: number,
  platforms?: number,
  dates?: string,
) => {
  try {
    const { data: games } = await axios.get(
      `${apiUrl}/games/releases?page=${page}${genres ? `&genres=${genres}` : ""}${
        platforms ? `&platforms=${platforms}` : ""
      }${dates ? `&dates=${dates}` : ""}`,
      {
        timeout: 5000,
      },
    );

    const gamesParsed = gameSchema.parse(games);

    return gamesParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLatestReleasesGames = async () => {
  try {
    const { data: latestGames } = await axios.get(
      `${apiUrl}/games/latest-releases`,
      { timeout: 5000 },
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
    const { data: bestGames } = await axios.get(`${apiUrl}/games/best`, {
      timeout: 5000,
    });
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
      `${apiUrl}/games/latest-reviews`,
      { timeout: 5000 },
    );
    const latestReviewsParsed = gameSchema.parse(latestReviews);
    return latestReviewsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGameDetail = async (id: string) => {
  try {
    const { data: gameDetail } = await axios.get(`${apiUrl}/games/${id}`, {
      timeout: 5000,
    });
    const gameDetailParsed = gameDetailsSchema.parse(gameDetail);
    return gameDetailParsed;
  } catch (error) {
    console.log(error);
  }
};

export const getGameScreenshots = async (id: string) => {
  try {
    const { data: gameScreenshots } = await axios.get(
      `${apiUrl}/games/${id}/screenshots`,
      { timeout: 5000 },
    );
    const gameScreenshotsParsed = gameScreenshotsSchema.parse(gameScreenshots);
    return gameScreenshotsParsed;
  } catch (error) {
    console.log(error);
  }
};

export const getGameVideos = async (id: string) => {
  try {
    const { data: gameVideos } = await axios.get(
      `${apiUrl}/games/${id}/movies`,
      { timeout: 5000 },
    );
    const gameVideosParsed = gameVideosSchema.parse(gameVideos);
    return gameVideosParsed;
  } catch (error) {
    console.log(error);
  }
};
