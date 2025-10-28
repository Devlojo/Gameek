import axios from "axios";
import {
  TCommentList,
  commentFormSchema,
  commentListSchema,
} from "@/types/comment";
import { apiUrl } from "@/config";
import { TCommentForm } from "@/types/comment";

export const getAllCommentsByReview = async (
  gameSlug: string,
  userName: string,
) => {
  try {
    const { data: comments } = await axios.get<TCommentList>(
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

export const addComment = async ({
  content,
  review_id,
  parent_id,
}: TCommentForm) => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });
    const { data: comment } = await axios.post<TCommentForm>(
      `${apiUrl}/comments/create`,
      {
        content,
        review_id,
        parent_id,
      },
      {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfRes.csrfToken,
        },
      },
    );
    const commentParsed = commentFormSchema.parse(comment);
    return commentParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCommentById = async (id: number) => {
  try {
    const { data: csrfRes } = await axios.get(`${apiUrl}/csrf-token`, {
      withCredentials: true,
    });
    const { data: comment } = await axios.delete(`${apiUrl}/comments/${id}`, {
      withCredentials: true,
      headers: {
        "x-csrf-token": csrfRes.csrfToken,
      },
    });
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
