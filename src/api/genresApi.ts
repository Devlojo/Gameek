import axios from "axios";
import { genreOrPlatformSchema } from "@/types/index";

export const getAllGenres = async () => {
  try {
    const { data: genres } = await axios.get(
      `https://site--gameek-backend--bf7zj7wtgltq.code.run/genres`,
      { timeout: 5000 },
      // "http://localhost:8000/genres",
    );

    const genresParsed = genreOrPlatformSchema.parse(genres);

    return genresParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
