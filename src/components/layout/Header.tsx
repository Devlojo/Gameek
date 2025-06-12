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
import { useState } from "react";

const Header = (): JSX.Element => {
  const { genres } = useGenresQuery();
  const { platforms } = usePlatformsQuery();
  const gamesMenu = [{ name: "Tous les jeux" }, { name: "Tous les tests" }];

  const [activeModalMenus, setActiveModalMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setActiveModalMenus((prev) => {
      if (prev.includes(label)) {
        // Si le menu est déjà ouvert, on le ferme (donc vide le tableau activeModalMenus)
        return [];
      } else {
        // Sinon on ouvre ce menu et on ferme les autres menus [label] n'ajoute qu'un element dans le tableau
        return [label];
      }
    });
  };
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full items-center gap-2 bg-global py-2 text-customWhite max-lg:px-2 max-md:justify-between">
        <GiHamburgerMenu className="size-8 md:hidden" />
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
            toggleMenu={toggleMenu}
            activeModalMenu={activeModalMenus}
          />
          <MenuItem
            icon={GiCrossedSwords}
            label="Genre"
            items={genres?.results || []}
            itemKey="name"
            toggleMenu={toggleMenu}
            activeModalMenu={activeModalMenus}
          />
          <MenuItem
            icon={SiPcgamingwiki}
            label="Plateforme"
            items={platforms?.results || []}
            itemKey="name"
            toggleMenu={toggleMenu}
            activeModalMenu={activeModalMenus}
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
