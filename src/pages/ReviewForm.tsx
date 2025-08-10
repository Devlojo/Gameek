export const ReviewForm = (): JSX.Element => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Création de test
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form action="" className="flex w-full flex-col gap-6">
            <label htmlFor="">
              Introduction
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Petite phrase d'accroche"
              />
            </label>

            <label htmlFor="">
              Univers et scénario
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : l'histoire est ultra prenante"
              />
            </label>
            <label htmlFor="">
              Gameplay et prise en main
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : hyper fun à jouer"
              />
            </label>
            <label htmlFor="">
              Réalisation et bande-son
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : un régal pour les yeux et oreilles"
              />
            </label>
            <label htmlFor="">
              Conclusion
              <textarea
                className="h-32 w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Par exemple : je ne peux que vous conseiller ce jeu"
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Note
              <input
                type="number"
                className="w-14 border-b border-global p-1 shadow-sm shadow-global"
                min={0}
                max={20}
              />
            </label>
            <label htmlFor="">
              Points forts
              <input
                type="text"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="par exemple : l'univers"
              />
            </label>
            <label htmlFor="">
              Points faibles
              <input
                type="text"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="par exemple : la durée de vie"
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
