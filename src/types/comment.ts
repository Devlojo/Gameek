import { z } from "zod";

export const commentFormSchema = z.object({
  content: z.string().min(1),
  review_id: z.number(),
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
    }),
  ),
  count: z.number().optional(),
});

export type TCommentForm = z.infer<typeof commentFormSchema>;
export type TCommentList = z.infer<typeof commentListSchema>;
