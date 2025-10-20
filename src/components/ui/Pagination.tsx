import { LuCircleArrowLeft } from "react-icons/lu";
import { LuCircleArrowRight } from "react-icons/lu";
import { Link, useLocation, Navigate, useSearchParams } from "react-router-dom";
import { clsx } from "clsx";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";

type TPage = {
  page: number;
  theme?: string;
  totalGames?: number;
};

export const Pagination = ({ page, theme, totalGames }: TPage) => {
  const pages = [1];
  const pageSize = 10;
  let pageThreshold = pageSize;
  const totalPages = Math.ceil((totalGames as number) / pageSize);
  let maxVisiblePages = 5;

  let i = 1;
  while (totalGames && totalGames > pageThreshold) {
    pageThreshold += pageSize;
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

  if (totalGames === 0) {
    return <Navigate to={getPageUrl(1)} />;
  }

  if (currentPage > totalPages) {
    return <Navigate to={getPageUrl(totalPages)} />;
  }
  const offset = totalPages - currentPage;
  if (offset === 1) {
    maxVisiblePages = 1;
  }

  if (offset === 2) {
    maxVisiblePages = 2;
  }

  if (offset === 3) {
    maxVisiblePages = 3;
  }

  if (offset === 4) {
    maxVisiblePages = 4;
  }

  const endPage = Math.max(currentPage, currentPage + maxVisiblePages);
  const visiblePages = [];
  for (let i = currentPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-2 overflow-auto sm:gap-4">
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
            visiblePages.map((index) => {
              const pageNumber = index;
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
          <Link to={getPageUrl(totalPages)}>
            <RxDoubleArrowRight className="size-10 text-mainYellow hover:cursor-pointer" />
          </Link>
        )}
      </div>
    </>
  );
};
