import { Link, useParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";

type MenuProps = {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
};

export const Menu = ({ activeMenu, setActiveMenu }: MenuProps) => {
  const { id } = useParams();

  const handleActiveMenu = (event: React.MouseEvent<HTMLElement>) => {
    const selectedMenu = event.currentTarget.id;

    setActiveMenu(selectedMenu);
  };

  return (
    <nav>
      <ul className="mx-3 my-2 flex items-center justify-between md:my-4">
        <li>
          <Link
            id="general"
            onClick={(event) => handleActiveMenu(event)}
            className={clsx(
              "rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10",
              activeMenu === "general" && "bg-mainYellow",
            )}
            to={`/jeu/${id}`}
          >
            Général
          </Link>
        </li>

        <li>
          <Link
            id="reviews"
            onClick={(event: any) => {
              handleActiveMenu(event);
            }}
            className={clsx(
              "rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10",
              activeMenu === "reviews" && "bg-mainYellow",
            )}
            to={`/jeu/tests/${id}`}
          >
            Tests
          </Link>
        </li>
        <li>
          <Link
            to={`/jeu/images/${id}`}
            id="screenshots"
            onClick={(event: any) => handleActiveMenu(event)}
            className={clsx(
              "rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10",
              activeMenu === "screenshots" && "bg-mainYellow",
            )}
          >
            Images
          </Link>
        </li>
        <li>
          <Link
            to={`/jeu/videos/${id}`}
            id="videos"
            onClick={(event: any) => handleActiveMenu(event)}
            className={clsx(
              "rounded-md p-1 shadow-md shadow-global hover:opacity-80 md:p-2 md:px-10",
              activeMenu === "videos" && "bg-mainYellow",
            )}
          >
            Videos
          </Link>
        </li>
      </ul>
    </nav>
  );
};
