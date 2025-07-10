import { useParams } from "react-router-dom";
import { useGameDetailQuery, useGameVideosQuery } from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import { useState } from "react";
import { ForbiddenContent } from "@/components/layout/ForbiddenContent";
import { Loader } from "@/components/ui/Loader";

export const GameVideosMenu = () => {
  const { id } = useParams();
  const { gameDetail, isSuccessGameDetail, isLoading } = useGameDetailQuery(id);
  const { gameVideos, isSuccessGameVideos, isError } = useGameVideosQuery(id);
  const [activeMenu, setActiveMenu] = useState<string>("videos");

  return (
    <>
      {isLoading && <Loader />}
      {isSuccessGameDetail && (
        <GameHeader
          background_image={gameDetail?.background_image}
          name={gameDetail?.name}
        >
          <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          {isSuccessGameVideos && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {gameVideos?.results && gameVideos.results.length > 0 ? (
                gameVideos?.results.map((video, index) => (
                  <article
                    key={index}
                    className="flex w-[48.5%] flex-col items-center shadow-sm shadow-global max-sm:mx-3 max-sm:w-full"
                  >
                    <video controls>
                      {" "}
                      <source src={video.data[480]} type="video/mp4" />
                    </video>
                    <p>{video.name}</p>
                  </article>
                ))
              ) : (
                <p> Pas de vidéos disponible </p>
              )}
            </div>
          )}
        </GameHeader>
      )}
      {isError && <ForbiddenContent />}
    </>
  );
};
