export const About = () => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        A propos
      </h1>
      <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
        <p className="pt-2">
          Bonjour ! Je m’appelle{" "}
          <span className="font-bold">Jonathan Lacouture</span>, et je suis
          étudiant en Concepteur Développeur d’Applications au centre de
          formation{" "}
          <a
            href="https://www.lereacteur.io/"
            className="font-bold"
            target="_blank"
          >
            Le reacteur
          </a>
          .
        </p>
        <p>
          Ce site web est{" "}
          <span className="font-bold">mon projet de fin d’études</span>, étant
          un passionné de jeu vidéo, j’ai développé ce site pour permettre à la
          communauté de tester et partager des avis sur des jeux vidéo. Mon
          objectif était de créer un outil fonctionnel et interactif, tout en
          mettant en pratique les compétences acquises pendant la formation,
          notamment avec le stack :
        </p>
        <ul className="ml-6 list-disc">
          <li>React</li>
          <li>Typescript</li>
          <li>TailwindCSS</li>
        </ul>
        <p>
          Concernant l’équipe, j’ai réalisé ce projet en autonomie, et j’ai donc
          participé à tous les aspects, de la conception à la réalisation.
        </p>
        <p>
          J’espère que vous prendrez autant de plaisir à naviguer sur ce site
          que j’en ai eu à le créer, et que ce projet sera le début d’une longue
          série.
        </p>
      </section>
    </>
  );
};
