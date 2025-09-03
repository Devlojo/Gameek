import { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { reviewFormSchema } from "@/types/review";

type TForm = z.infer<typeof reviewFormSchema>;

type TProps = {
  category: string;
  textExample: string;
  register: UseFormRegister<TForm>; // la fonction register de RHF
  index: number; // pour identifier la position dans le tableau
};

export const InputStrengthOrWeakness = ({
  category,
  textExample,
  register,
  index,
}: TProps) => {
  return (
    <input
      type="text"
      className="w-full border-b border-global p-1 shadow-sm shadow-global"
      placeholder={textExample}
      id={category}
      {...register(`${category}.${index}` as keyof TForm & string)} // <- Pour que Typescript reconnaisse cette clé comme valide du formulaire
    />
  );
};
