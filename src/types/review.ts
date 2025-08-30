import { z } from "zod";

export const reviewSchema = z.object({
  game_id: z.number(),
  introduction: z.string(),
  universe: z.string(),
  gameplay: z.string(),
  graphics: z.string(),
  conclusion: z.string(),
  grade: z.number(),
});
