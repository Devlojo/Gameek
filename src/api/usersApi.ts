import axios from "axios";
import { userListSchema } from "@/types/user";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  try {
    const { data: users } = await axios.get(`${apiUrl}/users/`, {
      timeout: 5000,
    });
    const usersParsed = userListSchema.parse(users);
    return usersParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
