import gameekLogo from "../images/gameek-removebg.png";
import { IoLogoGameControllerB } from "react-icons/io";
import { GiCrossedSwords } from "react-icons/gi";
import { SiPcgamingwiki } from "react-icons/si";

const Header = (): JSX.Element => {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-global py-2 text-white">
        <a href="">
          <img src={gameekLogo} alt="" className="h-12 w-48" />
        </a>
        <div className="mb-1 flex gap-2">
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
        <div className="mb-1 flex w-full justify-end gap-2">
          <button className="rounded-sm bg-mainYellow px-2 py-1 text-black">
            Connexion
          </button>
          <input
            type="search"
            placeholder="ex : Grand Theft Auto"
            className="w-96 rounded-sm pl-2 text-black"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
