type TOption = {
  option: string;
};

export const DropDownMenu = ({ option }: TOption) => {
  return (
    <>
      <a href="" className="p-1 text-left hover:bg-gray-300">
        {option}
      </a>
    </>
  );
};
