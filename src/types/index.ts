import { z } from "zod";

export const gameSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
      released: z.string(),
      background_image: z.string().nullable(),
      metacritic: z.number().nullable(),
      rating: z.number().nullable(),
      ratings: z.array(
        z.object({
          title: z.string().nullable(),
        }),
      ),
      platforms: z.nullable(
        z.array(
          z.object({
            platform: z.object({
              name: z.string(),
            }),
          }),
        ),
      ),
    }),
  ),
});
