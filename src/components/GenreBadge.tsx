type TGenre = {
  genre: string;
  index: number;
};

export const GenreBadge = ({ genre, index }: TGenre) => {
  return (
    <>
      <p
        className={`bg-mainYellow p-0.5 text-xs shadow-sm shadow-black`}
        key={index}
      >
        {genre}
      </p>
    </>
  );
};
