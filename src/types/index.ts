import { z } from "zod";

export const gameSchema = z.object({
  games: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      released_date: z.string().nullable(),
      background_image: z.string().nullable(),
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
    }),
  ),
  count: z.number().optional(),
});

export const gameSchemaRawg = z.object({
  count: z.number(),

  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      released: z.string().nullable(),
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
  name: z.string(),
  slug: z.string(),
  rawg_id: z.number(),
  background_image: z.string(),
  released_date: z.string().nullable(),
  description_raw: z.string(),
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
  publishers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    }),
  ),
  developers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
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
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      rawg_id: z.number(),
      slug: z.string(),
    }),
  ),
});

export const bestGamesSchema = z.object({
  games: z.array(
    z.object({
      id: z.number(),
      number_reviews: z.string(),
      avg_grade: z.string().nullable(),
      name: z.string(),
      slug: z.string(),
      rawg_id: z.number(),
      background_image: z.string(),
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

export const searchGamesSchema = z.object({
  games: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
      background_image: z.string(),
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
