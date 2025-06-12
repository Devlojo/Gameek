const Footer = (): JSX.Element => {
  return (
    <>
      <footer className="mb-2 flex items-center gap-2 max-md:flex-col md:justify-center">
        <p className="text-white max-sm:text-sm">
          Copyright © 2024 Gameek | Tous droits réservés |
        </p>
        <p className="text-white max-sm:text-sm">
          Images et données fournies par{" "}
          <a
            href="https://rawg.io/"
            className="text-yellow-500 hover:font-bold"
            target="___blank"
          >
            RAWG
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
