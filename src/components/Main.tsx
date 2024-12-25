import { ImFire } from "react-icons/im";
import { useState, useEffect } from "react";
import axios from "axios";
import { gameSchema } from "../types";
import { z } from "zod";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
        <div className="flex items-center gap-2 pb-3 text-2xl font-bold text-white">
          <h2>Les dernières sorties </h2>
          <ImFire className="text-orange-500" />
        </div>

        {lastReleasesGames &&
        lastReleasesGames.results &&
        lastReleasesGames.results.length > 0 ? (
          lastReleasesGames.results.map((game, index) => (
            <div key={index}>
              <a href="" className="hover:opacity-75">
                <p className="text-white">
                  {game.name}
                  <span className="text-white"> {game.released}</span>
                </p>
                <img
                  src={game.background_image || undefined} // Utilisation de la variable correcte pour chaque jeu
                  alt={game.name} // Utilisation du nom du jeu pour l'attribut alt
                  className="h-full object-cover"
                />
              </a>
            </div>
          ))
        ) : (
          <div>Chargement des derniers jeux...</div> // Message de chargement si les données ne sont pas disponibles
        )}
      </section>
      <section className="h-98 rounded-md bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3">
          <h2 className="text-2xl font-bold">Les mieux notés</h2>
          <div className="flex gap-4">
            <button className="rounded-sm bg-mainYellow px-2 py-1">Note</button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Genre
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Plateforme
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {bestGames && bestGames.results && bestGames.results.length > 0 ? (
            bestGames.results.map((game, index) => {
              return (
                <a
                  href=""
                  className="flex w-80 flex-col hover:opacity-75"
                  key={index}
                >
                  <article className="w-full">
                    <img
                      src={game.background_image || undefined}
                      alt={game.name}
                      className="h-44 w-full object-cover"
                    />

                    <div className="flex justify-between">
                      <p>{game.name}</p>
                      <p className="rounded-sm border-2 border-cyan-500 font-bold">
                        {game.metacritic}
                      </p>
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
        <div className="flex items-center justify-between gap-2 pb-3">
          <h2 className="text-2xl font-bold">Les derniers tests</h2>
          <div className="flex gap-4">
            <button className="rounded-sm bg-mainYellow px-2 py-1">Note</button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Genre
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Plateforme
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Auteur
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          {/* Verification si lastReviewsGames, lastReviewsGames.results (existe et donc != null ou undefined) et lastReviewsGames.results > 0 (pour controler si le tableau possède au moin un élément)*/}
          {lastReviewsGames &&
          lastReviewsGames.results &&
          lastReviewsGames.results.length > 0 ? (
            lastReviewsGames.results.map((game, index) => {
              return (
                <a
                  href=""
                  className="flex w-60 rounded-md border-2 border-gray-300 p-2 hover:opacity-75"
                  key={index}
                >
                  <article className="flex flex-col gap-2">
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="h-32 object-cover"
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
                    <p className="text-sm">Publié par Jack, le 15/11/23</p>
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
