import { Link } from "react-router-dom";

export const GeneralConditionsOfUse = () => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Conditions Générales d’Utilisation (CGU)
      </h1>
      <section className="flex w-full flex-col gap-2 rounded-md bg-customWhite px-3 pb-5">
        <h2 className="pt-2 text-2xl font-bold">1. Objet</h2>
        <p>
          Les présentes conditions générales d’utilisation définissent les
          règles d’accès et d’utilisation du site, un projet de fin d’études
          réalisé dans le cadre du titre professionnel Concepteur Développeur
          d’Applications.
        </p>

        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">2. Accès au site</h2>
        <p>
          L’accès au site est libre et gratuit. Certains services (comme publier
          un test) nécessitent la création d’un compte utilisateur.
        </p>

        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">3. Comptes utilisateurs</h2>

        <ul className="ml-6 list-disc">
          <li>
            Chaque utilisateur doit fournir un pseudo et une adresse email
            valide pour créer un compte.
          </li>
          <li>
            L’utilisateur est responsable de la confidentialité de ses
            identifiants et de toute activité effectuée depuis son compte.
          </li>
          <li>
            L’utilisateur peut supprimer son compte à tout moment via son espace
            personnel.
          </li>
        </ul>
        <div className="border-b border-black/20"></div>

        <h2 className="text-2xl font-bold">4. Contenu publié</h2>
        <ul className="ml-6 list-disc">
          <li>Les utilisateurs peuvent publier des tests de jeux vidéo.</li>
          <li>
            Les utilisateurs peuvent publier des commentaires sur les tests.
          </li>
          <li>Les utilisateurs peuvent émettre un "like" sur un test</li>
          <li>
            Les utilisateurs s’engagent à ne publier aucun contenu illégal,
            offensant ou portant atteinte aux droits d’autrui.
          </li>
          <li>
            L’éditeur se réserve le droit de vérifier le contenu du test avant
            publication et de supprimer tout contenu inapproprié.
          </li>
        </ul>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">5. Données personnelles</h2>
        <ul className="ml-6 list-disc">
          <li>
            Les informations collectées sont décrites dans la{" "}
            <Link to="/politique-de-confidentialite" className="font-bold">
              politique de confidentialité.
            </Link>
          </li>
          <li>
            L’utilisateur peut consulter et supprimer ses données depuis son
            compte ou via le contact de l’éditeur.
          </li>
        </ul>
        <div className="border-b border-black/20"></div>
        <h2 className="text-2xl font-bold">6. Modifications des CGU</h2>
        <p>
          L’éditeur peut mettre à jour les CGU à tout moment. Les utilisateurs
          sont invités à les consulter régulièrement.
        </p>
      </section>
    </>
  );
};
