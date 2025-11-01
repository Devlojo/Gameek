import { z } from "zod";

// Définition de l'ENUM
const reviewStatusEnum = z.enum([
  "en_attente",
  "valide",
  "a_modifier",
  "refuse",
]);
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
      status: reviewStatusEnum,
      created_at: z.string(),
      gamename: z.string(),
      slug: z.string(),
      rawg_id: z.number(),
      background_image: z.string(),
      username: z.string(),
      image: z.string(),
      likes_count: z.number(),
      comments_count: z.number(),
      user_id_like: z.number().nullable(),
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
    status: reviewStatusEnum,
    created_at: z.string(),
    gamename: z.string(),
    slug: z.string(),
    rawg_id: z.number(),
    background_image: z.string(),
    username: z.string(),
    image: z.string(),
    user_id_like: z.number().nullable(),
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
      status: reviewStatusEnum,
      created_at: z.string(),
      slug: z.string(),
      name: z.string(),
      background_image: z.string(),
      username: z.string(),
      image: z.string(),
      likes_count: z.number(),
      user_id_like: z.number().nullable(),
      comments_count: z.number(),
    }),
  ),
  count: z.number().optional(),
});

export const reviewListFilteredSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      username: z.string(),
      grade: z.number(),
      gamename: z.string(),
      status: reviewStatusEnum,
      avatar: z.string(),
      created_at: z.string(),
      slug: z.string(),
      introduction: z.string(),
      background_image: z.string(),
      likes_count: z.number(),
      user_id_like: z.number().nullable(),
      comments_count: z.number(),
      platforms: z.array(
        z.object({
          platform: z.object({
            rawg_id: z.number(),
            name: z.string(),
          }),
        }),
      ),
      genres: z.array(
        z.object({
          rawg_id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
  count: z.number().optional(),
});

export const reviewListBackSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      status: reviewStatusEnum,
      created_at: z.string(),
      name: z.string(),
      slug: z.string(),
      username: z.string(),
    }),
  ),
});

export type TReviewDetail = z.infer<typeof reviewDetailSchema>;
export type TReviewList = z.infer<typeof reviewListResponseSchema>;
