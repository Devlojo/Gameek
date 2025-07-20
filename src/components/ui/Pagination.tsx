import { LuCircleArrowLeft } from "react-icons/lu";
import { LuCircleArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { clsx } from "clsx";

type TPage = {
  page: number;
};

export const Pagination = ({ page }: TPage) => {
  const pages = [0, 1, 2, 3, 4];
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4">
        {page != 1 && (
          <Link to={`/jeux?page=${page - 1}`}>
            <LuCircleArrowLeft className="size-10 text-mainYellow hover:cursor-pointer" />
          </Link>
        )}

        <div className="flex gap-4">
          {pages.map((offset) => {
            const pageNumber = page + offset;
            return (
              <Link
                to={`/jeux?page=${pageNumber}`}
                className={clsx(
                  "rounded-lg p-2 text-global hover:bg-mainYellow",
                  currentPage === pageNumber && "bg-mainYellow",
                )}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
        <Link to={`/jeux?page=${page + 1}`}>
          <LuCircleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
        </Link>
      </div>
    </>
  );
};
