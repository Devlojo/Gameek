import axios from "axios";
import { genreOrPlatformSchema } from "@/types/index";

export const getAllPlatforms = async () => {
  try {
    const { data: platforms } = await axios.get(
      `https://site--gameek-backend--bf7zj7wtgltq.code.run/platforms`,
      { timeout: 5000 },
      //"http://localhost:8000/platforms",
    );

    const platformsParsed = genreOrPlatformSchema.parse(platforms);

    return platformsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
