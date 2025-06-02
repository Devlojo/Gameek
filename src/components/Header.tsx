import gameekLogo from "../images/gameek-removebg.png";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { SiPcgamingwiki } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (): JSX.Element => {
  return (
    <>
      <header className="sticky top-0 z-10 flex w-full items-center gap-2 bg-global py-2 text-customWhite max-md:justify-between">
        <GiHamburgerMenu className="size-8 md:hidden" />
        <a href="">
          <img src={gameekLogo} alt="" className="h-12 w-32 md:w-60" />
        </a>
        <div className="mb-1 hidden gap-2 md:flex">
          <a
            href=""
            className="flex items-center gap-1 rounded-sm p-2 hover:bg-mainYellow hover:text-black"
          >
            <IoLogoGameControllerB />
            Jeux
          </a>
          <a
            href=""
            className="flex items-center gap-1 rounded-sm p-2 hover:bg-mainYellow hover:text-black"
          >
            <GiCrossedSwords />
            Genre
          </a>
          <a
            href=""
            className="flex items-center gap-1 rounded-sm p-2 hover:bg-mainYellow hover:text-black"
          >
            <SiPcgamingwiki />
            Plateforme
          </a>
        </div>
        <div className="mb-1 flex justify-end gap-4 text-customWhite md:w-full">
          <FaSearch className="size-6 hover:cursor-pointer hover:text-yellow-400" />
          <FaUserCircle className="size-6 hover:cursor-pointer hover:text-yellow-400" />
        </div>
      </header>
    </>
  );
};

export default Header;
