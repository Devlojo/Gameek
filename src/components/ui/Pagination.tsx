import { LuCircleArrowLeft } from "react-icons/lu";
import { LuCircleArrowRight } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { clsx } from "clsx";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";

type TPage = {
  page: number;
  theme?: string;
  gamesCount?: number;
};

export const Pagination = ({ page, theme, gamesCount }: TPage) => {
  const pages = [0];
  let count = 10;
  let i = 0;
  while (gamesCount && gamesCount > count) {
    count += 10;
    i++;
    pages.push(i);
  }

  const [searchParams] = useSearchParams();
  const location = useLocation(); // récuperation du chemin courant
  const currentPage = parseInt(searchParams.get("page") || "1");
  const getPageUrl = (targetPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", targetPage.toString()); // on met juste à jour le paramètre page
    return `${location.pathname}?${newParams.toString()}`;
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4">
        {page != 1 && (
          <>
            {!theme && (
              <Link to={getPageUrl(1)}>
                <RxDoubleArrowLeft className="size-10 text-mainYellow hover:cursor-pointer" />
              </Link>
            )}

            <Link to={getPageUrl(page - 1)}>
              <LuCircleArrowLeft className="size-10 text-mainYellow hover:cursor-pointer" />
            </Link>
          </>
        )}

        <div className="flex gap-2 sm:gap-4">
          {page < pages.length &&
            pages.map((index) => {
              const pageNumber = index + 1;
              return (
                <Link
                  key={index}
                  to={getPageUrl(pageNumber)}
                  className={clsx(
                    "rounded-lg p-2 font-semibold lg:hover:bg-mainYellow",
                    currentPage === pageNumber && "bg-mainYellow",
                    theme && "text-customWhite",
                  )}
                >
                  {pageNumber}
                </Link>
              );
            })}
          {page === pages.length && (
            <Link
              to={getPageUrl(currentPage)}
              className={clsx(
                "rounded-lg bg-mainYellow p-2 font-semibold lg:hover:bg-mainYellow",
                theme && "text-customWhite",
              )}
            >
              {currentPage}
            </Link>
          )}
        </div>

        {page < pages.length && (
          <Link to={getPageUrl(page + 1)}>
            <LuCircleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
          </Link>
        )}

        {!theme && page < pages.length && (
          <Link to={getPageUrl(currentPage + 4)}>
            <RxDoubleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
          </Link>
        )}
      </div>
    </>
  );
};
