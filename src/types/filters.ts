export type TFilterCategory =
  | "Jeux"
  | "Genre"
  | "Plateforme"
  | "Auteur"
  | "Note";

export type TActiveFilters = {
  [key in TFilterCategory]: string | null;
};
