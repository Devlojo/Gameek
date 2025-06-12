import { DropDownMenu } from "@/components/ui/DropDownMenu";
import { ElementType } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { clsx } from "clsx";

type TMenuItemsProps = {
  icon?: ElementType; // Pour typer une prop qui sera appeler comme composant
  label: string;
  items: any[];
  itemKey: string;
  activeModalMenu: string[];
  toggleMenu: (label: string) => void; // fonction pour toggler un label
};
export const MenuItem = ({
  icon: Icon, // pour pouvoir utiliser Icon en tant que composant
  label,
  items,
  itemKey,
  activeModalMenu,
  toggleMenu,
}: TMenuItemsProps) => {
  return (
    <>
      <div className="relative">
        <button
          className="flex items-center gap-1 rounded-sm p-2 hover:bg-mainYellow hover:text-black"
          onClick={() => toggleMenu(label)}
          id={label}
        >
          {Icon && <Icon />}
          {label}
          <MdArrowDropDown />
          <div
            className={clsx(
              "absolute top-10 mt-2 w-64 rounded-sm bg-customWhite p-1 text-black shadow-sm shadow-black",
              label !== "Jeux" &&
                "h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500",
              activeModalMenu.includes(label) ? "block" : "hidden",
            )}
          >
            <ul className="flex flex-col gap-1">
              {items &&
                items.length > 0 &&
                items.map((item, index) => (
                  <DropDownMenu option={item[itemKey]} key={index} />
                ))}
            </ul>
          </div>
        </button>
      </div>
    </>
  );
};
