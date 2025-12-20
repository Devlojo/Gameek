import axios from "axios";
import { userBackSchema, userListBackSchema } from "@/types/user";
import { apiUrl } from "@/config";

export const getAllUsers = async () => {
  try {
    const { data: users } = await axios.get(`${apiUrl}/back/users/`, {
      timeout: 5000,
      withCredentials: true,
    });
    const usersParsed = userListBackSchema.parse(users);
    return usersParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByName = async (username: string) => {
  try {
    const { data: user } = await axios.get(`${apiUrl}/back/users/${username}`, {
      timeout: 5000,
      withCredentials: true,
    });
    const userParsed = userBackSchema.parse(user);
    return userParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
