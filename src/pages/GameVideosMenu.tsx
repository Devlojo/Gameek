import { useParams } from "react-router-dom";
import { useGameDetailQuery, useGameVideosQuery } from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";

export const GameVideosMenu = () => {
  const { id } = useParams();
  const { gameDetail } = useGameDetailQuery(id);
  const { gameVideos, isSuccessGameVideos } = useGameVideosQuery(id);

  return (
    <>
      <GameHeader
        background_image={gameDetail?.background_image}
        name={gameDetail?.name}
      >
        <Menu />
        {isSuccessGameVideos && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {gameVideos?.results && gameVideos.results.length > 0 ? (
              gameVideos?.results.map((video, index) => (
                <article
                  key={index}
                  className="flex w-[48.5%] flex-col items-center shadow-sm shadow-global"
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
    </>
  );
};
