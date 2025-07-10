import axios from "axios";
import { genreOrPlatformSchema } from "@/types/index";

const apiUrl = import.meta.env.VITE_API_URL;

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
