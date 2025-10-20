import { useParams } from "react-router-dom";
import { useGameDetailQuery } from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import { Loader } from "@/components/ui/Loader";
import { useState } from "react";
import { PageNotFound } from "@/components/layout/PageNotFound";

export const GameGeneralMenu = () => {
  const { id } = useParams();
  const { gameDetail, isLoading, isSuccessGameDetail, isError } =
    useGameDetailQuery(id);
  const [activeMenu, setActiveMenu] = useState<string>("general");

  const cleanGameDescription = (htmlTag: string) => {
    return htmlTag.replace(/<[^>]*>?/gm, "");
  };

  return (
    <>
      {isLoading && <Loader />}
      {isSuccessGameDetail && (
        <GameHeader
          background_image={gameDetail?.background_image}
          name={gameDetail?.name}
        >
          <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <div className="mt-5 flex justify-center bg-customWhite">
            <div className="mx-3 w-full border p-2 shadow-md shadow-global">
              <div className="flex flex-col justify-center gap-2">
                <div className="flex gap-2">
                  <p className="font-bold">Date de sortie : </p>
                  <p>
                    {gameDetail?.released_date
                      ? gameDetail?.released_date
                          ?.slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")
                      : "inconnue"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold">Genre :</p>
                  {gameDetail?.genres.map((genre, index) => (
                    <p key={index} className="underline">
                      {genre.name}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold">Plateforme :</p>
                  {gameDetail?.platforms?.map((platform, index) => (
                    <p key={index} className="underline">
                      {platform.platform.name}
                    </p>
                  ))}
                </div>
                {gameDetail?.developers && gameDetail.developers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <p className="font-bold">Développeur :</p>
                    {gameDetail?.developers.map((developper, index) => (
                      <p key={index}>{developper.name}</p>
                    ))}
                  </div>
                )}
                {gameDetail?.publishers && gameDetail.publishers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <p className="font-bold">Editeur :</p>
                    {gameDetail?.publishers.map((publisher, index) => (
                      <p key={index}>{publisher.name}</p>
                    ))}
                  </div>
                )}
                <div className="flex justify-center">
                  <hr className="w-4/5 border-b border-b-global/20"></hr>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Description :</p>

                  <p>
                    {cleanGameDescription(
                      gameDetail?.description_raw as string,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GameHeader>
      )}
      {isError && <PageNotFound />}
    </>
  );
};
