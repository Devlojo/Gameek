type TGenre = {
  genre: string;
};

export const GenreBadge = ({ genre }: TGenre) => {
  return (
    <>
      <p className={`bg-mainYellow p-0.5 text-xs shadow-sm shadow-black`}>
        {genre}
      </p>
    </>
  );
};
