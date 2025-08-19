type TProps = {
  category: string;
  textExample: string;
};

export const InputStrengthOrWeakness = ({ category, textExample }: TProps) => {
  return (
    <input
      type="text"
      className="w-full border-b border-global p-1 shadow-sm shadow-global"
      placeholder={textExample}
      id={category}
    />
  );
};
