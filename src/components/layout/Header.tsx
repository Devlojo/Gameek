import gameekLogo from "@/images/gameek-removebg.png";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { SiPcgamingwiki } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { MenuItem } from "@/components/ui/MenuItem";
type TActiveBurgerMenu = {
  activeBurgerMenu: boolean;
  handleActiveBurgerMenu: () => void;
};
const Header = ({
  activeBurgerMenu,
  handleActiveBurgerMenu,
}: TActiveBurgerMenu): JSX.Element => {
  const { genres } = useGenresQuery();
  const { platforms } = usePlatformsQuery();
  const gamesMenu = [{ name: "Tous les jeux" }, { name: "Tous les tests" }];

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
            className="h-12 w-32 md:w-60"
          />
        </a>
        <div className="mb-1 hidden gap-2 md:flex">
          <MenuItem
            icon={IoLogoGameControllerB}
            label="Jeux"
            items={gamesMenu}
            itemKey="name"
          />
          <MenuItem
            icon={GiCrossedSwords}
            label="Genre"
            items={genres?.results || []}
            itemKey="name"
          />
          <MenuItem
            icon={SiPcgamingwiki}
            label="Plateforme"
            items={platforms?.results || []}
            itemKey="name"
          />
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
