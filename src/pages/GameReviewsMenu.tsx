import { useParams } from "react-router-dom";
import { useGameDetailQuery } from "@/queries/useGameQuery";
import { Menu } from "@/components/game/Menu";
import { GameHeader } from "@/components/game/GameHeader";
import avatar from "@/images/sample-avatar.png";

export const GameReviewsMenu = () => {
  const { id } = useParams();
  const { gameDetail } = useGameDetailQuery(id);

  return (
    <>
      <GameHeader
        background_image={gameDetail?.background_image}
        name={gameDetail?.name}
      >
        <Menu />
        <div className="mx-3 mt-5 flex flex-col gap-3">
          <article className="relative flex bg-customWhite shadow-sm shadow-global">
            <img
              src={gameDetail?.background_image as string}
              alt={gameDetail?.name}
              className="h-28 w-36 object-cover md:h-[180px] md:w-[350px] lg:w-1/2"
              loading="lazy"
            />
            <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
              <span className="text-xl text-mainYellow">08</span>
              ∕20
            </p>
            <div className="flex w-1/2 flex-col gap-2 p-2">
              <p className="italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt soluta vitae quas, debitis omnis nesciunt sint! Labore
                quasi molestias nihil sed delectus saepe consectetur
                reprehenderit culpa nulla, nemo doloremque repellendus.
              </p>
              <div className="flex items-center justify-end gap-2">
                <img
                  src={avatar}
                  className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                  alt="Avatar du testeur"
                />
                <p className="text-sm">Jack, le 01/01/2025 à 15h50</p>
              </div>
            </div>
          </article>
          <article className="relative flex bg-customWhite shadow-sm shadow-global">
            <img
              src={gameDetail?.background_image as string}
              alt={gameDetail?.name}
              className="h-28 w-36 object-cover md:h-[180px] md:w-[350px] lg:w-1/2"
              loading="lazy"
            />
            <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
              <span className="text-xl text-mainYellow">11</span>
              ∕20
            </p>
            <div className="flex w-1/2 flex-col gap-2 p-2">
              <p className="italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt soluta vitae quas, debitis omnis nesciunt sint! Labore
                quasi molestias nihil sed delectus saepe consectetur
                reprehenderit culpa nulla, nemo doloremque repellendus.
              </p>
              <div className="flex items-center justify-end gap-2">
                <img
                  src={avatar}
                  className="border-1 h-8 w-8 rounded-full shadow-sm shadow-black"
                  alt="Avatar du testeur"
                />
                <p className="text-sm">LeGeek, le 15/07/2022 à 08h37</p>
              </div>
            </div>
          </article>
        </div>
      </GameHeader>
    </>
  );
};
