import { IoClose } from "react-icons/io5";

type TActiveBurgerMenu = {
  handleActiveBurgerMenu: () => void;
};

export const BurgerMenu = ({ handleActiveBurgerMenu }: TActiveBurgerMenu) => {
  return (
    <>
      <div className="fixed z-30 flex h-full w-full bg-global text-customWhite md:hidden">
        <IoClose
          className="absolute left-2 top-3 size-10 md:hidden"
          onClick={handleActiveBurgerMenu}
        />

        <nav className="ml-2 mt-20 flex flex-col justify-start gap-2">
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
      </div>
    </>
  );
};
