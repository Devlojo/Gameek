import { ElementType } from "react";
import { TFilterCategory, TActiveFilters } from "@/types/filters";

type TOption = {
  option: string;
  icon?: ElementType;
  label: TFilterCategory;
  setActiveFilters: React.Dispatch<React.SetStateAction<TActiveFilters>>;
};

export const DropDownMenu = ({
  option,
  icon: Icon,
  label,
  setActiveFilters,
}: TOption) => {
  const handleActiveFilters = (category: string, option: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: option,
    }));
  };
  return (
    <>
      {Icon ? (
        <a href="" className="p-1 text-left hover:bg-gray-300">
          {option}
        </a>
      ) : (
        <button
          className="p-1 text-left hover:bg-gray-300"
          onClick={() => handleActiveFilters(label, option)}
        >
          {option}
        </button>
      )}
    </>
  );
};
