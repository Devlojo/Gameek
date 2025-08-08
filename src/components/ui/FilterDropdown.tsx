import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getLastDayOfMonth } from "@/utils/getCurrentDate";

type TOption = {
  option: string;
  id: number;
  label: string;
};

export const FilterDropdown = ({ option, id, label }: TOption) => {
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
    newParams.set("genres", id.toString());
  }
  if (label === "Plateforme") {
    newParams.set("plateformes", id.toString());
  }

  if (label === "Mois") {
    let index = monthList.indexOf(option) + 1;

    let numberMonth = index.toString().padStart(2, "0");
    // Récupère l'année déjà dans les paramètres si dispo, sinon 2025 par défaut
    let currentYear = searchParams.get("dates")?.split("-")[0];

    newParams.set(
      "dates",
      `${currentYear}-${numberMonth}-01,${currentYear}-${numberMonth}-${getLastDayOfMonth(parseInt(currentYear as string), index)}`,
    );
  }
  if (label === "Année") {
    let currentMonth = searchParams.get("dates")?.split("-")[1];
    newParams.set(
      "dates",
      `${option}-${currentMonth}-01,${option}-${currentMonth}-${getLastDayOfMonth(parseInt(option), parseInt(currentMonth as string))}`,
    );
  }

  return (
    <>
      <Link
        to={`${location.pathname}?${newParams.toString()}`}
        className="p-1 text-left hover:bg-gray-300"
      >
        {option}
      </Link>
    </>
  );
};
