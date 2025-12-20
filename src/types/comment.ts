import { z } from "zod";

export const commentFormSchema = z.object({
  content: z.string().min(1),
  review_id: z.number(),
  parent_id: z.number().nullable(),
});

export const commentListSchema = z.object({
  comments: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      username: z.string(),
      avatar: z.string(),
      created_at: z.string(),
      review_id: z.number(),
      is_blocked: z.boolean(),
      report_count: z.number(),
      parent_id: z.number().nullable(),
    }),
  ),
  count: z.number().optional(),
});

export const commentDbSchema = z.object({
  id: z.number(),
  content: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  review_id: z.number(),
  is_blocked: z.boolean(),
  report_count: z.number(),
  parent_id: z.number().nullable(),
});

export const commentFullSchema = commentDbSchema.extend({
  username: z.string(),
  avatar: z.string(),
});

export const commentReportedSchema = z.object({
  reportedComments: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      username: z.string(),
      report_count: z.number(),
    }),
  ),
});

export type TCommentForm = z.infer<typeof commentFormSchema>;
export type TCommentList = z.infer<typeof commentListSchema>;
export type TCommentDb = z.infer<typeof commentDbSchema>;
export type TCommentFull = z.infer<typeof commentFullSchema>;
export type TCommentReported = z.infer<typeof commentReportedSchema>;
