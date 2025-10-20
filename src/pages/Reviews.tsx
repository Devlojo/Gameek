import { useSearchParams } from "react-router-dom";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { Link } from "react-router-dom";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { GameHoverCard } from "@/components/ui/GameHoverCard";
import { Loader } from "@/components/ui/Loader";
import { useReviewsByFilter } from "@/queries/useReviewsQuery";
import { Pagination } from "@/components/ui/Pagination";
import { useGetAllUsersQuery } from "@/queries/useUsersQuery";

type Item = {
  id: number;
  name: string;
};
export const Reviews = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const genreParam = searchParams.get("genres");
  const genre = genreParam ? genreParam : undefined;
  const platformParam = searchParams.get("plateformes");
  const platform = platformParam ? platformParam : undefined;
  const reviewer = searchParams.get("testeur") || undefined;
  const gradeParam = searchParams.get("note");

  const grade = gradeParam ? parseInt(gradeParam, 10) : undefined;

  const { users } = useGetAllUsersQuery();

  const scoreRange: Item[] = [];

  for (let index = 0; index <= 20; index++) {
    scoreRange.push({ id: index, name: index.toString() });
  }
  const { genres, isSuccessGenres } = useGenresQuery();
  const { platforms, isSuccessPlatforms } = usePlatformsQuery();
  const { reviewsFiltered } = useReviewsByFilter(
    page,
    reviewer,
    genre,
    platform,
    grade,
  );

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Les tests de la communauté
      </h1>
      {isSuccessGenres && isSuccessPlatforms ? (
        <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <FilterSelect label="Genre" items={genres?.results} />
            <FilterSelect label="Plateforme" items={platforms?.results} />
            <FilterSelect label="Testeur" items={users?.users} />
            <FilterSelect label="Note" items={scoreRange} />
          </div>
          <p className="text-center">{reviewsFiltered?.count} tests trouvés</p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {reviewsFiltered?.reviews.map((review, index) => (
              <article
                className="group relative w-full rounded-md bg-customWhite shadow-sm shadow-global"
                key={index}
              >
                <Link
                  to={`/test/${review?.slug}/${review.username}`}
                  className="flex flex-col sm:flex-row"
                >
                  <div className="relative w-full">
                    <img
                      src={review?.background_image as string}
                      alt={review?.gamename}
                      className="h-40 w-full object-cover sm:h-[200px]"
                      loading="lazy"
                    />
                    <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">
                        {review.grade}
                      </span>
                      ∕20
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-2 p-2">
                    <h3 className="text-lg font-semibold">{review.gamename}</h3>
                    <p className="italic">{review.introduction}</p>
                    <div className="flex items-center justify-end gap-2">
                      <img
                        src={review.avatar}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">
                        <span className="font-semibold">{review.username}</span>
                        , {review.created_at}
                      </p>
                    </div>
                  </div>

                  <GameHoverCard
                    platforms={review.platforms}
                    genres={review.genres}
                    info="Voir le test du jeu"
                  />
                </Link>
              </article>
            ))}
            <Pagination page={page} totalGames={reviewsFiltered?.count} />
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
