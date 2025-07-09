type TGame = {
  background_image: string | null | undefined;
  name: string | undefined;
  children?: React.ReactNode;
};

export const GameHeader = ({ background_image, name, children }: TGame) => {
  return (
    <>
      <h1 className="mt-4 px-4 text-center text-3xl font-bold text-customWhite">
        {name}
      </h1>
      <div className="rounded-md bg-customWhite pb-5">
        <div className="relative">
          <img
            src={background_image as string}
            alt={`photo de couverture de ${name}`}
            className="h-[150px] w-full object-cover md:h-[220px] lg:h-[300px]"
            loading="lazy"
          />
          <p className="absolute bottom-0 flex w-full items-center justify-center gap-1 rounded-b-md bg-global bg-opacity-70 text-xs text-light shadow-sm shadow-black">
            <span className="text-xl text-mainYellow">18</span>
            ∕20 <span className="">(5 avis)</span>
          </p>
        </div>

        {children}
      </div>
    </>
  );
};
