import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Politique de confidentialité
      </h1>
      <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
        <h2 className="text-2xl font-bold">1. Introduction</h2>
        <p>
          Cette politique de confidentialité explique comment le site collecte,
          utilise et protège les informations personnelles des utilisateurs. Ce
          site est un projet de fin d’études réalisé dans le cadre du titre
          professionnel Concepteur Développeur d’Applications.
        </p>

        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">2. Données collectées</h2>
        <p>Le site peut collecter les informations suivantes :</p>
        <ul className="ml-6 list-disc">
          <li>Pseudo</li>
          <li>Adresse email</li>
          <li>Contenu des tests publiés par l'utilisateur</li>
        </ul>
        <p>
          Ces informations sont nécessaires pour permettre l’authentification et
          le fonctionnement de l’application web.
        </p>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">3. Utilisation des données</h2>
        <p>Les données collectées sont utilisées uniquement pour :</p>
        <ul className="ml-6 list-disc">
          <li>
            Permettre l’inscription et l’authentification des utilisateurs
          </li>
          <li>Publier et gérer les tests de jeux vidéo</li>
          <li>Assurer le bon fonctionnement de l’application</li>
        </ul>
        <div className="border-b border-black/20"></div>

        <h2 className="text-2xl font-bold">4. Suppression des données</h2>
        <p>
          L’utilisateur peut supprimer son compte directement depuis son espace,
          ce qui entraînera la suppression de toutes les données liées au
          compte.
        </p>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">5. Sécurité des données</h2>
        <p>
          Les données sont stockées de manière sécurisée et accessibles
          uniquement par l’éditeur du site.
        </p>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">6. Contact</h2>
        <p>
          Pour toute question concernant la confidentialité ou la suppression de
          vos données, vous pouvez contacter l’éditeur via la page
          <Link to="/contact" className="font-bold">
            {" "}
            Contact
          </Link>
        </p>
      </section>
    </>
  );
};
