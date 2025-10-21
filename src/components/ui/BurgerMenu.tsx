import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getCurrentDate } from "@/utils/getCurrentDate";

type TActiveBurgerMenu = {
  handleActiveBurgerMenu: () => void;
};

export const BurgerMenu = ({ handleActiveBurgerMenu }: TActiveBurgerMenu) => {
  return (
    <>
      <div className="fixed z-30 flex h-full w-full bg-global text-light md:hidden">
        <IoClose
          className="absolute left-2 top-3 size-10 md:hidden"
          onClick={handleActiveBurgerMenu}
        />

        <nav className="ml-2 mt-20 flex flex-col justify-start gap-2">
          <Link
            to={"/jeux?page=1"}
            className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            onClick={handleActiveBurgerMenu}
          >
            Jeux
          </Link>
          <Link
            to={`/jeux/sorties?page=1&annee=${getCurrentDate().year}&mois=${getCurrentDate().month}`}
            className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            onClick={handleActiveBurgerMenu}
          >
            Sorties
          </Link>
          <Link
            to={"/tests?page=1"}
            className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            onClick={handleActiveBurgerMenu}
          >
            Tests
          </Link>
        </nav>
      </div>
    </>
  );
};
