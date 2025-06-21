const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="mb-4 text-customWhite">
        <nav className="mb-2">
          <ul className="flex flex-wrap justify-center gap-2 max-sm:text-sm">
            <li>
              <a href="" className="hover:text-mainYellow">
                Mentions Légales |
              </a>
            </li>
            <li>
              <a href="" className="hover:text-mainYellow">
                Politique de confidentialité |
              </a>
            </li>
            <li>
              <a href="" className="hover:text-mainYellow">
                CGU |
              </a>
            </li>
            <li>
              <a href="" className="hover:text-mainYellow">
                Contact |
              </a>
            </li>
            <li>
              <a href="" className="hover:text-mainYellow">
                A propos
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-wrap justify-center gap-2 max-sm:text-sm">
          <p>Copyright © 2025 Gameek | Tous droits réservés |</p>
          <p>
            {" "}
            Images et données fournies par{" "}
            <a
              href="https://rawg.io/"
              className="text-mainYellow hover:font-bold"
              target="___blank"
            >
              RAWG
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
