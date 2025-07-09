import { useParams } from "react-router-dom";
import {
  useGameDetailQuery,
  useGameScreenshotsQuery,
} from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import { Loader } from "@/components/ui/Loader";

export const GameImagesMenu = () => {
  const { id } = useParams();
  const { gameDetail, isSuccessGameDetail, isLoading } = useGameDetailQuery(id);
  const { gameScreenshots, isSuccessGameScreenshots } =
    useGameScreenshotsQuery(id);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccessGameDetail && (
        <GameHeader
          background_image={gameDetail?.background_image}
          name={gameDetail?.name}
        >
          <Menu />
          {isSuccessGameScreenshots && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 max-sm:mx-3">
              {gameScreenshots?.results &&
              gameScreenshots.results.length > 0 ? (
                gameScreenshots?.results.map((image, index) => (
                  <img
                    src={image.image}
                    key={index}
                    alt={`Image de ${gameDetail?.name}`}
                    className="w-[48.5%] object-cover max-sm:w-full"
                    loading="lazy"
                  />
                ))
              ) : (
                <p> Pas d'images disponible </p>
              )}
            </div>
          )}
        </GameHeader>
      )}
    </>
  );
};
