import axios from "axios";
import { genreOrPlatformSchema } from "@/types/index";

const apiUrl = import.meta.env.VITE_API_URL;
export const getAllGenres = async () => {
  try {
    const { data: genres } = await axios.get(`${apiUrl}/genres`, {
      timeout: 5000,
    });

    const genresParsed = genreOrPlatformSchema.parse(genres);

    return genresParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
