import { useSearchParams } from "react-router-dom";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { useGamesReleasesQuery } from "@/queries/useGamesQuery";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { Link } from "react-router-dom";
import { Pagination } from "@/components/ui/Pagination";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { GameHoverCard } from "@/components/ui/GameHoverCard";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { Loader } from "@/components/ui/Loader";
import avatar from "@/images/sample-avatar.png";

type Item = {
  id: number;
  name: string;
};
export const Reviews = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const genreParam = searchParams.get("genres");
  const genre = genreParam ? parseInt(genreParam, 10) : undefined;
  const platformParam = searchParams.get("plateformes");
  const platform = platformParam ? parseInt(platformParam, 10) : undefined;
  const currentDate = getCurrentDate();

  const userName = "TheFirstGamer";

  const years: Item[] = [];
  const users: Item[] = [{ id: 1, name: userName }];
  let index = 0;
  for (let fromYear = 1980; fromYear <= currentDate.year; fromYear++) {
    index++;
    years.push({ id: index, name: fromYear.toString() });
  }

  const scoreRange: Item[] = [];

  for (let index = 0; index <= 20; index++) {
    scoreRange.push({ id: index, name: index.toString() });
  }
  const { genres, isSuccessGenres } = useGenresQuery();
  const { platforms, isSuccessPlatforms } = usePlatformsQuery();
  const { games, isSuccessGames } = useGamesReleasesQuery(
    page,
    genre,
    platform,
  );

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Les tests de la communauté
      </h1>
      {isSuccessGames && isSuccessGenres && isSuccessPlatforms ? (
        <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <FilterSelect label="Genre" items={genres?.results} />
            <FilterSelect label="Plateforme" items={platforms?.results} />
            <FilterSelect label="Testeur" items={users} />
            <FilterSelect label="Note" items={scoreRange} />
          </div>
          <p className="text-center">{games?.count} tests trouvés</p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {games?.results.map((game, index) => (
              <article
                className="group relative rounded-md bg-customWhite shadow-sm shadow-global"
                key={index}
              >
                <Link
                  to={`/test/${game?.slug}/${userName}`}
                  className="flex flex-col sm:flex-row"
                >
                  <div className="relative w-full">
                    <img
                      src={game?.background_image as string}
                      alt={game?.name}
                      className="h-40 w-full object-cover sm:h-[200px]"
                      loading="lazy"
                    />
                    <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
                      <span className="text-xl text-mainYellow">08</span>
                      ∕20
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-2 p-2">
                    <p className="italic">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Incidunt soluta vitae quas, debitis omnis nesciunt sint!
                      Labore quasi molestias nihil sed delectus saepe
                      consectetur reprehenderit culpa nulla, nemo doloremque
                      repellendus.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <img
                        src={avatar}
                        className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">
                        <span className="font-semibold">{userName}</span>, le
                        01/01/2025 à 15h50
                      </p>
                    </div>
                  </div>

                  <GameHoverCard
                    platforms={game.platforms}
                    genres={game.genres}
                    info="Voir le test du jeu"
                  />
                </Link>
              </article>
            ))}
            {games && games.count > 10 && (
              <Pagination page={page} gamesCount={games?.count} />
            )}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
