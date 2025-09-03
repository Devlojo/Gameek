import { z } from "zod";

export const reviewFormSchema = z.object({
  slug: z.string(),
  introduction: z.string(),
  universe: z.string(),
  gameplay: z.string(),
  graphics: z.string(),
  conclusion: z.string(),
  grade: z.number(),
  strengths: z.array(z.string()).max(5).optional(),
  weaknesses: z.array(z.string()).max(5).optional(),
});

export const reviewListResponseSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      introduction: z.string(),
      grade: z.number(),
      is_verify: z.boolean(),
      created_at: z.string(),
      gamename: z.string(),
      slug: z.string(),
      rawg_id: z.number(),
      background_image: z.string(),
      username: z.string(),
      image: z.string(),
      platforms: z.array(
        z.object({
          platform: z.object({
            name: z.string(),
          }),
        }),
      ),
      genres: z.array(
        z.object({
          name: z.string(),
        }),
      ),
    }),
  ),
});

export const reviewDetailSchema = z.object({
  review: z.object({
    id: z.number(),
    introduction: z.string(),
    universe: z.string(),
    gameplay: z.string(),
    graphics: z.string(),
    conclusion: z.string(),
    grade: z.number(),
    is_verify: z.boolean(),
    created_at: z.string(),
    gamename: z.string(),
    slug: z.string(),
    rawg_id: z.number(),
    background_image: z.string(),
    username: z.string(),
    image: z.string(),
    strengths: z.array(z.string()).max(5).optional(),
    weaknesses: z.array(z.string()).max(5).optional(),
  }),
});

export const reviewListByGameSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      grade: z.number(),
      introduction: z.string(),
      is_verify: z.boolean(),
      created_at: z.string(),
      slug: z.string(),
      name: z.string(),
      background_image: z.string(),
      username: z.string(),
      image: z.string(),
    }),
  ),
});
