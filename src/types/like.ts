import { z } from "zod";

export const LikeSchema = z.object({
  review_id: z.number(),
});

export const likedReviewSchema = z.object({
  reviews: z.array(
    z.object({
      user_id: z.number(),
      review_id: z.number(),
      grade: z.number(),
      game_name: z.string(),
      reviewer_name: z.string(),
      slug: z.string(),
      background_image: z.string(),
      avatar: z.string(),
    }),
  ),
});

export type TLike = z.infer<typeof LikeSchema>;
export type TLikedReview = z.infer<typeof likedReviewSchema>;
