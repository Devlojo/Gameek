export const LegalMention = () => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Mention Légales
      </h1>
      <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
        <h2 className="pt-2 text-2xl font-bold">Editeur du site</h2>
        <p>
          Projet de fin d'etudes dans le cadre du titre professionel Concepteur
          Développeur d'Applications
        </p>
        <p>
          {" "}
          <span className="font-bold">Nom : </span>Lacouture
        </p>
        <p>
          <span className="font-bold">Prénom : </span>Jonathan
        </p>
        <p>
          <span className="font-bold">Adresse : </span>Paris, France
        </p>
        <p>
          <span className="font-bold">Mail : </span>
          jonathan.lacouture9@outlook.fr
        </p>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">Hébergeur du site</h2>
        <p>
          <span className="font-bold">Nom : </span>Netlify
        </p>
        <p>
          <span className="font-bold">Adresse : </span>512 2nd Street, Suite 200
          San Francisco, CA 94107
        </p>
        <a href="https://www.netlify.com/">
          <span className="font-bold">Site web : </span>https://www.netlify.com/
        </a>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">Données personnelles</h2>
        <p>
          Le site collecte certaines informations fournies par les utilisateurs
          (par exemple, le pseudo et l’adresse email) pour permettre
          l’authentification et la publication d’un test. Ces données sont
          utilisées uniquement pour le fonctionnement de l’application web et ne
          sont pas partagées à des tiers. L’utilisateur peut supprimer son
          compte directement depuis son espace, ce qui supprimera toutes les
          données liées au compte.
        </p>
      </section>
    </>
  );
};
