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
  const getPageUrl = (targetPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", targetPage.toString()); // on met juste à jour le paramètre page
    return `/jeux?${newParams.toString()}`;
  };

  return (
    <>
      <div className="flex w-full items-center justify-center sm:gap-4">
        {page != 1 && (
          <Link to={getPageUrl(page - 1)}>
            <LuCircleArrowLeft className="size-10 text-mainYellow hover:cursor-pointer" />
          </Link>
        )}

        <div className="flex sm:gap-4">
          {pages.map((offset) => {
            const pageNumber = page + offset;
            return (
              <Link
                key={offset}
                to={getPageUrl(pageNumber)}
                className={clsx(
                  "rounded-lg p-2 text-global lg:hover:bg-mainYellow",
                  currentPage === pageNumber && "bg-mainYellow",
                )}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
        <Link to={getPageUrl(page + 1)}>
          <LuCircleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
        </Link>
      </div>
    </>
  );
};
