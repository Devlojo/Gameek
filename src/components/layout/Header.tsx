import gameekLogo from "@/images/gameek-removebg.png";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

type TActiveBurgerMenu = {
  activeBurgerMenu: boolean;
  handleActiveBurgerMenu: () => void;
};
const Header = ({
  activeBurgerMenu,
  handleActiveBurgerMenu,
}: TActiveBurgerMenu): JSX.Element => {
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full items-center gap-2 bg-global py-2 text-customWhite max-lg:px-2 max-md:justify-between">
        {!activeBurgerMenu && (
          <GiHamburgerMenu
            className="size-8 md:hidden"
            onClick={handleActiveBurgerMenu}
          />
        )}
        <a href="#">
          <img
            src={gameekLogo}
            alt="Logo du site"
            className="h-12 w-32 md:w-48"
          />
        </a>
        <nav className="mb-1.5 hidden md:flex md:items-center md:gap-2">
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
            Tests
          </a>
        </nav>
        <div className="mb-1 flex justify-end gap-4 text-customWhite md:w-full">
          <button className="hover:cursor-pointer hover:text-yellow-400">
            <FaSearch className="size-6" />
          </button>
          <button className="hover:cursor-pointer hover:text-yellow-400">
            <FaUserCircle className="size-6" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
