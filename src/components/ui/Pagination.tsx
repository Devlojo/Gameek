import { LuCircleArrowLeft } from "react-icons/lu";
import { LuCircleArrowRight } from "react-icons/lu";

export const Pagination = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-4">
        <LuCircleArrowLeft className="size-10 text-mainYellow opacity-30" />
        <div className="flex gap-4">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <LuCircleArrowRight className="size-10 text-mainYellow" />
      </div>
    </>
  );
};
