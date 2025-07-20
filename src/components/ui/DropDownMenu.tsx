import { TFilterCategory, TActiveFilters } from "@/types/filters";

type TOption = {
  option: string;

  label: TFilterCategory;
  setActiveFilters: React.Dispatch<React.SetStateAction<TActiveFilters>>;
};

export const DropDownMenu = ({
  option,

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
      <button
        className="p-1 text-left hover:bg-gray-300"
        onClick={() => handleActiveFilters(label, option)}
      >
        {option}
      </button>
    </>
  );
};
