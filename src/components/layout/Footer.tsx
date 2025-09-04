import { Link } from "react-router-dom";
export const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="mb-4 text-customWhite">
        <nav className="mb-2">
          <ul className="flex flex-wrap justify-center gap-2 px-1 max-sm:text-sm">
            <li>
              <Link to="/mention-legales" className="hover:text-mainYellow">
                Mentions Légales
              </Link>
            </li>
            <li>
              <Link
                to="/politique-de-confidentialite"
                className="hover:text-mainYellow"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/conditions-generales-utilisation"
                className="hover:text-mainYellow"
              >
                CGU
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-mainYellow">
                A propos
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-wrap justify-center gap-1 max-sm:text-sm">
          <p>Copyright © 2025 Gameek</p>
          <p>| Tous droits réservés |</p>
          <p> Images et données fournies par </p>
          <a
            href="https://rawg.io/"
            className="text-mainYellow hover:font-bold"
            target="___blank"
          >
            RAWG
          </a>
        </div>
      </footer>
    </>
  );
};
