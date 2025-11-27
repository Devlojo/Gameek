import { Link, useLocation, useSearchParams } from "react-router-dom";

type TOption = {
  option: string;
  id: number;
  label: string;
  slug?: string;
};

export const FilterDropdown = ({ option, id, label, slug }: TOption) => {
  const [searchParams] = useSearchParams();

  const location = useLocation(); // récuperation du chemin courant
  const monthList = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  // On clone les searchParams pour ne pas les modifier directement
  const newParams = new URLSearchParams(searchParams);

  // On ajoute/remplace le bon filtre selon le label
  if (label === "Genre") {
    newParams.set("genres", slug as string);
  }
  if (label === "Plateforme") {
    newParams.set("plateformes", slug as string);
  }

  if (label === "Testeur") {
    newParams.set("testeur", option);
  }
  if (label === "Note") {
    newParams.set("note", id.toString());
  }

  if (label === "Mois") {
    const index = monthList.indexOf(option) + 1;

    const numberMonth = index.toString().padStart(2, "0");

    newParams.set("mois", numberMonth);
  }
  if (label === "Année") {
    newParams.set("annee", option);
  }

  return (
    <>
      <Link
        to={`${location.pathname}?${newParams.toString()}`}
        className="p-1 text-center hover:bg-gray-300"
      >
        {option}
      </Link>
    </>
  );
};
