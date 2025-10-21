import { Link } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useBestGamesQuery } from "@/queries/useGamesQuery";

type TGame = {
  background_image: string | null | undefined;
  background_image_additional?: string | null | undefined;
  name: string | undefined;
  children?: React.ReactNode;
  isReview?: boolean;
  slug?: string | undefined;
};

export const GameHeader = ({
  background_image,
  name,
  slug,
  children,
  isReview,
}: TGame) => {
  const { bestGames } = useBestGamesQuery();

  const gameInfo = bestGames?.games.find((game) => game.name === name);

  return (
    <>
      <div className="overflow-x-hidden">
        <h1 className="my-4 px-2 text-center text-3xl font-bold text-customWhite">
          {name}
        </h1>
        <div className="rounded-md bg-customWhite pb-5">
          <div className="relative h-[150px] md:h-[300px] lg:h-[450px]">
            <img
              src={background_image as string}
              alt={`photo de couverture de ${name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {!isReview && gameInfo?.avg_grade != null && (
              <div className="absolute bottom-0 flex w-full items-center justify-center gap-1 bg-global bg-opacity-70 text-xs text-customWhite">
                <p className="text-lg font-medium">Note moyenne : </p>
                <span className="text-xl font-semibold text-mainYellow lg:text-2xl">
                  {gameInfo?.avg_grade}
                </span>
                ∕20
                <span className="">({gameInfo?.number_reviews} avis)</span>
              </div>
            )}
            {isReview && (
              <Link
                to={`/jeu/tests/${slug}`}
                className="absolute bottom-1 right-1 bg-mainYellow p-2 hover:opacity-80"
              >
                <BsArrowReturnLeft
                  className="size-6"
                  title="Retour vers la page des tests"
                />
              </Link>
            )}
          </div>

          {children}
        </div>
      </div>
    </>
  );
};
