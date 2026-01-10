import { useLatestGamesQuery } from "@/queries/useGamesQuery";
import { Loader } from "@/components/ui/Loader";
import gameekLogo from "@/images/gameek-removebg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GameHoverCard } from "@/components/ui/GameHoverCard";
import clsx from "clsx";
import { PiArrowFatLineRightFill } from "react-icons/pi";
import { PiArrowFatLineLeftFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { useEffect, useState } from "react";

export const LatestReleasesSection = () => {
  const { latestGames, isSuccess } = useLatestGamesQuery();
  const [width, setWidth] = useState(window.innerWidth);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const CustomDot = ({ onClick, ...rest }: any) => {
    const { active } = rest;
    return (
      <button
        onClick={onClick}
        className={`mx-1 h-2 w-10 ${active ? "bg-white" : "bg-gray-500"}`}
      />
    );
  };

  const CustomRightArrow = ({ onClick }: any) => {
    return (
      <button
        className="absolute bottom-0 right-0 rounded-full bg-black p-2 text-customWhite opacity-40 hover:cursor-pointer hover:opacity-100"
        onClick={onClick}
      >
        <PiArrowFatLineRightFill className="size-8" />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }: any) => {
    return (
      <button
        className="absolute bottom-0 left-0 rounded-full bg-black p-2 text-customWhite opacity-40 hover:cursor-pointer hover:opacity-100"
        onClick={onClick}
      >
        <PiArrowFatLineLeftFill className="size-8" />
      </button>
    );
  };

  return (
    <>
      <section className="relative h-auto bg-surface px-4 py-3 shadow-lg shadow-black">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold text-light">
            Les jeux populaires du mois{" "}
          </h2>
          <div className="my-1 flex justify-center">
            <Link
              className="rounded-md p-1.5 text-light shadow-sm shadow-light hover:bg-light hover:text-surface"
              to={`/jeux/sorties?page=1&annee=${getCurrentDate().year}&mois=${getCurrentDate().month}`}
            >
              Voir plus
            </Link>
          </div>
        </div>

        <Carousel
          itemClass="px-2"
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          showDots
          customDot={<CustomDot />}
          containerClass={clsx(!isSuccess && "justify-center flex ")}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          infinite={latestGames?.games && latestGames?.games.length > 1 && true}
          autoPlay={width > 1024 ? true : false}
          autoPlaySpeed={10000}
        >
          {isSuccess && latestGames && latestGames.games.length > 0 ? (
            latestGames.games.map((game, index) => (
              <article
                className="group relative mb-5 flex flex-col"
                key={index}
              >
                <Link to={`/jeu/${game.slug}`}>
                  {game.background_image ? (
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="h-96 w-full object-cover shadow-lg shadow-black"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-global">
                      <img
                        src={gameekLogo}
                        alt="logo du site"
                        className="h-32 object-cover"
                      />
                    </div>
                  )}
                  <GameHoverCard
                    platforms={game.platforms}
                    genres={game.genres}
                    info="Voir les détails du jeu"
                  />

                  <div className="flex w-full flex-col items-center p-1 text-light">
                    <h3 className="text-center text-lg font-semibold">
                      {game.name}
                    </h3>

                    <p className="text-center text-sm">
                      Date de sortie :{" "}
                      {game.released_date
                        ? game.released_date
                            ?.slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")
                        : "inconnue"}
                    </p>
                  </div>
                </Link>
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
