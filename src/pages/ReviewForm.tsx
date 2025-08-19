import { InputStrengthOrWeakness } from "@/components/form/InputStrengthOrWeakness";

export const ReviewForm = (): JSX.Element => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Création de test
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[600px]">
          <form action="" className="flex w-full flex-col gap-6">
            <label htmlFor="introduction">
              Introduction
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Petite phrase d'accroche"
                id="introduction"
              />
            </label>

            <label htmlFor="universe">
              Univers et scénario
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : l'histoire est ultra prenante"
                id="universe"
              />
            </label>
            <label htmlFor="gameplay">
              Gameplay et prise en main
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : hyper fun à jouer"
                id="gameplay"
              />
            </label>
            <label htmlFor="graphics">
              Réalisation et bande-son
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : un régal pour les yeux et oreilles"
                id="graphics"
              />
            </label>
            <label htmlFor="conclusion">
              Conclusion
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : j'ai adoré le jeu du début à la fin, je ne peux que le recommander pour tous les gamers"
                id="conclusion"
              />
            </label>
            <label htmlFor="score" className="flex flex-col">
              Note
              <input
                type="number"
                className="w-12 border-b border-global p-1 shadow-sm shadow-global"
                min={0}
                max={20}
                placeholder="0"
                id="score"
              />
            </label>
            <label htmlFor="strenghts" className="flex flex-col gap-2">
              Points forts
              <InputStrengthOrWeakness
                category="strenghts"
                textExample="Le scénario"
              />
              <InputStrengthOrWeakness
                category="strenghts"
                textExample="La bande sonore"
              />
              <InputStrengthOrWeakness
                category={"strenghts"}
                textExample="Le gameplay"
              />
              <InputStrengthOrWeakness
                category="strenghts"
                textExample="La réalisation"
              />
              <InputStrengthOrWeakness
                category="strenghts"
                textExample="Contenu gargantuesque"
              />
            </label>
            <label htmlFor="weakness" className="flex flex-col gap-2">
              Points faibles
              <InputStrengthOrWeakness
                category="weakness"
                textExample="Le scénario trop classique"
              />
              <InputStrengthOrWeakness
                category="weakness"
                textExample="Trop court"
              />
              <InputStrengthOrWeakness
                category="weakness"
                textExample="Répétitif"
              />
              <InputStrengthOrWeakness
                category="weakness"
                textExample="Pas mal de bugs"
              />
              <InputStrengthOrWeakness
                category="weakness"
                textExample="Pas bien beau"
              />
            </label>
            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Créer le test
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
