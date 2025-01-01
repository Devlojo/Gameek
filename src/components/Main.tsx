import { ImFire } from "react-icons/im";
import { useState, useEffect } from "react";
import axios from "axios";
import { gameSchema } from "../types";
import { z } from "zod";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import avatar from "../images/sample-avatar.png";
import { MdArrowDropDown } from "react-icons/md";

type Game = z.infer<typeof gameSchema>;

const Main = (): JSX.Element => {
  const [bestGames, setBestGames] = useState<Game | null>(null);
  const [lastReleasesGames, setLastReleasesGames] = useState<Game | null>(null);
  const [lastReviewsGames, setLastReviewsGames] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLastReleasesGames = async () => {
      try {
        const response = await axios.get(
          `https://site--gameek-backend--bf7zj7wtgltq.code.run/latest-releases`,
          //`http://localhost:8000/games/latest-releases`,
        );

        const parsedResults = gameSchema.parse(response.data);
        const gameList = parsedResults.results;

        setLastReleasesGames({
          count: parsedResults.count,
          next: parsedResults.next,
          previous: parsedResults.previous,
          results: gameList,
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLastReleasesGames();
  }, []);

  useEffect(() => {
    const fetchBestGames = async () => {
      try {
        const response = await axios.get(
          `https://site--gameek-backend--bf7zj7wtgltq.code.run/best`,
        );

        const parsedResults = gameSchema.parse(response.data);
        const gameList = parsedResults.results;

        setBestGames({
          count: parsedResults.count,
          next: parsedResults.next,
          previous: parsedResults.previous,
          results: gameList,
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestGames();
  }, []);

  useEffect(() => {
    const fetchLastReviewsGames = async () => {
      try {
        const response = await axios.get(
          `https://site--gameek-backend--bf7zj7wtgltq.code.run/latest-reviews`,
        );

        const parsedResults = gameSchema.parse(response.data);
        const gameList = parsedResults.results;

        setLastReviewsGames({
          count: parsedResults.count,
          next: parsedResults.next,
          previous: parsedResults.previous,
          results: gameList,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLastReviewsGames();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <section className="h-98 rounded-md bg-lastestGames px-4 py-3">
        <div className="flex items-center gap-2 pb-3 text-2xl font-bold text-white max-md:justify-center">
          <h2>Les dernières sorties </h2>
          <ImFire className="text-orange-500" />
        </div>
        <Carousel
          autoPlay={true}
          interval={5000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
        >
          {lastReleasesGames &&
          lastReleasesGames.results &&
          lastReleasesGames.results.length > 0
            ? lastReleasesGames.results.map((game, index) => (
                <a
                  href={"/" + game.slug}
                  className="block h-full hover:opacity-75"
                  key={index}
                >
                  <div className="text-white">
                    <p className="font-bold">{game.name}</p>
                    <p className=""> {game.released}</p>
                    <div className="mb-2 flex flex-wrap justify-center gap-1">
                      {game.platforms && game.platforms.length > 0 ? (
                        game.platforms.map((platform, index) => (
                          <p
                            key={index}
                            className="rounded-full border border-global bg-global p-1 text-xs text-white"
                          >
                            {platform.platform.name}
                          </p>
                        ))
                      ) : (
                        <p>Chargement des plateformes...</p>
                      )}
                    </div>
                  </div>
                  <img
                    src={game.background_image || undefined} // Utilisation de la variable correcte pour chaque jeu
                    alt={game.name} // Utilisation du nom du jeu pour l'attribut alt
                    className="h-full object-cover"
                  />
                </a>
              ))
            : [<div key="loading">Chargement des derniers jeux...</div>]}
        </Carousel>
      </section>
      <section className="h-98 rounded-md bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold">Les mieux notés</h2>
          <div className="md:flex md:gap-4">
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Note <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Genre <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Plateforme <MdArrowDropDown />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {bestGames && bestGames.results && bestGames.results.length > 0 ? (
            bestGames.results.map((game, index) => {
              return (
                <a
                  href=""
                  className="flex w-full flex-col hover:opacity-75 lg:w-80"
                  key={index}
                >
                  <article className="w-full">
                    <img
                      src={game.background_image || undefined}
                      alt={game.name}
                      className="h-72 w-full object-cover lg:h-40"
                    />

                    <p className="flex items-center justify-between">
                      {game.name}{" "}
                      <span className="rounded-full border-2 border-cyan-500 p-1 font-bold">
                        {game.metacritic}
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {game.platforms && game.platforms.length > 0 ? (
                        game.platforms.map((platform, index) => (
                          <p
                            key={index}
                            className="rounded-full border border-cyan-500 p-1 text-xs text-black"
                          >
                            {platform.platform.name}
                          </p>
                        ))
                      ) : (
                        <p>Chargement des plateformes...</p>
                      )}
                    </div>
                  </article>
                </a>
              );
            })
          ) : (
            <div>Chargement des meilleurs jeux </div>
          )}
        </div>
      </section>
      <section className="h-98 rounded-md bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold">Les derniers tests</h2>
          <div className="md:flex md:gap-4">
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Note <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Genre <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Plateforme <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Auteur <MdArrowDropDown />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Verification si lastReviewsGames, lastReviewsGames.results (existe et donc != null ou undefined) et lastReviewsGames.results > 0 (pour controler si le tableau possède au moin un élément)*/}
          {lastReviewsGames &&
          lastReviewsGames.results &&
          lastReviewsGames.results.length > 0 ? (
            lastReviewsGames.results.map((game, index) => {
              return (
                <a
                  href=""
                  className="flex w-80 rounded-md border-2 border-gray-300 p-2 hover:opacity-75 max-lg:w-full"
                  key={index}
                >
                  <article className="flex flex-col gap-2 max-lg:w-full">
                    <img
                      src={game.background_image || undefined}
                      alt={game.name}
                      className="h-40 object-cover max-lg:h-96 max-lg:w-full"
                    />
                    <div className="text-lg">
                      <h3>
                        <span className="text-2xl font-bold text-cyan-500">
                          15
                        </span>
                        /20 {game.name}
                      </h3>
                    </div>
                    <p className="text-base">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={avatar}
                        className="border-1 h-8 w-8 rounded-full bg-black"
                        alt="Avatar du testeur"
                      />
                      <p className="text-sm">Jack, le 15/11/23</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {game.platforms && game.platforms.length > 0 ? (
                        game.platforms.map((platform, index) => (
                          <p
                            key={index}
                            className="rounded-full border border-cyan-500 p-1 text-xs text-black"
                          >
                            {platform.platform.name}
                          </p>
                        ))
                      ) : (
                        <p>Chargement des plateformes...</p>
                      )}
                    </div>
                  </article>
                </a>
              );
            })
          ) : (
            <div>Chargement des derniers tests...</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Main;
