import { TFilterCategory } from "@/types/filters";
import { Link, useSearchParams } from "react-router-dom";

type TOption = {
  option: string;
  id: number;
  label: TFilterCategory;
};

export const FilterDropdown = ({ option, id, label }: TOption) => {
  const [searchParams] = useSearchParams();
  // Toujours garder la page actuelle
  const currentPage = searchParams.get("page") || "1";
  // On clone les searchParams pour ne pas les modifier directement
  const newParams = new URLSearchParams(searchParams);

  // On ajoute/remplace le bon filtre selon le label
  if (label === "Genre") {
    newParams.set("genres", id.toString());
  } else if (label === "Plateforme") {
    newParams.set("plateformes", id.toString());
  }

  // On garde la page (ou remet 1 si tu veux reset)
  newParams.set("page", currentPage);
  return (
    <>
      <Link
        to={`/jeux?${newParams.toString()}`}
        className="p-1 text-left hover:bg-gray-300"
      >
        {option}
      </Link>
    </>
  );
};
