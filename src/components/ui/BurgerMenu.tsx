import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

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
            to={"/jeux"}
            className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            onClick={handleActiveBurgerMenu}
          >
            Jeux
          </Link>
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
      </div>
    </>
  );
};
