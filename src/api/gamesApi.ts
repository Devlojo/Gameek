import axios from "axios";
import {
  gameDetailsSchema,
  gameSchema,
  gameScreenshotsSchema,
  gameVideosSchema,
  bestGamesSchema,
} from "@/types/index";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGames = async (
  page: number,
  genres?: string,
  platforms?: string,
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
  year: string,
  month: string,
  genres?: string,
  platforms?: string,
) => {
  try {
    const { data: games } = await axios.get(
      `${apiUrl}/games/releases?page=${page}&year=${year}&month=${month}${genres ? `&genres=${genres}` : ""}${
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
    const bestGamesParsed = bestGamesSchema.parse(bestGames);
    return bestGamesParsed;
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

export const getAllGamesFromSeries = async (game: string) => {
  try {
    const { data: games } = await axios.get(
      `${apiUrl}/games/search-games?search=${game}`,
      {
        timeout: 5000,
      },
    );
    const gamesParsed = gameSchema.parse(games);

    return gamesParsed;
  } catch (error) {
    console.log(error);
  }
};
