export type TFilterCategory =
  | "Date"
  | "Genre"
  | "Plateforme"
  | "Auteur"
  | "Note"
  | "Mois"
  | "Année";

export type TActiveFilters = {
  [key in TFilterCategory]: string | null;
};
