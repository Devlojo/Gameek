import axios from "axios";
import { commentListSchema } from "@/types/comment";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllCommentsByReview = async (
  gameSlug: string,
  userName: string,
) => {
  try {
    const { data: comments } = await axios.get(
      `${apiUrl}/comments/${gameSlug}/${userName}`,
      { timeout: 5000 },
    );
    const commentsParsed = commentListSchema.parse(comments);
    return commentsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
