import { z } from "zod";

export const LikeSchema = z.object({
  review_id: z.number(),
});

export type TLike = z.infer<typeof LikeSchema>;
