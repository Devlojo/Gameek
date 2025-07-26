import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { MdArrowDropDown } from "react-icons/md";
import { clsx } from "clsx";
import { TFilterCategory } from "@/types/filters";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

type Item = {
  id: number;
  name: string;
};
type TFilterSelectProps = {
  label: TFilterCategory;
  items: Item[];
};
export const FilterSelect = ({ label, items }: TFilterSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Récupération de la valeur active de l'url selon le label (Genre, Plateforme)
  const selectedValue = searchParams.get(
    label === "Genre" ? "genres" : label === "Plateforme" ? "plateformes" : "",
  );

  // Recupérer l'item selectionné ainsi que ses props (id, name)
  const selectedItem = items.find((item) => String(item.id) === selectedValue);

  const removeFilter = () => {
    if (label === "Genre") {
      searchParams.delete("genres");
    } else if (label === "Plateforme") {
      searchParams.delete("plateformes");
    }
    setSearchParams(searchParams); // ⚠️ nécessaire même après .set()/.delete() pour déclencher la mise à jour de l'URL
  };

  return (
    <>
      <div className="group relative">
        <button className="flex items-center gap-1 rounded-sm bg-mainYellow p-2 shadow-sm shadow-black hover:cursor-pointer md:px-10">
          {selectedItem ? (
            <>
              <span>{selectedItem.name}</span>
              <IoClose
                className="size-5 font-bold lg:hover:animate-pulse"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFilter();
                }}
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
                <FilterDropdown
                  option={item.name}
                  key={index}
                  label={label}
                  id={item.id}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
