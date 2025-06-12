import { MdArrowDropDown } from "react-icons/md";

type TButtonName = {
  buttonName: string;
};
export const FilterButton = ({ buttonName }: TButtonName) => {
  return (
    <>
      <div className="relative flex items-center rounded-sm bg-mainYellow p-1 shadow-sm shadow-black md:py-1">
        <button>{buttonName}</button>
        <MdArrowDropDown />
      </div>
    </>
  );
};
