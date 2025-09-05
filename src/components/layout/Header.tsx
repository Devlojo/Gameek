import gameekLogo from "@/images/gameek-removebg.png";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { InputSearch } from "@/components/ui/InputSearch";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { getCurrentDate } from "@/utils/getCurrentDate";
import { MdArrowDropDown } from "react-icons/md";
import { TUser } from "@/types/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type THeaderProps = {
  activeBurgerMenu: boolean;
  handleActiveBurgerMenu: () => void;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};
export const Header = ({
  activeBurgerMenu,
  handleActiveBurgerMenu,
  user,
  setUser,
}: THeaderProps): JSX.Element => {
  const [activeSearchInput, setActiveSearchInput] = useState(false);
  const navigate = useNavigate();
  const handleInputSearch = () => {
    setActiveSearchInput((prev) => !prev);
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const logout = () => {
    axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
    setUser(null);

    navigate("/");
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

          <Link to="/">
            <img
              src={gameekLogo}
              alt="Logo du site"
              loading="lazy"
              className={clsx(
                "h-12 w-32 md:w-48",
                activeSearchInput && "hidden",
              )}
            />
          </Link>

          <nav
            className={clsx(
              "mb-1.5 hidden",
              !activeSearchInput && "md:flex md:items-center md:gap-2",
            )}
          >
            <Link
              to={"/jeux?page=1"}
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Jeux
            </Link>
            <Link
              to={`/jeux/sorties?page=1&dates=${getCurrentDate().fromDate},${getCurrentDate().toDate}`}
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Sorties
            </Link>
            <Link
              to={"/tests?page=1"}
              className="rounded-sm p-2 hover:bg-mainYellow hover:text-black"
            >
              Tests
            </Link>
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
            {!user && !activeSearchInput ? (
              <Link
                to={"/connexion"}
                className="hover:cursor-pointer lg:hover:text-yellow-400"
              >
                <FaUserCircle className="size-6" />
              </Link>
            ) : (
              <div
                className={clsx(
                  "group relative flex items-center gap-2",
                  activeSearchInput && "hidden",
                )}
              >
                <img
                  src={user?.image}
                  alt="Avatar de l'utilisateur"
                  className="size-8 rounded-full shadow-sm shadow-black"
                />

                <p className="hidden md:block">{user?.username}</p>

                <MdArrowDropDown />
                <div className="absolute right-0 top-full z-10 hidden w-32 gap-1 overflow-y-auto rounded-sm bg-customWhite p-1 text-black shadow-sm shadow-black group-hover:flex group-hover:flex-col md:w-full">
                  <p className="hidden border-b border-black/40 text-center font-bold max-md:block">
                    {user?.username}
                  </p>
                  <Link to="" className="p-1 text-center hover:bg-gray-300">
                    Profil
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/back"
                      className="p-1 text-center hover:bg-gray-300"
                    >
                      Back-office
                    </Link>
                  )}
                  <Link to="" className="p-1 text-center hover:bg-gray-300">
                    Mes tests
                  </Link>
                  <button
                    className="p-1 text-center hover:bg-gray-300"
                    onClick={logout}
                  >
                    Deconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
