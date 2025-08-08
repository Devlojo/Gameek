import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { MdArrowDropDown } from "react-icons/md";
import { clsx } from "clsx";

import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

type Item = {
  id: number;
  name: string;
};
type TFilterSelectProps = {
  label: string;
  items?: Item[];
};
export const FilterSelect = ({ label, items }: TFilterSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let paramKey = "";
  if (label === "Genre") {
    paramKey = "genres";
  }
  if (label === "Plateforme") {
    paramKey = "plateformes";
  }

  if (label === "Mois") {
    paramKey = "dates";
  }
  if (label === "Année") {
    paramKey = "dates";
  }

  let selectedValue: string | null;
  let selectedItem: Item | undefined;
  if (label === "Genre" || label === "Plateforme") {
    // Récupération de la valeur active de l'url selon le label (Genre, Plateforme)
    selectedValue = searchParams.get(paramKey);

    // Recupérer l'item selectionné ainsi que ses props (id, name)
    selectedItem = items?.find((item) => String(item.id) === selectedValue);
  }

  if (label === "Mois") {
    const paramDate = searchParams.get("dates");
    // récupération du premier chiffre du mois
    const firstMonthNumberInParam = paramDate?.charAt(5);
    // récupération du second chiffre du mois
    const secondMonthNumberInParam = paramDate?.charAt(6);

    let monthIndex: number | "" | undefined;
    if (firstMonthNumberInParam === "0") {
      monthIndex =
        secondMonthNumberInParam && parseInt(secondMonthNumberInParam) - 1;
    } else {
      // addition des deux chiffres pour composer le mois
      const monthNumberInParam =
        firstMonthNumberInParam &&
        secondMonthNumberInParam &&
        firstMonthNumberInParam + secondMonthNumberInParam;
      // conversion du mois en entier pour pouvoir soustraire et correspondre aux index (commence à 0)
      monthIndex = monthNumberInParam && parseInt(monthNumberInParam) - 1;
    }

    selectedItem = items?.find((item) => item.id === monthIndex);
  }

  if (label === "Année") {
    const paramDate = searchParams.get("dates");

    const firstYearNumberInParam = paramDate?.charAt(0);

    const secondYearNumberInParam = paramDate?.charAt(1);
    const thirdYearNumberInParam = paramDate?.charAt(2);
    const fourthYearNumberInParam = paramDate?.charAt(3);
    let year: string;
    if (
      firstYearNumberInParam &&
      secondYearNumberInParam &&
      thirdYearNumberInParam &&
      fourthYearNumberInParam
    ) {
      year =
        firstYearNumberInParam +
        secondYearNumberInParam +
        thirdYearNumberInParam +
        fourthYearNumberInParam;
    }
    selectedItem = items?.find((item) => item.name === year);
  }

  const removeFilter = () => {
    if (label === "Genre") {
      searchParams.delete("genres");
    }
    if (label === "Plateforme") {
      searchParams.delete("plateformes");
    }

    setSearchParams(searchParams); // ⚠️ nécessaire même après .set()/.delete() pour déclencher la mise à jour de l'URL
  };

  return (
    <>
      <div className="group relative">
        <button
          className={clsx(
            "flex items-center gap-1 rounded-sm bg-mainYellow p-2 shadow-sm shadow-black hover:cursor-pointer md:px-10",
          )}
        >
          {selectedItem ? (
            <>
              <span>{selectedItem.name}</span>
              {label !== "Mois" && label != "Année" ? (
                <IoClose
                  className="size-5 font-bold lg:hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFilter();
                  }}
                />
              ) : (
                <MdArrowDropDown />
              )}
            </>
          ) : (
            <>
              <>
                <span>{label}</span> <MdArrowDropDown />
              </>
            </>
          )}
        </button>
        <div
          className={clsx(
            "absolute left-0 top-full z-10 hidden h-48 w-64 overflow-y-auto rounded-sm bg-customWhite p-1 text-black shadow-sm shadow-black",

            "scrollbar-thin scrollbar-thumb-gray-500 group-hover:block",
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
