import axios from "axios";
import { userListBackSchema } from "@/types/user";
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

/*export const getUser = async () => {
  try {
    const { data: user } = await axios.get(`${apiUrl}/back/users/`, {
      timeout: 5000,
      withCredentials: true,
    });
    const usersParsed = userListSchema.parse(user);
    return usersParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};*/
