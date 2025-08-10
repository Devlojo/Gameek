import { z } from "zod";

export const gameSchema = z.object({
  count: z.number(),

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
              id: z.number(),
              name: z.string(),
            }),
          }),
        ),
      ),
      tags: z.nullable(
        z.array(
          z.object({
            name: z.string(),
            slug: z.string(),
          }),
        ),
      ),
      genres: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
});

export const gameDetailsSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  description_raw: z.string(),
  released: z.string().nullable(),
  background_image: z.string().nullable(),
  background_image_additional: z.string().nullable(),
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
  tags: z.nullable(
    z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    ),
  ),
  ratings: z.array(
    z.object({
      title: z.string(),
    }),
  ),
});
export const gameScreenshotsSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
    }),
  ),
});

export const gameVideosSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      preview: z.string(),
      data: z.object({
        "480": z.string(),
        max: z.string(),
      }),
    }),
  ),
});

export const genreOrPlatformSchema = z.object({
  count: z.number(),

  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
