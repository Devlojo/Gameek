import { useAllGamesFromSeriesQuery } from "@/queries/useGamesQuery";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Link } from "react-router-dom";

interface inputSearchProps {
  setActiveSearchInput: Dispatch<SetStateAction<boolean>>;
}
export const InputSearch = ({ setActiveSearchInput }: inputSearchProps) => {
  const [query, setQuery] = useState(""); // ce que tape l'utilisateur
  const [searchTerm, setSearchTerm] = useState(""); // ce qu'on envoie à l'API
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  // Debounce : attendre 500ms après la dernière saisie de l'utilisateur avant de lancer la query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 0) {
        setSearchTerm(query);
        setSearchModalIsOpen(true);
      } else {
        setSearchTerm("");
        setSearchModalIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(handler); // Met à zéro le compteur
  }, [query]);

  const { seriesGames, isLoading: isLoadingSeries } =
    useAllGamesFromSeriesQuery(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <>
      <div className="relative w-full">
        <input
          type="search"
          className="my-1.5 w-full rounded-md p-1 text-global outline-none"
          placeholder="Rechercher un jeu"
          value={query}
          onChange={handleChange}
        />
        {/* Suggestions */}
        {searchModalIsOpen && query && (
          <div className="absolute left-0 top-full z-10 max-h-60 w-full overflow-y-auto bg-customWhite text-black shadow-sm shadow-black">
            {isLoadingSeries ? (
              <p className="p-2">Chargement...</p>
            ) : seriesGames && seriesGames.games.length > 0 ? (
              <ul>
                {seriesGames.games.map((game, index) => (
                  <li key={index}>
                    <Link
                      to={`/jeu/${game.slug}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      onClick={() => {
                        setSearchModalIsOpen(false);
                        setActiveSearchInput(false);
                      }}
                    >
                      <img
                        src={game.background_image as string}
                        className="h-8 w-8 object-cover md:h-12 md:w-12"
                        alt={`Image de ${game.name}`}
                        loading="lazy"
                      />
                      <div className="flex flex-col flex-wrap justify-center">
                        <h3 className="font-semibold md:text-lg">
                          {game.name}{" "}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {game.platforms.map((platform, index) => (
                            <p className="text-sm" key={index}>
                              {platform.platform.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li className="p-2">Aucun jeu trouvé</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};
