type TGenre = {
  genre: string;
};

export const GameBadge = ({ genre }: TGenre) => {
  return (
    <>
      <p className="absolute bottom-0 bg-global bg-opacity-70 px-0.5 text-xs text-gray-200 shadow-sm shadow-black">
        <span className="text-xl text-mainYellow">18</span>
        ∕20
      </p>
      <p className="absolute right-0 top-0 bg-mainYellow p-0.5 text-xs shadow-sm shadow-black">
        {genre}
      </p>
    </>
  );
};
