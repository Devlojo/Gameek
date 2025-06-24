import gameekLogo from "@/images/gameek-removebg.png";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { InputSearch } from "@/components/ui/InputSearch";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

type TActiveBurgerMenu = {
  activeBurgerMenu: boolean;
  handleActiveBurgerMenu: () => void;
};
const Header = ({
  activeBurgerMenu,
  handleActiveBurgerMenu,
}: TActiveBurgerMenu): JSX.Element => {
  const [activeSearchInput, setActiveSearchInput] = useState(false);

  const handleInputSearch = () => {
    setActiveSearchInput((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-black bg-gray-950/80 py-1 text-light">
        <div className="flex items-center justify-between gap-2 max-lg:px-2 lg:mx-auto lg:max-w-5xl">
          {!activeBurgerMenu && (
            <GiHamburgerMenu
              className={clsx(
                "size-8 md:hidden",
                activeSearchInput && "hidden",
              )}
              onClick={handleActiveBurgerMenu}
            />
          )}

          <a href="#">
            <img
              src={gameekLogo}
              alt="Logo du site"
              className={clsx(
                "h-12 w-32 md:w-48",
                activeSearchInput && "hidden",
              )}
            />
          </a>

          <nav
            className={clsx(
              "mb-1.5 hidden",
              !activeSearchInput && "md:flex md:items-center md:gap-2",
            )}
          >
            <a
              href=""
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Jeux
            </a>
            <a
              href=""
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Nouveautés
            </a>
            <a
              href=""
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Tests
            </a>
          </nav>
          <div
            className={clsx(
              "mb-1 flex items-center justify-end gap-4 text-light md:w-full",
              activeSearchInput && "w-full",
            )}
          >
            {activeSearchInput && <InputSearch />}

            <button
              className="hover:cursor-pointer hover:text-yellow-400"
              onClick={handleInputSearch}
              aria-label={
                activeSearchInput
                  ? "Fermer la recherche"
                  : "Ouvrir la recherche"
              }
            >
              {activeSearchInput ? (
                <IoClose className="size-6" />
              ) : (
                <FaSearch className="size-6" />
              )}
            </button>
            <a className="hover:cursor-pointer hover:text-yellow-400" href="">
              <FaUserCircle className="size-6" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
