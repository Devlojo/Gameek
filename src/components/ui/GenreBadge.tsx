type TGenre = {
  genre: string;
};

export const GenreBadge = ({ genre }: TGenre) => {
  return (
    <>
      <p className="bg-mainYellow p-1 text-sm shadow-sm shadow-black">
        {genre}
      </p>
    </>
  );
};
