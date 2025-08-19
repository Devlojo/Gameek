import { PiUserCircleLight } from "react-icons/pi";

export const SignIn = (): JSX.Element => {
  return (
    <>
      <h1 className="mx-4 mt-4 text-center text-3xl font-bold text-customWhite">
        Inscription
      </h1>
      <div className="flex flex-col items-center">
        <div className="flex h-[430px] w-[300px] flex-col items-center justify-center rounded-lg bg-customWhite p-6 sm:w-[500px]">
          <form action="" className="flex w-full flex-col gap-6">
            <div className="flex justify-center">
              <PiUserCircleLight
                className="size-20 hover:cursor-pointer hover:opacity-50"
                title="Selectionnez votre photo de profil"
              />
            </div>
            <label htmlFor="email">
              Adresse mail
              <input
                type="email"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre email"
                id="email"
              />
            </label>
            <label htmlFor="username">
              Pseudo
              <input
                type="text"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre pseudo"
                id="username"
              />
            </label>
            <label htmlFor="password">
              Mot de passe
              <input
                type="password"
                className="w-full border-b border-global p-1 shadow-sm shadow-global"
                placeholder="Entrez votre mot de passe"
                id="password"
              />
            </label>

            <div className="flex justify-center">
              <button className="rounded-lg bg-mainYellow p-2 shadow-sm shadow-global">
                Créer le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
