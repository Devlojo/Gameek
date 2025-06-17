import { useLatestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";

export const LatestReleasesSection = () => {
  const { latestGames, isSuccess } = useLatestGamesQuery();
  // Date du jour
  const today = new Date();
  const yearToday = today.getFullYear();
  // On s'assure que le resultat soit une chaine de caractères pour pouvoir utiliser la méthode padStart qui prend deux arguments, ici le 2 pour qu'il y a deux chiffres et le "0" pour ajouter un zéro lorsque la date sera par exemple 07/01
  const monthToday = String(today.getMonth() + 1).padStart(2, "0");
  const dayToday = String(today.getDate()).padStart(2, "0");
  const dateToday = `${dayToday}/${monthToday}/${yearToday}`;

  // Date du jour - 3
  const ThreeDaysAgo = new Date();
  ThreeDaysAgo.setDate(ThreeDaysAgo.getDate() - 3);
  const yearThreeDaysAgo = ThreeDaysAgo.getFullYear();
  const monthThreeDaysAgo = String(ThreeDaysAgo.getMonth() + 1).padStart(
    2,
    "0",
  );
  const dayThreeDaysAgo = String(ThreeDaysAgo.getDate()).padStart(2, "0");
  const dateThreeDaysAgo = `${dayThreeDaysAgo}/${monthThreeDaysAgo}/${yearThreeDaysAgo}`;

  return (
    <>
      <section className="h-auto py-3">
        <div className="flex items-center justify-between gap-2 px-4 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold text-customWhite">
            Les dernières sorties{" "}
          </h2>
          <div className="my-1 flex justify-center gap-1">
            <p className="text-customWhite">
              Du {dateThreeDaysAgo} au {dateToday}
            </p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          {isSuccess && latestGames && latestGames.results.length > 0
            ? latestGames.results.map((game, index) => (
                <article
                  className="mb-5 flex w-72 flex-shrink-0 flex-col hover:opacity-85"
                  key={index}
                >
                  <a href={"#" + game.slug}>
                    <div className="relative w-full rounded-2xl border-2 border-black">
                      {game.background_image ? (
                        <img
                          src={game.background_image}
                          alt={game.name}
                          className="h-72 w-full rounded-2xl object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-72 w-full items-center justify-center bg-global object-cover lg:h-40">
                          <img
                            src={gameekLogo}
                            alt="logo du site"
                            className="h-20 rounded-2xl"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-0 flex w-full flex-col items-center rounded-b-2xl bg-black bg-opacity-80 p-1 text-customWhite">
                        <h3 className="text-center text-lg">{game.name}</h3>
                        <p className="text-sm">
                          {game.released.split("-").reverse().join("/")}
                        </p>
                      </div>
                    </div>
                  </a>
                </article>
              ))
            : [<Loader />]}
        </div>
      </section>
    </>
  );
};
