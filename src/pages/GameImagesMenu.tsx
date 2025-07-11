import { useParams } from "react-router-dom";
import {
  useGameDetailQuery,
  useGameScreenshotsQuery,
} from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import { Loader } from "@/components/ui/Loader";
import { useState } from "react";
import { ForbiddenContent } from "@/components/layout/ForbiddenContent";

export const GameImagesMenu = () => {
  const { id } = useParams();
  const { gameDetail, isSuccessGameDetail, isLoading } = useGameDetailQuery(id);
  const { gameScreenshots, isSuccessGameScreenshots, isError } =
    useGameScreenshotsQuery(id);
  const [activeMenu, setActiveMenu] = useState<string>("screenshots");

  return (
    <>
      {isLoading && <Loader />}
      {isSuccessGameDetail && (
        <GameHeader
          background_image={gameDetail?.background_image}
          name={gameDetail?.name}
        >
          <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {isSuccessGameScreenshots && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 max-sm:mx-3">
              {gameScreenshots?.results &&
              gameScreenshots.results.length > 0 ? (
                gameScreenshots?.results.map((image, index) => (
                  <img
                    src={image.image}
                    key={index}
                    alt={`Image de ${gameDetail?.name}`}
                    className="max-h-[280px] w-[48.5%] object-cover max-sm:w-full"
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
      {isError && <ForbiddenContent />}
    </>
  );
};
