import { IoClose } from "react-icons/io5";
import { MenuItem } from "./MenuItem";
import { useGenresQuery } from "@/queries/useGenresQuery";
import { usePlatformsQuery } from "@/queries/usePlatformsQuery";
import { IoLogoGameControllerB } from "react-icons/io";
import { SiPcgamingwiki } from "react-icons/si";
import { GiCrossedSwords } from "react-icons/gi";

type TActiveBurgerMenu = {
  handleActiveBurgerMenu: () => void;
};

export const BurgerMenu = ({ handleActiveBurgerMenu }: TActiveBurgerMenu) => {
  const { genres } = useGenresQuery();
  const { platforms } = usePlatformsQuery();
  const gamesMenu = [{ name: "Tous les jeux" }, { name: "Tous les tests" }];
  return (
    <>
      <div className="fixed z-30 flex h-full w-full bg-global text-customWhite md:hidden">
        <IoClose
          className="absolute left-2 top-3 size-10 md:hidden"
          onClick={handleActiveBurgerMenu}
        />

        <div className="ml-2 mt-20 flex flex-col justify-start gap-2">
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
      </div>
    </>
  );
};
