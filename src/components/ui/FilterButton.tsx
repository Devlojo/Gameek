import { MdArrowDropDown } from "react-icons/md";

type TButtonName = {
  buttonName: string;
};
export const FilterButton = ({ buttonName }: TButtonName) => {
  return (
    <>
      <div className="flex items-center rounded-sm bg-mainYellow p-1 shadow-sm shadow-black hover:cursor-pointer md:py-1">
        <button>{buttonName}</button>
        <MdArrowDropDown />
      </div>
    </>
  );
};
