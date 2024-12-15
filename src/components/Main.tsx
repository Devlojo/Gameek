import { ImFire } from "react-icons/im";

const Main = (): JSX.Element => {
  return (
    <>
      <section className="h-98 rounded-md bg-lastestGames px-4 py-3">
        <div className="flex items-center gap-2 pb-3 text-2xl font-bold text-white">
          <h2>Les dernières sorties</h2>
          <ImFire className="text-orange-500" />
        </div>
        <a href="" className="hover:opacity-95">
          <img
            src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
            alt=""
            className="h-full object-cover"
          />
        </a>
      </section>
      <section className="h-98 rounded-md bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3">
          <h2 className="text-2xl font-bold">Les mieux notés</h2>
          <div className="flex gap-4">
            <button className="rounded-sm bg-mainYellow px-2 py-1">Note</button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Genre
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Plateforme
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <article className="flex w-80">
            <a href="" className="hover:opacity-95">
              <img
                src="https://cdn.mobygames.com/promos/17161012-diablo-iv-screenshot.jpg"
                alt=""
              />
            </a>
          </article>
          <article className="flex w-80">
            <a href="" className="hover:opacity-95">
              <img
                src="https://cdn.mobygames.com/screenshots/17575992-street-fighter-6-windows-splash-screen.png"
                alt=""
              />
            </a>
          </article>
          <article className="flex w-80">
            <a href="" className="hover:opacity-95">
              <img
                src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
                alt=""
              />
            </a>
          </article>
        </div>
      </section>
      <section className="h-98 rounded-md bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2 pb-3">
          <h2 className="text-2xl font-bold">Les derniers tests</h2>
          <div className="flex gap-4">
            <button className="rounded-sm bg-mainYellow px-2 py-1">Note</button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Genre
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Plateforme
            </button>
            <button className="rounded-sm bg-mainYellow px-2 py-1">
              Auteur
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <a
            href=""
            className="flex w-60 rounded-md border-2 border-gray-300 p-2 hover:opacity-85"
          >
            <article className="flex flex-col gap-2">
              <img
                src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
                alt=""
              />
              <div className="text-lg">
                <h3>
                  <span className="text-2xl font-bold text-cyan-500">15</span>
                  /20 Final fantasy XVI
                </h3>
              </div>
              <p className="text-base">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="text-sm">Publié par Jack, le 15/11/23</p>
            </article>
          </a>
          <a
            href=""
            className="flex w-60 rounded-md border-2 border-gray-300 p-2 hover:opacity-85"
          >
            <article className="flex flex-col gap-2">
              <img
                src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
                alt=""
              />
              <div className="text-lg">
                <h3>
                  <span className="text-2xl font-bold text-cyan-500">15</span>
                  /20 Final fantasy XVI
                </h3>
              </div>
              <p className="text-base">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="text-sm">Publié par Jack, le 15/11/23</p>
            </article>
          </a>
          <a
            href=""
            className="flex w-60 rounded-md border-2 border-gray-300 p-2 hover:opacity-85"
          >
            <article className="flex flex-col gap-2">
              <img
                src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
                alt=""
              />
              <div className="text-lg">
                <h3>
                  <span className="text-2xl font-bold text-cyan-500">15</span>
                  /20 Final fantasy XVI
                </h3>
              </div>
              <p className="text-base">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="text-sm">Publié par Jack, le 15/11/23</p>
            </article>
          </a>
          <a
            href=""
            className="flex w-60 rounded-md border-2 border-gray-300 p-2 hover:opacity-85"
          >
            <article className="flex flex-col gap-2">
              <img
                src="https://cdn.mobygames.com/promos/17205009-final-fantasy-xvi-other.png"
                alt=""
              />
              <div className="text-lg">
                <h3>
                  <span className="text-2xl font-bold text-cyan-500">15</span>
                  /20 Final fantasy XVI
                </h3>
              </div>
              <p className="text-base">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="text-sm">Publié par Jack, le 15/11/23</p>
            </article>
          </a>
        </div>
      </section>
    </>
  );
};

export default Main;
