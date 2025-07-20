import { DropDownMenu } from "@/components/ui/DropDownMenu";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { clsx } from "clsx";
import { TFilterCategory, TActiveFilters } from "@/types/filters";
import { IoClose } from "react-icons/io5";

type Item = {
  id: number;
  name: string;
};
type TMenuItemsProps = {
  label: TFilterCategory;
  items: Item[];
};
export const MenuItem = ({ label, items }: TMenuItemsProps) => {
  const [activeFilters, setActiveFilters] = useState<TActiveFilters>({
    Genre: null,
    Plateforme: null,
    Auteur: null,
    Note: null,
    Date: null,
    Année: null,
    Mois: null,
  });

  const hasActiveFilter = Object.values(activeFilters).some(
    (value) => value !== null,
  );

  const handleClearFilter = (category: TFilterCategory) => {
    setActiveFilters((prev) => ({ ...prev, [category]: null }));
  };

  return (
    <>
      <div className="group relative">
        <button className="flex items-center gap-1 rounded-sm bg-mainYellow p-2 shadow-sm shadow-black hover:cursor-pointer md:px-10">
          {hasActiveFilter ? (
            <>
              {" "}
              {activeFilters[label]}{" "}
              <IoClose
                onClick={() => handleClearFilter(label)}
                className="size-5 font-bold hover:animate-pulse"
              />{" "}
            </>
          ) : (
            <>
              {" "}
              {label} <MdArrowDropDown />{" "}
            </>
          )}
        </button>
        <div
          className={clsx(
            "absolute left-0 top-full z-10 hidden w-64 rounded-sm bg-customWhite p-1 text-black shadow-sm shadow-black group-hover:block",
            ["Genre", "Plateforme"].includes(label) &&
              "h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500",
          )}
        >
          <ul className="flex flex-col gap-1">
            {items &&
              items.length > 0 &&
              items.map((item: Item, index) => (
                <DropDownMenu
                  option={item.name}
                  key={index}
                  label={label}
                  setActiveFilters={setActiveFilters}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
