import { z } from "zod";

export const gameSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      id: z.number(),
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
      genres: z.array(
        z.object({
          name: z.string(),
        }),
      ),
    }),
  ),
});

export const genreOrPlatformSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export const gameDetailsSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  released: z.string(),
  background_image: z.string().nullable(),
  publishers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  developers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  platforms: z.nullable(
    z.array(
      z.object({
        platform: z.object({
          id: z.number(),
          name: z.string(),
        }),
      }),
    ),
  ),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
