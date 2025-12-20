import axios from "axios";
import { commentReportedSchema } from "@/types/comment";
import { apiUrl } from "@/config";

export const getReportedComments = async () => {
  try {
    const { data: reportedComments } = await axios.get(
      `${apiUrl}/back/comments/`,
      {
        timeout: 5000,
        withCredentials: true,
      },
    );
    const reportedCommentsParsed =
      commentReportedSchema.parse(reportedComments);
    return reportedCommentsParsed;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
