import { LuCircleArrowLeft } from "react-icons/lu";
import { LuCircleArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Pagination = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-4">
        <LuCircleArrowLeft className="size-10 text-mainYellow opacity-30 hover:cursor-pointer" />
        <div className="flex gap-4">
          <Link to={`/jeux`} className="p-1 text-global hover:bg-mainYellow">
            1
          </Link>
          <Link to={`/jeux`} className="p-1 text-global hover:bg-mainYellow">
            2
          </Link>
          <Link to={`/jeux`} className="p-1 text-global hover:bg-mainYellow">
            3
          </Link>
          <Link to={`/jeux`} className="p-1 text-global hover:bg-mainYellow">
            4
          </Link>
          <Link to={`/jeux`} className="p-1 text-global hover:bg-mainYellow">
            5
          </Link>
        </div>
        <LuCircleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
      </div>
    </>
  );
};
