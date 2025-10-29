import axios from "axios";
import { genreOrPlatformSchema } from "@/types/index";
import { apiUrl } from "@/config";

export const getAllPlatforms = async () => {
  try {
    const { data: platforms } = await axios.get(`${apiUrl}/platforms`, {
      timeout: 5000,
    });

    const platformsParsed = genreOrPlatformSchema.parse(platforms);

    return platformsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
