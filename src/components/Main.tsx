import { ImFire } from "react-icons/im";
import { useState, useEffect } from "react";
import axios from "axios";
import { gameSchema } from "../types";
import { z } from "zod";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import avatar from "../images/sample-avatar.png";
import { MdArrowDropDown } from "react-icons/md";
import { PiArrowFatLineLeftFill } from "react-icons/pi";
import { PiArrowFatLineRightFill } from "react-icons/pi";
import { PlatformBadge } from "../components/PlatformBadge";
import { GameBadge } from "./GameBadge";

type Game = z.infer<typeof gameSchema>;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

/* Creation d'un type qui va nous permettre de typer les props du composant CustomLeftArrow
le type React.MouseEventHandler<HTMLButtonElement> signifie :
C'est une fonction qui prend un événement de clic (de type souris).
Cet événement se produit sur un élément HTML de type button ( <HTMLButtonElement> )*/

type CustomArrowProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Typage de la prop onClick
};

//React.FC signifie que c'est un composant fonctionnel
const CustomLeftArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-800 p-3 text-customWhite opacity-80 hover:opacity-100"
    >
      <PiArrowFatLineLeftFill />
    </button>
  );
};

const CustomRightArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-800 p-3 text-customWhite opacity-80 hover:opacity-100"
    >
      <PiArrowFatLineRightFill />
    </button>
  );
};

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
      <section className="h-auto rounded-md bg-customWhite px-4 py-3">
        <div className="flex items-center gap-2 pb-3 text-2xl font-bold max-md:justify-center">
          <h2>Les dernières sorties </h2>
          <ImFire className="text-orange-500" />
        </div>
        <Carousel
          responsive={responsive}
          //autoPlay={true}
          //autoPlaySpeed={5000}
          infinite={true}
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-2"
          dotListClass="flex flex-wrap"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {lastReleasesGames &&
          lastReleasesGames.results &&
          lastReleasesGames.results.length > 0
            ? lastReleasesGames.results.map((game, index) => (
                <a
                  href={"#" + game.slug}
                  className="hover:opacity-85"
                  key={index}
                >
                  <article className="flex flex-col items-center justify-center">
                    <div className="relative mb-2">
                      <img
                        src={game.background_image || undefined} // Utilisation de la variable correcte pour chaque jeu
                        alt={game.name} // Utilisation du nom du jeu pour l'attribut alt
                        className="h-72 w-full rounded-sm object-cover shadow-md shadow-black"
                      />

                      <p className="absolute right-0 top-0 bg-mainYellow p-0.5 text-xs shadow-sm shadow-black">
                        {game.genres[0].name}
                      </p>

                      <div className="absolute bottom-0 flex w-full flex-col items-center justify-center bg-global bg-opacity-70 text-customWhite">
                        <h3 className="text-xl">{game.name}</h3>
                        <p className="text-sm">{game.released}</p>
                      </div>
                    </div>
                    <div className="mb-10 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {game.platforms && game.platforms.length > 0 ? (
                          game.platforms.map((platform, index) => (
                            <PlatformBadge
                              platform={platform.platform.name}
                              index={index}
                            />
                          ))
                        ) : (
                          <p>Chargement des plateformes...</p>
                        )}
                      </div>
                    </div>
                  </article>
                </a>
              ))
            : [<div key="loading">Chargement des derniers jeux...</div>]}
        </Carousel>
      </section>
      <section className="h-auto rounded-md bg-customWhite px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold">Les mieux notés</h2>
          <div className="md:flex md:gap-4">
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Note <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Genre <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Plateforme <MdArrowDropDown />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-between">
          {bestGames && bestGames.results && bestGames.results.length > 0 ? (
            bestGames.results.map((game, index) => {
              return (
                <article
                  className="flex w-full flex-col hover:opacity-85 sm:w-[48%] lg:w-80"
                  key={index}
                >
                  <a href="#">
                    <div className="relative w-full">
                      <img
                        src={game.background_image || undefined}
                        alt={game.name}
                        className="h-72 w-full object-cover shadow-sm shadow-black lg:h-40"
                      />

                      <p className="absolute bottom-0 w-full bg-global bg-opacity-70 text-xs text-customWhite shadow-sm shadow-black">
                        <span className="text-xl text-mainYellow">18</span>
                        ∕20 <span className="">(5 avis)</span>
                      </p>

                      <p className="absolute right-0 top-0 bg-mainYellow p-0.5 text-xs shadow-sm shadow-black">
                        {game.genres[0].name}
                      </p>
                    </div>

                    <h3 className="text-xl">{game.name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {game.platforms && game.platforms.length > 0 ? (
                        game.platforms.map((platform, index) => (
                          <PlatformBadge
                            platform={platform.platform.name}
                            index={index}
                          />
                        ))
                      ) : (
                        <p>Chargement des plateformes...</p>
                      )}
                    </div>
                  </a>
                </article>
              );
            })
          ) : (
            <div>Chargement des meilleurs jeux </div>
          )}
        </div>
      </section>
      <section className="h-auto rounded-md bg-customWhite px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3 max-md:block max-md:text-center">
          <h2 className="text-2xl font-bold">Les derniers tests</h2>
          <div className="md:flex md:gap-4">
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Note <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Genre <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Plateforme <MdArrowDropDown />
            </button>
            <button className="items-center rounded-sm bg-mainYellow px-2 shadow-sm shadow-black max-md:mx-2 max-md:mb-2 md:flex md:py-1">
              Auteur <MdArrowDropDown />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-between">
          {/* Verification si lastReviewsGames, lastReviewsGames.results (existe et donc != null ou undefined) et lastReviewsGames.results > 0 (pour controler si le tableau possède au moin un élément)*/}
          {lastReviewsGames &&
          lastReviewsGames.results &&
          lastReviewsGames.results.length > 0 ? (
            lastReviewsGames.results.map((game, index) => {
              return (
                <article
                  className="p-2 shadow-md shadow-black hover:opacity-85 sm:w-[48%] lg:w-80"
                  key={index}
                >
                  <a href="" className="">
                    <div className="relative">
                      <img
                        src={game.background_image || undefined}
                        alt={game.name}
                        className="h-40 w-full object-cover shadow-md shadow-black max-lg:h-96 max-lg:w-full"
                      />

                      <GameBadge genre={game.genres[0].name} />
                    </div>
                    <div className="mt-1 flex flex-col gap-2">
                      <h3 className="text-xl">{game.name}</h3>
                      <p className="text-base">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src={avatar}
                          className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                          alt="Avatar du testeur"
                        />
                        <p className="text-sm">Jack, le 15/11/23</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {game.platforms && game.platforms.length > 0 ? (
                          game.platforms.map((platform, index) => (
                            <PlatformBadge
                              platform={platform.platform.name}
                              index={index}
                            />
                          ))
                        ) : (
                          <p>Chargement des plateformes...</p>
                        )}
                      </div>
                    </div>
                  </a>
                </article>
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
