import { gameDetailsSchema } from "@/types";
import { z } from "zod";

type Game = z.infer<typeof gameDetailsSchema>;
type TGameProps = {
  game?: Game;
};

const cleanGameDescription = (htmlTag: string) => {
  return htmlTag.replace(/<[^>]*>?/gm, "");
};

export const GeneralMenu = ({ game }: TGameProps) => {
  return (
    <>
      <div className="mt-5 flex justify-center">
        <div className="mx-3 w-full border p-2 shadow-md shadow-global">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-2">
              <p className="font-bold">Date de sortie : </p>
              <p>{game?.released.split("-").reverse().join("/")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <p className="font-bold">Genre :</p>
              {game?.genres.map((genre, index) => (
                <p key={index}>{genre.name}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <p className="font-bold">Plateforme :</p>
              {game?.platforms?.map((platform, index) => (
                <p key={index}>{platform.platform.name}</p>
              ))}
            </div>
            {game?.developers && game.developers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <p className="font-bold">Développeur :</p>
                {game?.developers.map((developper, index) => (
                  <p key={index}>{developper.name}</p>
                ))}
              </div>
            )}
            {game?.publishers && game.publishers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <p className="font-bold">Editeur :</p>
                {game?.publishers.map((publisher, index) => (
                  <p key={index}>{publisher.name}</p>
                ))}
              </div>
            )}
            <div className="flex justify-center">
              <hr className="w-4/5 border-b border-b-global/20"></hr>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Description :</p>
              {game?.description && (
                <p>{cleanGameDescription(game.description)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
