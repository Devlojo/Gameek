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

export type TCommentForm = z.infer<typeof commentFormSchema>;
export type TCommentList = z.infer<typeof commentListSchema>;
