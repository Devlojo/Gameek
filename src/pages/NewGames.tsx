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

type Item = {
  id: number;
  name: string;
};
export const NewGames = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const genreParam = searchParams.get("genres");
  const genre = genreParam ? parseInt(genreParam, 10) : undefined;
  const platformParam = searchParams.get("plateformes");
  const platform = platformParam ? parseInt(platformParam, 10) : undefined;
  const currentDate = getCurrentDate();
  const dates =
    searchParams.get("dates") || `${currentDate.fromDate}${currentDate.toDate}`;

  const years: Item[] = [];
  let index = 0;
  for (let fromYear = 1980; fromYear <= currentDate.year; fromYear++) {
    index++;
    years.push({ id: index, name: fromYear.toString() });
  }

  const monthList = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  const months: Item[] = [];

  for (let index = 0; index < monthList.length; index++) {
    months.push({ id: index, name: monthList[index] });
  }
  const { genres, isSuccessGenres } = useGenresQuery();
  const { platforms, isSuccessPlatforms } = usePlatformsQuery();
  const { games, isSuccessGames } = useGamesReleasesQuery(
    page,
    genre,
    platform,
    dates,
  );

  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Calendrier des sorties
      </h1>
      {isSuccessGames && isSuccessGenres && isSuccessPlatforms ? (
        <section className="flex w-full flex-col gap-2 rounded-md bg-surface px-3 pb-5">
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <FilterSelect label="Genre" items={genres?.results} />
            <FilterSelect label="Plateforme" items={platforms?.results} />
            <FilterSelect label="Mois" items={months} />
            <FilterSelect label="Année" items={years.reverse()} />
          </div>
          <p className="text-center text-customWhite">
            {games?.count} jeux trouvés
          </p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {games?.results.map((game, index) => (
              <article
                className="group relative flex w-full flex-col rounded-md shadow-sm shadow-black sm:w-[48.5%]"
                key={index}
              >
                <Link to={`/jeu/${game.slug}`}>
                  <img
                    src={game.background_image as string}
                    alt={`Image de ${game.name}`}
                    loading="lazy"
                    className="h-[250px] w-full rounded-t-md object-cover sm:h-[200px]"
                  />

                  <div className="rounded-b-md bg-light">
                    <h3 className="text-center text-lg font-semibold">
                      {game.name}
                    </h3>{" "}
                    <p className="text-center text-sm">
                      Date de sortie :{" "}
                      {game.released
                        ? game.released.split("-").reverse().join("/")
                        : "inconnu"}
                    </p>
                  </div>

                  <GameHoverCard
                    platforms={game.platforms}
                    genres={game.genres}
                    info="Voir les détails du jeu"
                  />
                </Link>
              </article>
            ))}
            {games && games.count > 10 && (
              <Pagination page={page} theme="dark" gamesCount={games?.count} />
            )}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
