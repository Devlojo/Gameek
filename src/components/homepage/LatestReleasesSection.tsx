import { useLatestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const CustomDot = ({ onClick, ...rest }: any) => {
    const { active } = rest;
    return (
      <button
        onClick={onClick}
        className={`mx-1 h-2 w-10 ${active ? "bg-white" : "bg-gray-500"}`}
      />
    );
  };

  return (
    <>
      <section className="bg-surface h-auto px-4 py-3 shadow-xl shadow-black">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-light text-2xl font-bold">
            Les dernières sorties{" "}
          </h2>
          <div className="my-1 flex justify-center gap-1">
            <p className="text-light">
              Du {dateThreeDaysAgo} au {dateToday}
            </p>
          </div>
        </div>

        <Carousel
          infinite
          itemClass="px-2"
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          customDot={<CustomDot />}
          containerClass={
            latestGames?.results.length === 1 ? "justify-center flex" : ""
          }
        >
          {isSuccess && latestGames && latestGames.results.length > 0 ? (
            latestGames.results.map((game, index) => (
              <article className="mb-5 flex hover:opacity-85" key={index}>
                <a href={"#" + game.slug}>
                  <div className="w-full">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-64 rounded-t-md object-cover shadow-lg shadow-black"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-64 w-full items-center justify-center bg-global object-cover lg:h-40">
                        <img
                          src={gameekLogo}
                          alt="logo du site"
                          className="h-20"
                        />
                      </div>
                    )}

                    <div className="text-light flex w-full flex-col items-center p-1">
                      <h3 className="text-center text-lg">{game.name}</h3>
                      <p className="text-sm">
                        {game.released.split("-").reverse().join("/")}
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))
          ) : (
            <Loader />
          )}
        </Carousel>
      </section>
    </>
  );
};
