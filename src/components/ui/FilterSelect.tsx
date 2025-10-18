import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { MdArrowDropDown } from "react-icons/md";
import { clsx } from "clsx";

import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

type Item = {
  id: number;
  name?: string;
  slug?: string;
  username?: string;
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

  if (label === "Année") {
    paramKey = "annee";
  }

  if (label === "Mois") {
    paramKey = "mois";
  }
  if (label === "Testeur") {
    paramKey = "testeur";
  }
  if (label === "Note") {
    paramKey = "note";
  }

  let selectedValue: string | null;
  let selectedItem: Item | undefined;
  if (label === "Genre" || label === "Plateforme") {
    // Récupération de la valeur active de l'url selon le label (Genre, Plateforme, Note)
    selectedValue = searchParams.get(paramKey);

    // Recupérer l'item selectionné ainsi que ses props (id, name)
    selectedItem = items?.find((item) => item.slug === selectedValue);
  }

  if (label === "Année") {
    // Récupération de la valeur active de l'url selon le label (Genre, Plateforme, Note)
    selectedValue = searchParams.get(paramKey);

    // Recupérer l'item selectionné ainsi que ses props (id, name)
    selectedItem = items?.find((item) => item.name === selectedValue);
  }

  if (label === "Mois") {
    // Récupération de la valeur active de l'url selon le label (Genre, Plateforme, Note)
    selectedValue = searchParams.get(paramKey);
    const index = Number(selectedValue);

    // Recupérer l'item selectionné ainsi que ses props (id, name)
    selectedItem = items && items[index - 1];
  }

  if (label === "Note") {
    // Récupération de la valeur active de l'url selon le label (Genre, Plateforme, Note)
    selectedValue = searchParams.get(paramKey);

    // Recupérer l'item selectionné ainsi que ses props (id, name)
    selectedItem = items?.find((item) => String(item.id) === selectedValue);
  }
  if (label === "Testeur") {
    selectedValue = searchParams.get(paramKey);

    selectedItem = items?.find((item) => item.username === selectedValue);
  }

  const removeFilter = () => {
    if (label === "Genre") {
      searchParams.delete("genres");
    }
    if (label === "Plateforme") {
      searchParams.delete("plateformes");
    }
    if (label === "Testeur") {
      searchParams.delete("testeur");
    }
    if (label === "Note") {
      searchParams.delete("note");
    }

    setSearchParams(searchParams); // ⚠️ nécessaire même après .set()/.delete() pour déclencher la mise à jour de l'URL
  };

  return (
    <>
      <div className="group relative">
        <button
          className={clsx(
            "flex w-60 items-center justify-center rounded-sm bg-mainYellow p-2 shadow-sm shadow-black hover:cursor-pointer",
          )}
        >
          {selectedItem ? (
            <>
              {label === "Testeur" ? (
                <span>{selectedItem.username}</span>
              ) : (
                <span>{selectedItem.name}</span>
              )}

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
            "absolute left-0 top-full z-10 hidden w-full overflow-y-auto rounded-sm bg-customWhite p-1 text-black shadow-sm shadow-black scrollbar-thin scrollbar-thumb-gray-500 group-hover:block",
            items && items.length > 5 && "h-48",
          )}
        >
          <ul className="flex flex-col gap-1">
            {items &&
              items.length > 0 &&
              items.map((item: Item, index) => (
                <FilterDropdown
                  option={
                    item.username
                      ? (item.username as string)
                      : (item.name as string)
                  }
                  key={index}
                  label={label}
                  id={item.id}
                  slug={item.slug}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
