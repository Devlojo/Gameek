import { useParams } from "react-router-dom";
import { useGameDetailQuery } from "@/queries/useGameQuery";
import { Link } from "react-router-dom";
import { GeneralMenu } from "@/components/game/GeneralMenu";

const Game = () => {
  const { id } = useParams();
  const { gameDetail } = useGameDetailQuery(id);

  return (
    <>
      <h1 className="mt-4 px-4 text-center text-3xl font-bold text-customWhite">
        {gameDetail?.name}
      </h1>
      <div className="rounded-md bg-customWhite pb-5">
        <img
          src={gameDetail?.background_image as string}
          alt={`photo de couverture de ${gameDetail?.name}`}
          className="h-[150px] w-full object-cover md:h-[220px] lg:h-[300px]"
          loading="lazy"
        />

        <ul className="mx-3 my-2 flex items-center justify-between md:my-4">
          <li>
            <Link
              to={""}
              className="rounded-md bg-mainYellow p-1 shadow-md shadow-global md:p-2 md:px-10"
            >
              Général
            </Link>
          </li>

          <li>
            <Link
              to={""}
              className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
            >
              Tests
            </Link>
          </li>
          <li>
            <Link
              to={""}
              className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
            >
              Images
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to={""}
              className="rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10"
            >
              Videos
            </Link>
          </li>
        </ul>

        <GeneralMenu game={gameDetail} />
      </div>
    </>
  );
};

export default Game;
